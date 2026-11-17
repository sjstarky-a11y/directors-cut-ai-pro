"use client";

import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";
import {
  isPiBrowserEnvironment,
  usePiAuth,
} from "@/contexts/pi-auth-context";

/**
 * Consent notice shown once, inside the Pi Browser, before the app asks Pi
 * for anything. The visitor can read the home page while it is visible.
 * "Continue with Pi" records the consent and opens Pi's own Allow/Cancel
 * dialog; "Not now" hides the notice for this visit only.
 */
export function PiConsentBanner() {
  const { isAuthenticated, isAuthenticating, hasConsent, signIn } =
    usePiAuth();
  const [inPiBrowser, setInPiBrowser] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setInPiBrowser(isPiBrowserEnvironment());
  }, []);

  if (!inPiBrowser || isAuthenticated || hasConsent || dismissed) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-label="Sign in with Pi"
      className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4"
    >
      <div className="mx-auto max-w-md rounded-2xl border border-gray-700 bg-gray-900/95 p-5 text-white shadow-2xl backdrop-blur">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-purple-300" />
          <div>
            <p className="font-semibold">Continue with your Pi account?</p>
            <p className="mt-1 text-sm leading-6 text-gray-300">
              Director&apos;s Cut AI Pro would like to read your Pi username to
              sign you in. Pi will ask you to confirm. No Pi is spent and
              nothing else is shared. You can keep browsing without signing
              in.
            </p>
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={() => void signIn()}
            disabled={isAuthenticating}
            className="inline-flex h-10 flex-1 items-center justify-center rounded-md bg-gradient-to-r from-purple-600 to-pink-600 px-4 text-sm font-semibold text-white disabled:opacity-60"
          >
            {isAuthenticating ? "Signing in…" : "Continue with Pi"}
          </button>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="inline-flex h-10 items-center justify-center rounded-md border border-gray-600 px-4 text-sm text-gray-200"
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}
