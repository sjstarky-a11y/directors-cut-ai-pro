"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { usePiAuth } from "@/contexts/pi-auth-context";
import {
  PI_PAYMENT_PRODUCTS,
  piNetwork,
  type PiPayment,
} from "@/lib/pi-network";

type Phase = "idle" | "working" | "done" | "failed";

export default function PiTestPage() {
  const { userData } = usePiAuth();
  const [phase, setPhase] = useState<Phase>("idle");
  const [message, setMessage] = useState("");
  const [payment, setPayment] = useState<PiPayment | null>(null);

  const product = PI_PAYMENT_PRODUCTS.checklist_test;

  const runTestPayment = async () => {
    setPhase("working");
    setMessage("Asking Pi for permission to make a payment…");
    setPayment(null);

    try {
      // Payments need the "payments" permission, which is requested here and
      // not at ordinary sign-in.
      await piNetwork.authenticate();

      setMessage("Confirm the payment in the Pi window…");

      const completed = await piNetwork.createPayment("checklist_test");

      setPayment(completed);
      setPhase("done");
      setMessage("Payment completed and verified.");
    } catch (error) {
      console.error("Pi test payment failed:", error);
      setPhase("failed");
      setMessage(
        error instanceof Error
          ? error.message
          : "The payment could not be completed."
      );
    }
  };

  const working = phase === "working";

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950 px-4 py-10 text-white">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900/80 p-8 shadow-xl">
        <h1 className="text-2xl font-bold">Pi payment test</h1>

        <p className="mt-3 text-sm leading-6 text-gray-400">
          This page checks that Director&apos;s Cut AI Pro can receive a
          payment from a Pi user. It uses{" "}
          <strong className="text-gray-200">Test-Pi on the Pi Testnet</strong>,
          which has no value. Nothing is unlocked or sold.
        </p>

        {userData && (
          <p className="mt-4 text-sm text-gray-300">
            Signed in as <strong>@{userData.username}</strong>
          </p>
        )}

        <dl className="mt-5 space-y-1 rounded-lg border border-gray-800 bg-gray-950/60 p-4 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-gray-400">Amount</dt>
            <dd>{product.amount} Test-Pi</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-gray-400">Memo</dt>
            <dd className="text-right">{product.memo}</dd>
          </div>
        </dl>

        <button
          type="button"
          onClick={() => void runTestPayment()}
          disabled={working}
          className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-600 px-4 text-sm font-semibold text-white transition hover:from-purple-700 hover:to-pink-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {working && <Loader2 className="h-4 w-4 animate-spin" />}
          {working ? "Working…" : `Pay ${product.amount} Test-Pi`}
        </button>

        {message && (
          <p
            role="status"
            aria-live="polite"
            className={`mt-4 flex items-start gap-2 text-sm ${
              phase === "failed"
                ? "text-red-300"
                : phase === "done"
                  ? "text-green-300"
                  : "text-gray-300"
            }`}
          >
            {phase === "done" && (
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            )}
            <span>{message}</span>
          </p>
        )}

        {payment && (
          <dl className="mt-4 space-y-1 break-all rounded-lg border border-gray-800 bg-gray-950/60 p-4 text-xs text-gray-400">
            <div>
              <dt className="text-gray-500">Payment ID</dt>
              <dd>{payment.identifier}</dd>
            </div>
            {payment.transaction?.txid && (
              <div>
                <dt className="text-gray-500">Transaction ID</dt>
                <dd>{payment.transaction.txid}</dd>
              </div>
            )}
            <div>
              <dt className="text-gray-500">Network</dt>
              <dd>{payment.network}</dd>
            </div>
          </dl>
        )}

        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 text-sm text-purple-300 hover:text-purple-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
      </div>
    </main>
  );
}
