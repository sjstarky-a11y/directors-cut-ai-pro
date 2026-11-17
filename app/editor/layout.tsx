import type { ReactNode } from "react";

import { PiAuthGate } from "@/components/pi-auth-gate";

export default function EditorLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <PiAuthGate>{children}</PiAuthGate>;
}
