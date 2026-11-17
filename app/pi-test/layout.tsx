import type { Metadata } from "next";
import type { ReactNode } from "react";

import { PiAuthGate } from "@/components/pi-auth-gate";

export const metadata: Metadata = {
  title: "Pi payment test | Director's Cut AI Pro",
  description: "Testnet payment check for Director's Cut AI Pro.",
  robots: { index: false, follow: false },
};

export default function PiTestLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <PiAuthGate>{children}</PiAuthGate>;
}
