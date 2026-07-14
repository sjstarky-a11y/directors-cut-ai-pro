"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { usePiAuth } from "@/contexts/pi-auth-context";

export function PiLoginButton() {
  const {
    isAuthenticated,
    authMessage,
    userData,
    reinitialize,
  } = usePiAuth();

  const [isRetrying, setIsRetrying] =
    useState(false);

  const handleRetry = async () => {
    setIsRetrying(true);

    try {
      await reinitialize();
    } finally {
      setIsRetrying(false);
    }
  };

  if (isAuthenticated && userData) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-lg">
        <div className="w-2 h-2 bg-purple-500 rounded-full" />

        <span className="text-sm font-medium text-purple-300">
          @{userData.username}
        </span>
      </div>
    );
  }

  return (
    <Button
      onClick={handleRetry}
      disabled={isRetrying}
      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
      title={authMessage}
    >
      {isRetrying
        ? "Connecting..."
        : "Connect with Pi"}
    </Button>
  );
}