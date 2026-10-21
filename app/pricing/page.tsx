import Link from "next/link";
import { ArrowLeft, Coins, Download, Sparkles } from "lucide-react";
import { PiLoginButton } from "@/components/pi-login-button";

const plans = ["Basic", "Pro", "Enterprise"];

import { RELEASE_URL, RELEASE_LABEL, LICENSE_URL } from "@/lib/mediaforge-release";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#07070d] text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <header className="flex flex-wrap items-center justify-between gap-4 py-6">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 font-bold">
              DC
            </div>
            <div className="min-w-0">
              <p className="truncate text-lg font-bold sm:text-2xl">
                Director&apos;s Cut AI Pro
              </p>
              <p className="hidden text-sm text-gray-400 sm:block">
                AI video pre-production platform
              </p>
            </div>
          </Link>

          <nav className="flex shrink-0 items-center gap-2 sm:gap-3" aria-label="Primary navigation">
            <Link
              href="/"
              className="inline-flex h-10 items-center justify-center rounded-md border border-gray-700 bg-gray-900/70 px-3 text-sm font-semibold text-gray-200 transition hover:border-purple-400/50 hover:bg-gray-800 sm:px-4"
            >
              <ArrowLeft className="mr-1.5 h-4 w-4" />
              Home
            </Link>
            <PiLoginButton />
          </nav>
        </header>

        <section className="relative py-14 text-center sm:py-20">
          <div className="pointer-events-none absolute left-1/2 top-8 h-64 w-64 -translate-x-1/2 rounded-full bg-purple-500/20 blur-3xl" />
          <div className="relative mx-auto max-w-4xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/10 px-4 py-2 text-sm font-semibold text-purple-200">
              <Sparkles className="h-4 w-4" />
              Transparent public-preview roadmap
            </p>
            <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-6xl">
              Use the public preview now.
              <span className="block bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">
                Future plans will come later.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-gray-400 sm:text-xl sm:leading-8">
              MediaForge Prompt Studio {RELEASE_LABEL} is available for personal,
              non-commercial evaluation on Windows and Linux.
            </p>
          </div>
        </section>

        <section className="mx-auto mb-14 max-w-4xl overflow-hidden rounded-3xl border border-emerald-400/25 bg-gradient-to-br from-emerald-500/[0.10] via-[#10121a] to-cyan-400/[0.06] p-6 sm:p-8">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-300">
                Available now
              </p>
              <h3 className="mt-2 text-2xl font-black sm:text-3xl">
                MediaForge Prompt Studio {RELEASE_LABEL}
              </h3>
              <p className="mt-3 max-w-2xl leading-7 text-gray-400">
                Explore Prompt Doctor, Visual Proof and the Hero Frame workflow
                locally while the product is in public testing. See the <Link href={LICENSE_URL} target="_blank" rel="noreferrer" className="text-purple-300 underline hover:text-purple-200">evaluation license</Link> for permitted use.
              </p>
            </div>
            <Link
              href={RELEASE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-cyan-400 px-6 text-sm font-bold text-[#08090f] transition hover:brightness-110"
            >
              <Download className="mr-2 h-4 w-4" />
              Open v0.4 downloads
            </Link>
          </div>
        </section>

        <section className="pb-14 sm:pb-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black sm:text-4xl">Future Plans</h2>
            <p className="mt-4 leading-7 text-gray-400">
              Commercial subscriptions remain disabled until their real features
              and persistent entitlements are implemented.
            </p>
          </div>

          <div className="mx-auto mt-9 grid max-w-6xl gap-5 md:grid-cols-3">
            {plans.map((plan) => (
              <article
                key={plan}
                className="relative flex min-h-56 flex-col items-center justify-center overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/60 p-7 text-center backdrop-blur"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-400/60 to-transparent" />
                <span className="rounded-full border border-gray-700 bg-gray-950/70 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-gray-400">
                  Planned
                </span>
                <h3 className="mt-5 text-3xl font-black">{plan}</h3>
                <p className="mt-3 text-sm leading-6 text-gray-500">
                  Features, availability and pricing will be announced after
                  implementation and validation.
                </p>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-7 max-w-6xl rounded-2xl border border-amber-300/25 bg-amber-300/[0.07] p-6 sm:flex sm:items-center sm:gap-5 sm:p-7">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-300/10 text-amber-200">
              <Coins className="h-6 w-6" />
            </div>
            <div className="mt-4 sm:mt-0">
              <h3 className="text-xl font-black text-amber-100">
                Pi token payments are planned
              </h3>
              <p className="mt-2 leading-7 text-gray-400">
                When commercial plans become available, payment with Pi tokens
                is intended to be supported as part of the Director&apos;s Cut AI Pro ecosystem.
                Final payment terms will be published only after the integration is implemented and validated.
              </p>
            </div>
          </div>
        </section>

        <footer className="flex flex-col items-center justify-between gap-3 border-t border-gray-800 py-6 text-center text-sm text-gray-500 sm:flex-row sm:text-left">
          <span>Director&apos;s Cut AI Pro · Future plans presented without unimplemented feature promises</span>
          <Link href="/" className="font-semibold text-purple-300 transition hover:text-purple-200">
            Return to home
          </Link>
        </footer>
      </div>
    </main>
  );
}
