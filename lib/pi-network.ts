"use client";

export const PI_CONFIG = {
  walletAddress:
    "GDETEQ7BOAJKM7AGWN4ZKQ4VYWE45C5ODE6EFICG2NYZGE7TLBABT4CU",
  version: "2.0",
} as const;

export const PI_PAYMENT_PRODUCTS = {
  checklist_test: {
    amount: 1,
    memo: "Director's Cut AI Pro checklist test",
  },
} as const;

export type PiProductId = keyof typeof PI_PAYMENT_PRODUCTS;

export interface PiUser {
  uid: string;
  username: string;
}

export interface PiPayment {
  identifier: string;
  user_uid: string;
  amount: number;
  memo: string;
  metadata: Record<string, unknown>;
  from_address: string;
  to_address: string;
  direction: string;
  created_at: string;
  network: string;
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
}

type PiAuthResult = {
  accessToken: string;
  user: PiUser;
};

type PiSdk = {
  authenticate: (
    scopes: string[],
    onIncompletePaymentFound: (payment: PiPayment) => void
  ) => Promise<PiAuthResult>;

  createPayment: (
    paymentData: {
      amount: number;
      memo: string;
      metadata: Record<string, unknown>;
    },
    callbacks: {
      onReadyForServerApproval: (
        paymentId: string
      ) => void | Promise<void>;

      onReadyForServerCompletion: (
        paymentId: string,
        txid: string
      ) => void | Promise<void>;

      onCancel: (paymentId: string) => void;

      onError: (
        error: Error,
        payment?: PiPayment
      ) => void;
    }
  ) => void;
};

type PaymentApiResponse = {
  payment?: PiPayment;
  error?: string;
  details?: unknown;
};

function getPiSdk(): PiSdk {
  if (typeof window === "undefined") {
    throw new Error("Pi SDK is only available in the browser.");
  }

  const pi = (
    window as typeof window & {
      Pi?: PiSdk;
    }
  ).Pi;

  if (!pi) {
    throw new Error("Pi SDK is not loaded.");
  }

  return pi;
}

async function callPaymentBackend(
  path: string,
  payload: Record<string, unknown>
): Promise<PiPayment> {
  const response = await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  let data: PaymentApiResponse;

  try {
    data = (await response.json()) as PaymentApiResponse;
  } catch {
    throw new Error(
      "The payment server returned an invalid response."
    );
  }

  if (!response.ok) {
    console.error("Payment backend error:", data);

    throw new Error(
      data.error ?? "The payment server rejected the request."
    );
  }

  if (!data.payment) {
    throw new Error(
      "The payment server did not return payment information."
    );
  }

  return data.payment;
}

export class PiNetworkService {
  private static instance: PiNetworkService;
  private user: PiUser | null = null;
  private accessToken: string | null = null;

  private constructor() {}

  static getInstance(): PiNetworkService {
    if (!PiNetworkService.instance) {
      PiNetworkService.instance = new PiNetworkService();
    }

    return PiNetworkService.instance;
  }

  async authenticate(): Promise<PiAuthResult> {
    const pi = getPiSdk();

    const auth = await pi.authenticate(
      ["username", "payments"],
      (payment) => {
        console.warn(
          "Incomplete Pi payment found:",
          payment
        );
      }
    );

    this.user = auth.user;
    this.accessToken = auth.accessToken;

    return auth;
  }

  getUser(): PiUser | null {
    return this.user;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  async createPayment(
    productId: PiProductId
  ): Promise<PiPayment> {
    const pi = getPiSdk();
    const product = PI_PAYMENT_PRODUCTS[productId];

    return new Promise<PiPayment>((resolve, reject) => {
      let settled = false;

      const fail = (error: unknown) => {
        if (settled) {
          return;
        }

        settled = true;

        reject(
          error instanceof Error
            ? error
            : new Error("Pi payment failed.")
        );
      };

      const succeed = (payment: PiPayment) => {
        if (settled) {
          return;
        }

        settled = true;
        resolve(payment);
      };

      pi.createPayment(
        {
          amount: product.amount,
          memo: product.memo,
          metadata: {
            productId,
            purpose: "developer_checklist_transaction",
          },
        },
        {
          onReadyForServerApproval: async (
            paymentId
          ) => {
            try {
              console.log(
                "Payment ready for server approval:",
                paymentId
              );

              await callPaymentBackend(
                "/api/payments/approve",
                {
                  paymentId,
                  productId,
                }
              );

              console.log(
                "Payment approved by server:",
                paymentId
              );
            } catch (error) {
              console.error(
                "Payment approval failed:",
                error
              );

              fail(error);
            }
          },

          onReadyForServerCompletion: async (
            paymentId,
            txid
          ) => {
            try {
              console.log(
                "Payment ready for server completion:",
                paymentId,
                txid
              );

              const payment =
                await callPaymentBackend(
                  "/api/payments/complete",
                  {
                    paymentId,
                    txid,
                    productId,
                  }
                );

              if (
                !payment.status
                  .transaction_verified ||
                !payment.status
                  .developer_completed
              ) {
                throw new Error(
                  "Pi payment was not fully verified."
                );
              }

              console.log(
                "Payment completed and verified:",
                payment
              );

              succeed(payment);
            } catch (error) {
              console.error(
                "Payment completion failed:",
                error
              );

              fail(error);
            }
          },

          onCancel: (paymentId) => {
            console.log(
              "Payment cancelled:",
              paymentId
            );

            fail(
              new Error(
                "Payment was cancelled by the user."
              )
            );
          },

          onError: (error, payment) => {
            console.error(
              "Pi payment error:",
              error,
              payment
            );

            fail(error);
          },
        }
      );
    });
  }
}

export const piNetwork =
  PiNetworkService.getInstance();