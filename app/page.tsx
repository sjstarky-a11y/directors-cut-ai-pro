"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clapperboard,
  Cpu,
  Download,
  Film,
  MonitorCog,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { PiLoginButton } from "@/components/pi-login-button";

const RELEASE_URL =
  "https://github.com/sjstarky-a11y/mediaforge-prompt-studio/releases/tag/v0.3";
const WINDOWS_URL =
  "https://github.com/sjstarky-a11y/mediaforge-prompt-studio/releases/download/v0.3/MediaForge-Prompt-Studio-v0.3-Windows-x64.zip";
const LINUX_URL =
  "https://github.com/sjstarky-a11y/mediaforge-prompt-studio/releases/download/v0.3/MediaForge-Prompt-Studio-v0.3-Linux-x86_64.tar.gz";
export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#07070d] text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <header className="flex items-center justify-between py-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 font-bold">
              DC
            </div>
            <div>
              <h1 className="text-xl font-bold sm:text-2xl">Director&apos;s Cut AI Pro</h1>
              <p className="text-sm text-gray-400">AI video pre-production platform</p>
            </div>
          </Link>
          <nav className="flex items-center gap-2 sm:gap-3" aria-label="Primary navigation">
            <Link
              href="/pricing"
              className="inline-flex h-10 items-center justify-center rounded-md border border-gray-700 bg-gray-900/70 px-4 text-sm font-semibold text-gray-200 transition hover:border-purple-400/50 hover:bg-gray-800"
            >
              Pricing
            </Link>
            <PiLoginButton />
          </nav>
        </header>

        <section className="relative py-16 sm:py-24">
          <div className="pointer-events-none absolute left-1/2 top-12 h-72 w-72 -translate-x-1/2 rounded-full bg-purple-500/20 blur-3xl" />
          <div className="relative mx-auto max-w-5xl text-center">
            <Link
              href={RELEASE_URL}
              target="_blank"
              rel="noreferrer"
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-200 transition hover:bg-emerald-500/15"
            >
              <Sparkles className="h-4 w-4" />
              MediaForge Prompt Studio v0.3 Public Preview
            </Link>

            <h2 className="text-4xl font-bold leading-tight sm:text-6xl lg:text-7xl">
              Turn rough ideas into
              <span className="block bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">
                stronger AI video prompts.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-gray-400 sm:text-xl sm:leading-8">
              Diagnose weak prompts, protect creative intent, confirm the scene
              with a local proof frame, and prepare the final prompt for your AI
              video service — on your own computer.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/prompt-doctor"
                className="inline-flex h-12 items-center justify-center rounded-md bg-gradient-to-r from-purple-600 to-cyan-500 px-7 text-base font-semibold text-[#090a0f] transition hover:brightness-110"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Explore MediaForge v0.3
              </Link>
              <Link
                href={WINDOWS_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-md border border-gray-700 bg-gray-900/70 px-7 text-base font-medium text-gray-200 transition hover:border-gray-600 hover:bg-gray-800"
              >
                <Download className="mr-2 h-5 w-5" />
                Download for Windows
              </Link>
              <Link
                href={LINUX_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-md border border-gray-700 bg-transparent px-7 text-base font-medium text-gray-300 transition hover:bg-gray-800"
              >
                <Download className="mr-2 h-5 w-5" />
                Download for Linux
              </Link>
            </div>

            <p className="mx-auto mt-4 max-w-4xl text-sm leading-6 text-emerald-300/80">
              Windows and Linux packages · CPU runtime included · Optional NVIDIA acceleration · Local processing through Docker
            </p>
          </div>
        </section>

        <section className="grid gap-5 pb-12 md:grid-cols-3">
          <FeatureCard
            icon={<Sparkles className="h-6 w-6" />}
            badge="Available · v0.3"
            title="MediaForge Prompt Studio"
            description="The complete local workspace: Prompt Doctor, Fidelity Guard, Visual Proof, Hero Frame Set, and transparent model adaptation for AI video services."
            href="/prompt-doctor"
            linkLabel="Features, instructions & downloads"
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
            description="A future workspace for user images and video clips, media analysis, continuity and AI-assisted video creation."
          />
        </section>

        <section className="mb-10 overflow-hidden rounded-3xl border border-purple-400/25 bg-gradient-to-br from-purple-500/[0.10] via-[#10121a] to-cyan-400/[0.06] p-6 sm:p-8 lg:p-10">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-300">Real workflow examples</p>
            <h3 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">From one prompt to a chosen Hero Frame.</h3>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-gray-400 sm:text-base">
              These locally generated frame options preserve the core scene while exploring composition, pose and atmosphere. The creator selects the image that best represents the intended video scene.
            </p>
            <p className="mt-4 inline-flex rounded-full border border-amber-300/25 bg-amber-300/10 px-3 py-1.5 text-xs font-medium text-amber-100/80">
              Included in v0.3 Public Preview · Three local Hero Frame candidates, visible progress, creator selection and safe stop-after-current-frame control.
            </p>
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-2">
            <WorkflowExample
              title="Golden-hour lion"
              originalPrompt="Cinematic, close-up shot of a majestic lion walking across the African savannah at sunset, soft and dramatic golden hour lighting"
              refinedPrompt="Cinematic close-up of a majestic lion walking across the African savannah at sunset, with soft, dramatic golden-hour lighting."
              selectedIndex={1}
              frames={[
                "/mediaforge-demo/lion-option-1.png",
                "/mediaforge-demo/lion-option-2.png",
                "/mediaforge-demo/lion-option-3.png",
              ]}
            />
            <WorkflowExample
              title="Storm on the boat deck"
              originalPrompt="Cinematic medium shot of two people standing on the deck of a boat in the heavy rain, warm lighting from the cabin against dark stormy ocean waves, dramatic atmosphere, photorealistic"
              refinedPrompt="Cinematic medium shot of two people on a boat deck in heavy rain; warm cabin light contrasts with dark, stormy ocean waves. Dramatic, photorealistic atmosphere."
              selectedIndex={2}
              frames={[
                "/mediaforge-demo/boat-option-1.png",
                "/mediaforge-demo/boat-option-2.png",
                "/mediaforge-demo/boat-option-3.png",
              ]}
            />
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-gray-800 bg-black/20 p-5 text-center sm:flex-row sm:text-left">
            <p className="max-w-3xl text-sm leading-6 text-gray-400">
              <span className="font-bold text-gray-200">Why three options?</span> Hero Frame Set gives the creator a controlled visual comparison before committing to image-to-video generation. The scene stays anchored while composition, pose and atmosphere can vary.
            </p>
            <Link href="/prompt-doctor" className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-purple-300 transition hover:text-purple-200">
              See the full MediaForge workflow <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <section className="mb-10 overflow-hidden rounded-3xl border border-gray-800 bg-gray-900/60 p-6 backdrop-blur sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-300">
                  <ShieldCheck className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Local AI, private by design</h3>
                  <p className="mt-1 text-gray-400">A simple interface over an adaptive local runtime.</p>
                </div>
              </div>
              <p className="mt-5 max-w-4xl leading-7 text-gray-400">
                MediaForge runs its AI workflow locally through Docker Model
                Runner and a local image service. It automatically chooses a
                compatible CPU runtime, with optional NVIDIA acceleration when available, while advanced model choices stay
                out of the way unless the user opens Developer settings.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <StatusItem icon={<Cpu className="h-4 w-4" />} text="CPU fallback included" />
                <StatusItem icon={<MonitorCog className="h-4 w-4" />} text="Optional NVIDIA low-memory mode" />
                <StatusItem icon={<CheckCircle2 className="h-4 w-4" />} text="58 automated checks" />
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Link
                href={WINDOWS_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-cyan-400 px-6 text-sm font-bold text-[#08090f] transition hover:brightness-110"
              >
                <Download className="mr-2 h-4 w-4" />
                Download for Windows
              </Link>
              <Link
                href={LINUX_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-gray-700 bg-[#11131a] px-6 text-sm font-semibold text-gray-200 transition hover:border-purple-400/50"
              >
                <Download className="mr-2 h-4 w-4" />
                Download for Linux
              </Link>
            </div>
          </div>
        </section>

        <footer className="flex flex-col items-center justify-between gap-3 border-t border-gray-800 py-6 text-center text-sm text-gray-500 sm:flex-row sm:text-left">
          <span>Director&apos;s Cut AI Pro · Home of MediaForge Prompt Studio · Built for video creators worldwide, including the Pi ecosystem</span>
          <Link href="/pricing" className="shrink-0 font-semibold text-purple-300 transition hover:text-purple-200">
            Future plans &amp; Pi payments
          </Link>
        </footer>
      </div>
    </main>
  );
}

function StatusItem({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-gray-800 bg-black/20 px-3 py-3 text-sm text-gray-300">
      <span className="text-emerald-300">{icon}</span>
      {text}
    </div>
  );
}

function WorkflowExample({ title, originalPrompt, refinedPrompt, frames, selectedIndex }: {
  title: string;
  originalPrompt: string;
  refinedPrompt: string;
  frames: string[];
  selectedIndex: number;
}) {
  return (
    <article className="rounded-2xl border border-gray-800 bg-[#0c0e15]/90 p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h4 className="text-xl font-black text-white">{title}</h4>
        <span className="rounded-full border border-purple-400/25 bg-purple-400/10 px-3 py-1 text-xs font-bold text-purple-200">3 × Hero Frame options</span>
      </div>
      <div className="mt-4 grid gap-3 rounded-xl border border-gray-800 bg-black/25 p-3">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.12em] text-gray-500">01 · Original prompt</p>
          <p className="mt-1 text-sm leading-6 text-gray-300">{originalPrompt}</p>
        </div>
        <div className="border-t border-gray-800 pt-3">
          <p className="text-[11px] font-black uppercase tracking-[0.12em] text-emerald-300">02 · Prompt Doctor · Intent protected</p>
          <p className="mt-1 text-sm leading-6 text-gray-300">{refinedPrompt}</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
        {frames.map((src, index) => {
          const selected = index === selectedIndex;
          return (
            <div key={src} className={`relative overflow-hidden rounded-xl border-2 bg-[#11131a] ${selected ? "border-emerald-300 shadow-[0_0_0_2px_rgba(110,231,183,0.13)]" : "border-gray-700"}`}>
              <img src={src} alt={`${title} — Hero Frame option ${index + 1}`} className="aspect-square h-full w-full object-cover" />
              <span className={`absolute bottom-1 left-1 rounded-full px-1.5 py-0.5 text-[9px] font-black ${selected ? "bg-emerald-300 text-[#082018]" : "bg-black/75 text-white"}`}>
                {selected ? "✓ HERO FRAME" : `Option ${index + 1}`}
              </span>
            </div>
          );
        })}
      </div>
      <p className="mt-4 text-xs leading-5 text-gray-400">Select the candidate that best represents the intended scene, then use it as the starting image for an AI video workflow.</p>
    </article>
  );
}

function FeatureCard({ icon, badge, title, description, href, linkLabel }: {
  icon: ReactNode;
  badge: string;
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
}) {
  const content = (
    <article className="group flex h-full flex-col rounded-2xl border border-gray-800 bg-gray-900/60 p-6 backdrop-blur transition hover:border-purple-500/40 hover:bg-gray-900/80">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-300">{icon}</div>
        <span className="rounded-full border border-gray-700 bg-gray-950/70 px-3 py-1 text-xs text-gray-400">{badge}</span>
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-3 flex-1 leading-7 text-gray-400">{description}</p>
      {href && linkLabel && (
        <div className="mt-5 flex items-center gap-2 text-sm font-medium text-purple-300">
          {linkLabel}<ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </div>
      )}
    </article>
  );

  return href ? <Link href={href} className="block h-full">{content}</Link> : content;
}
