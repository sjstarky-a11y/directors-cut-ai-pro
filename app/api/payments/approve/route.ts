import { NextResponse } from "next/server";
import {
  callPiApi,
  isPiProductId,
  isValidPaymentId,
  paymentMatchesProduct,
  type PiPaymentDTO,
} from "@/lib/server/pi-payments";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const paymentId = body?.paymentId;
    const productId = body?.productId;

    if (!isValidPaymentId(paymentId) || !isPiProductId(productId)) {
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

    if (!paymentMatchesProduct(payment, productId)) {
      return NextResponse.json(
        { error: "Payment does not match the requested product." },
        { status: 409 }
      );
    }

    if (
      payment.status.developer_approved ||
      payment.status.developer_completed
    ) {
      return NextResponse.json(
        { payment },
        { status: 200 }
      );
    }

    const approved = await callPiApi(
      `/payments/${encodeURIComponent(paymentId)}/approve`,
      { method: "POST" }
    );

    if (!approved.response.ok) {
      return NextResponse.json(
        {
          error: "Pi payment approval failed.",
          details: approved.data,
        },
        { status: approved.response.status }
      );
    }

    return NextResponse.json(
      { payment: approved.data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Pi payment approval route error:", error);

    return NextResponse.json(
      { error: "Unable to approve the Pi payment." },
      { status: 500 }
    );
  }
}