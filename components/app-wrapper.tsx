"use client";

import type { ReactNode } from "react";
import { PiAuthProvider } from "@/contexts/pi-auth-context";
import { PiConsentBanner } from "@/components/pi-consent-banner";

export function AppWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <PiAuthProvider>
      {children}
      <PiConsentBanner />
    </PiAuthProvider>
  );
}
