import type { Metadata } from "next";
import type { ReactNode } from "react";

import { RELEASE_DESCRIPTION } from "@/lib/mediaforge-release";

export const metadata: Metadata = {
  title: "MediaForge Prompt Studio v0.4 · Windows, Linux & Intel GPU",
  description: RELEASE_DESCRIPTION,
  alternates: { canonical: "/prompt-doctor" },
  openGraph: {
    title: "MediaForge Prompt Studio v0.4 Preview",
    description: RELEASE_DESCRIPTION,
    url: "/prompt-doctor",
    type: "website",
    images: [{ url: "/mediaforge-v02-workspace.webp", alt: "MediaForge workspace interface example" }],
  },
};

export default function PromptDoctorLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
