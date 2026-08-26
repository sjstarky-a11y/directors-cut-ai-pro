import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "MediaForge Prompt Studio v0.3 · Download & Hero Frame Preview",
  description:
    "Try Prompt Doctor in your browser or download MediaForge Prompt Studio v0.3 for Windows and Linux. Local AI, Fidelity Guard, Visual Proof, Hero Frame Set and Model Adapter.",
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
