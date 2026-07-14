export const PI_API_BASE_URL = "https://api.minepi.com/v2";

export const PI_PAYMENT_PRODUCTS = {
  checklist_test: {
    amount: 1,
    memo: "Director's Cut AI Pro checklist test",
  },
} as const;

export type PiProductId = keyof typeof PI_PAYMENT_PRODUCTS;

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

export function isPiProductId(value: unknown): value is PiProductId {
  return (
    typeof value === "string" &&
    Object.prototype.hasOwnProperty.call(PI_PAYMENT_PRODUCTS, value)
  );
}

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

export function paymentMatchesProduct(
  payment: PiPaymentDTO,
  productId: PiProductId
): boolean {
  const product = PI_PAYMENT_PRODUCTS[productId];
  const metadataProductId = payment.metadata?.productId;

  return (
    payment.direction === "user_to_app" &&
    payment.network === "Pi Testnet" &&
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