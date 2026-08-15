import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "MediaForge Prompt Studio v0.2 · Download & Browser Demo",
  description:
    "Try Prompt Doctor in your browser or download MediaForge Prompt Studio v0.2 for Windows and Linux. Local AI, Fidelity Guard, Visual Proof Frame and Model Adapter.",
  keywords: [
    "MediaForge Prompt Studio",
    "Prompt Doctor",
    "AI video prompt generator",
    "local AI video tools",
    "Windows AI tools",
    "Linux AI tools",
  ],
};

export default function PromptDoctorLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
