import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { AppWrapper } from "@/components/app-wrapper";
import "./globals.css";

export const metadata: Metadata = {
  title: "Director's Cut AI Pro · MediaForge Prompt Studio",
  description:
    "Download MediaForge Prompt Studio v0.2 for Windows or Linux: a private local AI workspace for stronger video prompts, fidelity protection and visual proof frames.",
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
