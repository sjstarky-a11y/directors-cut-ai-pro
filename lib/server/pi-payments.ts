import {
  PI_PAYMENT_PRODUCTS,
  isPiProductId,
  type PiProductId,
} from "@/lib/pi-products";

export const PI_API_BASE_URL = "https://api.minepi.com/v2";

export { isPiProductId };
export type { PiProductId };

/**
 * The Pi network this deployment accepts payments from. The app is registered
 * as a Testnet app, so the default is "Pi Testnet". A Mainnet deployment would
 * set PI_PAYMENT_NETWORK="Pi Network" (together with its own API key).
 */
function expectedPaymentNetwork(): string {
  return process.env.PI_PAYMENT_NETWORK?.trim() || "Pi Testnet";
}

export type PiPaymentDTO = {
  identifier: string;
  user_uid: string;
  amount: number;
  memo: string;
  metadata: Record<string, unknown>;
  from_address: string;
  to_address: string;
  direction: "user_to_app" | "app_to_user";
  created_at: string;
  network: "Pi Network" | "Pi Testnet";
  status: {
    developer_approved: boolean;
    transaction_verified: boolean;
    developer_completed: boolean;
    cancelled: boolean;
    user_cancelled: boolean;
  };
  transaction: null | {
    txid: string;
    verified: boolean;
    _link: string;
  };
};

export function isValidPaymentId(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.length >= 10 &&
    value.length <= 200 &&
    /^[A-Za-z0-9_-]+$/.test(value)
  );
}

export function isValidTxid(value: unknown): value is string {
  return (
    typeof value === "string" &&
    /^[A-Fa-f0-9]{64}$/.test(value)
  );
}

/** True for a user-to-app payment on the expected network for one of our products. */
export function paymentBelongsToApp(payment: PiPaymentDTO): boolean {
  return (
    payment.direction === "user_to_app" &&
    payment.network === expectedPaymentNetwork() &&
    isPiProductId(payment.metadata?.productId)
  );
}

export function paymentMatchesProduct(
  payment: PiPaymentDTO,
  productId: PiProductId
): boolean {
  const product = PI_PAYMENT_PRODUCTS[productId];
  const metadataProductId = payment.metadata?.productId;

  return (
    payment.direction === "user_to_app" &&
    payment.network === expectedPaymentNetwork() &&
    Math.abs(payment.amount - product.amount) < 0.0000001 &&
    payment.memo === product.memo &&
    metadataProductId === productId &&
    !payment.status.cancelled &&
    !payment.status.user_cancelled
  );
}

export async function callPiApi(
  path: string,
  init: RequestInit
): Promise<{
  response: Response;
  data: PiPaymentDTO | Record<string, unknown> | null;
}> {
  const apiKey = process.env.PI_API_KEY?.trim();

  if (!apiKey) {
    throw new Error("PI_API_KEY is not configured.");
  }

  const response = await fetch(`${PI_API_BASE_URL}${path}`, {
    ...init,
    headers: {
      Authorization: `Key ${apiKey}`,
      Accept: "application/json",
      ...(init.body ? { "Content-Type": "application/json" } : {}),
      ...(init.headers ?? {}),
    },
    cache: "no-store",
  });

  const text = await response.text();

  let data: PiPaymentDTO | Record<string, unknown> | null = null;

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { error: "Pi API returned a non-JSON response." };
    }
  }

  return { response, data };
}