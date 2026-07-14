import { NextResponse } from "next/server";
import {
  callPiApi,
  isPiProductId,
  isValidPaymentId,
  isValidTxid,
  paymentMatchesProduct,
  type PiPaymentDTO,
} from "@/lib/server/pi-payments";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const paymentId = body?.paymentId;
    const txid = body?.txid;
    const productId = body?.productId;

    if (
      !isValidPaymentId(paymentId) ||
      !isValidTxid(txid) ||
      !isPiProductId(productId)
    ) {
      return NextResponse.json(
        { error: "Invalid payment completion request." },
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

    const currentPayment = current.data as PiPaymentDTO;

    if (!paymentMatchesProduct(currentPayment, productId)) {
      return NextResponse.json(
        { error: "Payment does not match the requested product." },
        { status: 409 }
      );
    }

    if (currentPayment.status.developer_completed) {
      if (currentPayment.transaction?.txid !== txid) {
        return NextResponse.json(
          { error: "Completed payment has a different transaction ID." },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { payment: currentPayment },
        { status: 200 }
      );
    }

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
          error: "Pi payment completion failed.",
          details: completed.data,
        },
        { status: completed.response.status }
      );
    }

    const completedPayment = completed.data as PiPaymentDTO;

    if (
      !paymentMatchesProduct(completedPayment, productId) ||
      !completedPayment.status.transaction_verified ||
      !completedPayment.status.developer_completed ||
      completedPayment.transaction?.txid !== txid
    ) {
      return NextResponse.json(
        { error: "Pi payment was not fully verified." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { payment: completedPayment },
      { status: 200 }
    );
  } catch (error) {
    console.error("Pi payment completion route error:", error);

    return NextResponse.json(
      { error: "Unable to complete the Pi payment." },
      { status: 500 }
    );
  }
}