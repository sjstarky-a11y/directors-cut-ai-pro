"use client";

import Link from "next/link";
import { ArrowLeft, Loader2, LockKeyhole } from "lucide-react";
import { usePiAuth } from "@/contexts/pi-auth-context";

/**
 * Shows its children only after the visitor has signed in with a Pi account
 * and the access token has been verified on the server (/api/auth/pi).
 * Public pages (home, pricing, contact, privacy, terms) are not wrapped, so
 * visitors can still read about the app before signing in.
 */
export function PiAuthGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isAuthenticating, authMessage, signIn } =
    usePiAuth();
  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950 px-4 py-8 text-white">
      <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900/80 p-8 text-center shadow-xl">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-purple-500/10 text-purple-300">
          {isAuthenticating ? (
            <Loader2 className="h-7 w-7 animate-spin" />
          ) : (
            <LockKeyhole className="h-7 w-7" />
          )}
        </div>

        <h1 className="mt-5 text-2xl font-bold">
          Sign in with Pi to continue
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-400">
          This part of Director&apos;s Cut AI Pro is available to
          signed-in Pioneers. When you tap the button, Pi will ask you to
          allow this app to read your Pi username. Nothing else is shared,
          and you can cancel.
        </p>

        <p
          className="mt-4 text-sm text-gray-300"
          role="status"
          aria-live="polite"
        >
          {authMessage}
        </p>

        <button
          type="button"
          onClick={() => void signIn()}
          disabled={isAuthenticating}
          className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-md bg-gradient-to-r from-purple-600 to-pink-600 px-4 text-sm font-semibold text-white transition hover:from-purple-700 hover:to-pink-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isAuthenticating ? "Signing in…" : "Sign in with Pi"}
        </button>

        <Link
          href="/"
          className="mt-5 inline-flex items-center gap-2 text-sm text-purple-300 hover:text-purple-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
      </div>
    </main>
  );
}
