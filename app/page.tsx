"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Clapperboard,
  Film,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { PiLoginButton } from "@/components/pi-login-button";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950 text-white">
      <div className="mx-auto max-w-7xl px-5 py-6 sm:px-8">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-lg font-bold shadow-lg shadow-purple-950/40">
              DC
            </div>

            <div>
              <h1 className="text-xl font-bold sm:text-2xl">
                Director&apos;s Cut AI Pro
              </h1>

              <p className="text-sm text-gray-400">
                Prompt and pre-production studio
              </p>
            </div>
          </Link>

          <PiLoginButton />
        </header>

        <section className="relative py-16 sm:py-24">
          <div className="pointer-events-none absolute left-1/2 top-12 h-72 w-72 -translate-x-1/2 rounded-full bg-purple-500/20 blur-3xl" />

          <div className="relative mx-auto max-w-5xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-200">
              <Sparkles className="h-4 w-4" />
              Prompt Doctor Beta is available now
            </div>

            <h2 className="text-4xl font-bold leading-tight sm:text-6xl lg:text-7xl">
              Turn rough ideas into
              <span className="block bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                production-ready video plans.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-gray-400 sm:text-xl sm:leading-8">
              Improve weak prompts, define camera direction,
              strengthen lighting and mood, create negative prompts
              and build practical shot lists for AI video production.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/prompt-doctor"
                className="inline-flex h-12 items-center justify-center rounded-md bg-gradient-to-r from-purple-600 to-pink-600 px-7 text-base font-medium transition hover:from-purple-700 hover:to-pink-700"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Open Prompt Doctor
              </Link>

              <Link
                href="/editor"
                className="inline-flex h-12 items-center justify-center rounded-md border border-gray-700 bg-transparent px-7 text-base font-medium text-gray-300 transition hover:bg-gray-800"
              >
                <Clapperboard className="mr-2 h-5 w-5" />
                Scene Planner Preview
              </Link>
            </div>

            <p className="mt-4 text-sm text-emerald-300/80">
              The current Prompt Doctor works locally in your browser.
              Your prompt is not sent to an external AI provider.
            </p>
          </div>
        </section>

        <section className="grid gap-5 pb-12 md:grid-cols-3">
          <FeatureCard
            icon={<Sparkles className="h-6 w-6" />}
            badge="Available now"
            title="Prompt Doctor"
            description="Transform a rough idea into a structured prompt with camera direction, lighting, negative constraints, continuity notes and a practical shot plan."
            href="/prompt-doctor"
            linkLabel="Open workspace"
          />

          <FeatureCard
            icon={<Clapperboard className="h-6 w-6" />}
            badge="Preview"
            title="Scene & Shot Planner"
            description="Explore the visual timeline and prepare the foundation for editable scenes, shot order, duration and production notes."
            href="/editor"
            linkLabel="Open preview"
          />

          <FeatureCard
            icon={<Film className="h-6 w-6" />}
            badge="Future phase"
            title="AI Video Editor"
            description="A future workspace for user images and video clips, media analysis, editing suggestions, continuity and AI-assisted video creation."
          />
        </section>

        <section className="mb-10 rounded-2xl border border-gray-800 bg-gray-900/60 p-6 backdrop-blur sm:p-8">
          <div className="grid gap-6 md:grid-cols-[auto_1fr] md:items-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-300">
              <ShieldCheck className="h-7 w-7" />
            </div>

            <div>
              <h3 className="text-xl font-bold">
                Simple, private and useful from day one
              </h3>

              <p className="mt-2 max-w-4xl leading-7 text-gray-400">
                The first public version focuses on prompt improvement
                and production planning. Advanced AI generation, media
                processing and paid features will be introduced only
                after they are fully functional and ready for real users.
              </p>
            </div>
          </div>
        </section>

        <footer className="border-t border-gray-800 py-6 text-center text-sm text-gray-500">
          Director&apos;s Cut AI Pro · Built for video creators in the Pi ecosystem
        </footer>
      </div>
    </main>
  );
}

function FeatureCard({
  icon,
  badge,
  title,
  description,
  href,
  linkLabel,
}: {
  icon: ReactNode;
  badge: string;
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
}) {
  const content = (
    <article className="group flex h-full flex-col rounded-2xl border border-gray-800 bg-gray-900/65 p-6 transition hover:border-purple-500/40 hover:bg-gray-900/90">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-300">
          {icon}
        </div>

        <span className="rounded-full border border-gray-700 bg-gray-950/70 px-3 py-1 text-xs text-gray-400">
          {badge}
        </span>
      </div>

      <h3 className="text-xl font-bold">{title}</h3>

      <p className="mt-3 flex-1 leading-7 text-gray-400">
        {description}
      </p>

      {href && linkLabel && (
        <div className="mt-5 flex items-center gap-2 text-sm font-medium text-purple-300">
          {linkLabel}
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </div>
      )}
    </article>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}