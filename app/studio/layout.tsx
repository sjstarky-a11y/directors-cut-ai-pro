import type { Metadata } from "next";
import type { ReactNode } from "react";

import { PiAuthGate } from "@/components/pi-auth-gate";

export const metadata: Metadata = {
  title: "Prompt Doctor Lite | Director's Cut AI Pro",
  description:
    "Turn a rough idea into a stronger AI video prompt with camera direction, lighting, a negative prompt and a shot plan. Free for Pi users.",
  alternates: { canonical: "/studio" },
};

export default function StudioLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <PiAuthGate>{children}</PiAuthGate>;
}
