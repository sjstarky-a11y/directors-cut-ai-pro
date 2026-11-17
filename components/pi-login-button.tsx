"use client";

import { usePiAuth } from "@/contexts/pi-auth-context";

export function PiLoginButton() {
  const { isAuthenticated, isAuthenticating, userData, signIn, signOut } =
    usePiAuth();

  if (isAuthenticated && userData) {
    return (
      <span className="inline-flex items-center gap-2">
        <span
          className="inline-flex items-center justify-center rounded-md border border-emerald-400/30 bg-emerald-500/10 px-3 py-2 text-sm font-semibold text-emerald-200"
          title="Signed in with Pi"
        >
          @{userData.username}
        </span>
        <button
          type="button"
          onClick={signOut}
          className="text-xs text-gray-400 underline hover:text-gray-200"
        >
          Sign out
        </button>
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={() => void signIn()}
      disabled={isAuthenticating}
      className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 text-sm font-semibold text-white transition hover:from-purple-700 hover:to-pink-700 disabled:cursor-not-allowed disabled:opacity-60"
      title="Sign in with your Pi account"
    >
      {isAuthenticating ? "Signing in…" : "Sign in with Pi"}
    </button>
  );
}
