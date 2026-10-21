import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { AppWrapper } from "@/components/app-wrapper";
import "./globals.css";
import { RELEASE_DESCRIPTION } from "@/lib/mediaforge-release";

export const metadata: Metadata = {
  title: "Director's Cut AI Pro · MediaForge Prompt Studio",
  metadataBase: new URL("https://directors-cut-ai-pro.vercel.app"),
  description: RELEASE_DESCRIPTION,
  openGraph: {
    title: "Director's Cut AI Pro · MediaForge Prompt Studio v0.4",
    description: RELEASE_DESCRIPTION,
    url: "/",
    type: "website",
    images: [{ url: "/mediaforge-v02-workspace.webp", alt: "MediaForge workspace interface example" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MediaForge Prompt Studio v0.4 Preview",
    description: RELEASE_DESCRIPTION,
    images: ["/mediaforge-v02-workspace.webp"],
  },
  generator: "Director's Cut AI Pro",
  keywords: [
    "MediaForge Prompt Studio",
    "AI video prompts",
    "local AI",
    "Prompt Doctor",
    "Director's Cut AI Pro",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className={`${GeistSans.className} antialiased`}>
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
