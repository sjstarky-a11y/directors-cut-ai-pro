import { NextResponse } from "next/server";
import {
  callPiApi,
  isValidPaymentId,
  paymentBelongsToApp,
  type PiPaymentDTO,
} from "@/lib/server/pi-payments";

export const runtime = "nodejs";

/**
 * Cancels one of this app's payments that has not been completed yet.
 * Called when the visitor cancels or the Pi payment flow reports an error,
 * so that a half-finished payment never blocks the next one.
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

    if (payment.status.developer_completed) {
      return NextResponse.json(
        { error: "The payment is already completed." },
        { status: 409 }
      );
    }

    if (payment.status.cancelled || payment.status.user_cancelled) {
      return NextResponse.json({ payment }, { status: 200 });
    }

    const cancelled = await callPiApi(
      `/payments/${encodeURIComponent(paymentId)}/cancel`,
      { method: "POST" }
    );

    if (!cancelled.response.ok) {
      return NextResponse.json(
        {
          error: "Pi payment cancellation failed.",
          details: cancelled.data,
        },
        { status: cancelled.response.status }
      );
    }

    return NextResponse.json(
      { payment: cancelled.data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Pi payment cancel route error:", error);

    return NextResponse.json(
      { error: "Unable to cancel the Pi payment." },
      { status: 500 }
    );
  }
}
