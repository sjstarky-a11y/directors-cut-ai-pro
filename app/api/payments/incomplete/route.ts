import { NextResponse } from "next/server";
import {
  callPiApi,
  isValidPaymentId,
  isValidTxid,
  paymentBelongsToApp,
  type PiPaymentDTO,
} from "@/lib/server/pi-payments";

export const runtime = "nodejs";

/**
 * Resolves an incomplete payment reported by the Pi SDK
 * (onIncompletePaymentFound). A payment that already has a blockchain
 * transaction is completed; one that never reached the blockchain is
 * cancelled. Either way the visitor can start a new payment afterwards.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const paymentId = body?.paymentId;

    if (!isValidPaymentId(paymentId)) {
      return NextResponse.json(
        { error: "Invalid payment request." },
        { status: 400 }
      );
    }

    const current = await callPiApi(
      `/payments/${encodeURIComponent(paymentId)}`,
      { method: "GET" }
    );

    if (!current.response.ok) {
      return NextResponse.json(
        {
          error: "Unable to read the Pi payment.",
          details: current.data,
        },
        { status: current.response.status }
      );
    }

    const payment = current.data as PiPaymentDTO;

    if (!paymentBelongsToApp(payment)) {
      return NextResponse.json(
        { error: "Payment does not belong to this app." },
        { status: 409 }
      );
    }

    if (
      payment.status.developer_completed ||
      payment.status.cancelled ||
      payment.status.user_cancelled
    ) {
      return NextResponse.json(
        { payment, action: "none" },
        { status: 200 }
      );
    }

    const txid = payment.transaction?.txid;

    if (isValidTxid(txid)) {
      const completed = await callPiApi(
        `/payments/${encodeURIComponent(paymentId)}/complete`,
        {
          method: "POST",
          body: JSON.stringify({ txid }),
        }
      );

      if (!completed.response.ok) {
        return NextResponse.json(
          {
            error: "Completing the incomplete Pi payment failed.",
            details: completed.data,
          },
          { status: completed.response.status }
        );
      }

      return NextResponse.json(
        { payment: completed.data, action: "completed" },
        { status: 200 }
      );
    }

    const cancelled = await callPiApi(
      `/payments/${encodeURIComponent(paymentId)}/cancel`,
      { method: "POST" }
    );

    if (!cancelled.response.ok) {
      return NextResponse.json(
        {
          error: "Cancelling the incomplete Pi payment failed.",
          details: cancelled.data,
        },
        { status: cancelled.response.status }
      );
    }

    return NextResponse.json(
      { payment: cancelled.data, action: "cancelled" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Pi incomplete payment route error:", error);

    return NextResponse.json(
      { error: "Unable to resolve the incomplete Pi payment." },
      { status: 500 }
    );
  }
}
