// Shared (client + server) definition of the products that may be paid with Pi.
// The server only approves/completes payments that match one of these exactly.

export const PI_PAYMENT_PRODUCTS = {
  checklist_test: {
    amount: 1,
    memo: "Director's Cut AI Pro checklist test",
  },
} as const;

export type PiProductId = keyof typeof PI_PAYMENT_PRODUCTS;

export function isPiProductId(value: unknown): value is PiProductId {
  return (
    typeof value === "string" &&
    Object.prototype.hasOwnProperty.call(PI_PAYMENT_PRODUCTS, value)
  );
}
