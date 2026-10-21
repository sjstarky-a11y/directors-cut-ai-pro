import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  Download,
  ExternalLink,
  Film,
  HardDriveDownload,
  Home,
  MonitorCog,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Terminal,
  WandSparkles,
} from "lucide-react";

import {
  RELEASE_URL, WINDOWS_URL, LINUX_URL, CHECKSUM_URL,
  ISSUES_URL, FEEDBACK_URL, QUICKSTART_URL, USER_GUIDE_URL, HELP_URL,
  SUPPORT_URL, VALIDATION_URL, LICENSE_URL,
} from "@/lib/mediaforge-release";

export default function PromptDoctorPage() {
  return (
    <main className="min-h-screen bg-[#08090f] text-white">
      <div className="mx-auto max-w-[1380px] px-4 py-4 sm:px-6 lg:px-8">
        <header className="flex flex-wrap items-center justify-between gap-4 py-2">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-11 w-11 overflow-hidden rounded-xl border border-amber-300/25 bg-[#11131a] shadow-lg">
              <img src="/mediaforge-logo.png" alt="MediaForge logo" className="h-full w-full object-cover" />
            </div>
            <div>
              <p className="text-lg font-bold sm:text-xl">MediaForge Prompt Studio</p>
              <p className="text-xs text-gray-400 sm:text-sm">A Director&apos;s Cut AI Pro product</p>
            </div>
          </Link>

          <nav className="flex flex-wrap items-center justify-end gap-2 text-sm">
            <Link href="#workflow" className="hidden px-3 py-2 text-gray-400 transition hover:text-white md:inline-flex">How it works</Link>
            <Link href="#download" className="hidden px-3 py-2 text-gray-400 transition hover:text-white md:inline-flex">Download</Link>
            <Link href="#faq" className="hidden px-3 py-2 text-gray-400 transition hover:text-white md:inline-flex">FAQ</Link>
            <Link href="/" className="inline-flex h-10 items-center justify-center rounded-xl border border-gray-700 bg-[#13151c] px-4 font-medium text-gray-200 transition hover:border-gray-600 hover:bg-[#191c24]">
              <Home className="mr-2 h-4 w-4" />Platform
            </Link>
          </nav>
        </header>

        <section className="relative mt-5 overflow-hidden rounded-[28px] border border-purple-400/30 bg-gradient-to-br from-purple-500/20 via-[#12141b] to-cyan-400/10 p-5 shadow-2xl sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[0.87fr_1.13fr] lg:items-center">
            <div>
              <Link href={RELEASE_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-emerald-300 transition hover:bg-emerald-400/15">
                <CheckCircle2 className="h-3.5 w-3.5" />v0.4 Preview
              </Link>
              <h1 className="mt-5 text-4xl font-black leading-[0.98] tracking-tight sm:text-5xl lg:text-6xl">
                Better AI video starts before generation.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-gray-300 sm:text-lg">
                Prepare a prompt, review its meaning and preview the scene locally. v0.4 adds Intel GPU text and images alongside CPU and NVIDIA support.
              </p>
              <div className="mt-7 flex flex-col flex-wrap gap-3 sm:flex-row">
                <DownloadButton href={WINDOWS_URL} label="Download for Windows" />
                <DownloadButton href={LINUX_URL} label="Download for Linux" secondary />
              </div>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-gray-400 sm:text-sm">
                <TrustItem text="Runs on your computer" />
                <TrustItem text="CPU · NVIDIA · Intel" />
                <TrustItem text="No cloud AI required" />
              </div>
            </div>

            <div className="overflow-hidden rounded-[24px] border border-[#3a3e49] bg-[#0d0f15] p-2 shadow-2xl">
              <div className="aspect-[1743/844] overflow-hidden rounded-[18px]">
                <img src="/mediaforge-v02-workspace.webp" alt="MediaForge local workspace interface example" className="h-full w-full object-cover object-bottom" />
              </div>
              <p className="px-3 py-2 text-xs leading-5 text-gray-500">Earlier interface example; current hardware support is listed below.</p>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-[0.88fr_1.12fr]">
          <article className="rounded-[24px] border border-[#2b2f39] bg-[#12141b] p-6 sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-purple-300">Why Prompt Doctor matters</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">A powerful video model cannot rescue unclear direction.</h2>
            <p className="mt-4 text-sm leading-7 text-gray-400 sm:text-base">
              Specify the subject, action, setting and camera direction. Prompt Doctor helps refine the wording; you review the result before generation. Fidelity Guard flags selected changes but cannot detect every error.
            </p>
          </article>

          <article className="rounded-[24px] border border-emerald-400/20 bg-emerald-400/[0.06] p-6 sm:p-8">
            <div className="flex gap-4">
              <ShieldCheck className="mt-1 h-7 w-7 shrink-0 text-emerald-300" />
              <div>
                <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-300">Website and product have different jobs</p>
                <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">Learn and download here. Create privately in MediaForge.</h2>
                <p className="mt-4 text-sm leading-7 text-gray-300 sm:text-base">
                  This website presents the workflow, instructions and verified downloads. The actual Prompt Doctor, Fidelity Guard, Visual Proof Frame and Model Adapter run through local services on your computer.
                </p>
              </div>
            </div>
          </article>
        </section>

        <section className="mt-20 scroll-mt-6" id="workflow">
          <SectionHeading eyebrow="One coherent workflow" title="Improve. Protect. Prove. Adapt." description="Refine the idea, review the result, choose a frame and copy the approved prompt." />
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <InfoCard number="01" icon={<ScanSearch className="h-5 w-5" />} title="Improve" description="Prompt Doctor identifies ambiguity, missing direction and contradictions, then strengthens the wording." />
            <InfoCard number="02" icon={<ShieldCheck className="h-5 w-5" />} title="Protect" description="Fidelity Guard flags selected changes to subjects, actions and constraints for your review." />
            <InfoCard number="03" icon={<Film className="h-5 w-5" />} title="Prove" description="Fast/Quality Proof creates a still preview; optional Hero compares three candidates." />
            <InfoCard number="04" icon={<WandSparkles className="h-5 w-5" />} title="Adapt" description="Model Adapter prepares approved wording for Generic Video, Runway, Veo or Kling and explains any change." />
          </div>
        </section>

        <section className="mt-20 grid gap-6 md:grid-cols-2">
          <ShowcaseCard image="/mediaforge-v02-proof-frame.webp" alt="A Visual Proof Frame generated locally in MediaForge" eyebrow="See the idea before video generation" title="Visual Proof & Hero Frame Set" description="Review a still preview or compare three Hero candidates. Select the frame that best fits your scene before continuing to video generation." />
          <ShowcaseCard image="/mediaforge-v02-model-adapter.webp" alt="MediaForge Model Adapter with a Generic Video target" eyebrow="No hidden rewrite" title="Transparent Model Adapter" description="If no model-specific change is needed, MediaForge says Compatible as-is. When wording changes, the reason is shown instead of hidden." />
        </section>

        <section className="mt-20 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <SectionHeading eyebrow="Simple by default" title="The user chooses the task. MediaForge handles the runtime." description="Auto checks the available CPU, NVIDIA and Intel runtimes. Text and image services report their own device; CPU compatibility remains available." compact />
            <div className="mt-6 space-y-3">
              <FeatureLine icon={<Cpu className="h-5 w-5" />} title="CPU compatible" text="A local fallback when no eligible GPU runtime is selected." />
              <FeatureLine icon={<MonitorCog className="h-5 w-5" />} title="Optional NVIDIA acceleration" text="CUDA profiles adapt to available memory. Additional hardware validation remains open." />
              <FeatureLine icon={<MonitorCog className="h-5 w-5" />} title="Intel text and images" text="Intel Arc Pro B60 verified on Windows/WSL2. Hero uses its separate CPU/NVIDIA service." />
              <FeatureLine icon={<ShieldCheck className="h-5 w-5" />} title="Local-first privacy" text="Prompts and proof frames are processed by services running on the user&apos;s computer." />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <MetricCard value="93" label="application checks passed on Windows and Ubuntu" />
            <MetricCard value="B60" label="Intel GPU text and Fast/Quality Proof verified on Windows/WSL2" />
            <MetricCard value="Auto" label="runtime checks before selecting NVIDIA, Intel or CPU" />
          </div>
        </section>

        <section className="mt-20 scroll-mt-6" id="download">
          <SectionHeading eyebrow="Download & install" title="Choose your operating system. Keep the setup simple." description="Docker is the main prerequisite. MediaForge then detects compatible hardware and downloads the required local models." />
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <InstallCard title="Windows 11 x64" badge="CPU · NVIDIA · Intel" href={WINDOWS_URL} downloadLabel="Download Windows ZIP" steps={[
              "Start Docker Desktop with WSL2; enable Model Runner and local TCP access.",
              "Extract the complete ZIP into a new folder.",
              "Read START-HERE-WINDOWS.txt and double-click MediaForge-Windows.cmd.",
              "Allow first downloads to finish, then open http://127.0.0.1:18888.",
            ]} />
            <InstallCard title="Ubuntu 24.04 x86_64" badge="Hardware validation pending" href={LINUX_URL} downloadLabel="Download Linux archive" steps={[
              "Install Docker Engine, Compose and Model Runner; add GPU drivers if needed.",
              "Extract the .tar.gz archive into a new folder.",
              "Read START-HERE-LINUX.txt and run ./MediaForge-Linux.sh.",
              "Allow first downloads to finish, then open http://127.0.0.1:18888.",
            ]} />
          </div>
          <div className="mt-5 rounded-2xl border border-amber-400/25 bg-amber-400/10 p-5">
            <div className="flex gap-3">
              <HardDriveDownload className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
              <div>
                <h3 className="font-bold text-amber-100">Models download separately</h3>
                <p className="mt-1 text-sm leading-6 text-amber-100/70">Setup downloads several gigabytes; Intel text adds about 4.5 GB. Optional Hero asks before its separate ~12 GB download. Downloads are cached locally. Use the launcher Stop action when finished; closing the browser leaves services running.</p>
              </div>
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <ResourceLink href={QUICKSTART_URL} label="Installation guide" />
            <ResourceLink href={USER_GUIDE_URL} label="Using the app" />
            <ResourceLink href={HELP_URL} label="Help, stop & memory" />
          </div>
        </section>

        <section className="mt-20 grid gap-5 lg:grid-cols-3">
          <DetailCard icon={<ShieldCheck className="h-6 w-6" />} title="Private by design" text="The full AI workflow runs through local services. Models are downloaded to the computer and are not bundled in the small release archive." />
          <DetailCard icon={<Terminal className="h-6 w-6" />} title="Public preview" text="Intel B60 text and image execution passed Windows/WSL2 tests. Native Linux GPU installation still needs hardware validation." />
          <DetailCard icon={<MonitorCog className="h-6 w-6" />} title="Current scope" text="Croatian text can contain grammar and meaning errors. Review text and images manually. No macOS package is included." />
        </section>

        <section className="mt-20 scroll-mt-6" id="faq">
          <SectionHeading eyebrow="Questions before downloading" title="What users should know" description="Clear expectations are part of a trustworthy local AI product." />
          <div className="mx-auto mt-8 max-w-4xl space-y-3">
            <FaqItem question="Is the website the same as the MediaForge application?" answer="No. This website explains the product and provides verified downloads. The full Prompt Doctor, Fidelity Guard, Visual Proof Frame and Model Adapter run in the downloaded local workspace." />
            <FaqItem question="Does MediaForge send my prompts to a cloud AI provider?" answer="Core text and image inference runs on your computer. Internet is needed for software and model downloads; external video services have their own policies." />
            <FaqItem question="Do I need to choose AI models or CUDA settings?" answer="Auto selects an eligible NVIDIA or Intel runtime, with CPU fallback. Intel text needs an eligible Intel profile with at least 16 GiB of reported GPU memory. While it prepares, the result reports the local Model Runner fallback." />
            <FaqItem question="Why is the release archive small if the application uses large AI models?" answer="The models are not bundled. They are downloaded locally during setup, which keeps the release archive small and lets future versions manage compatible runtimes independently." />
            <FaqItem question="What is Hero Frame Set?" answer="Three local image candidates for creator selection, with progress and a stop-after-current-frame control. Hero uses its separate CPU/NVIDIA service." />
            <FaqItem question="Is v0.4 production-ready?" answer="This is a preview for evaluation and feedback. GPU execution and content quality are separate: the model can run correctly and still produce an inaccurate answer or image." />
            <FaqItem question="Does the app generate video?" answer="It prepares prompts and still-image previews. Use your approved prompt and frame in a separate video generator." />
            <FaqItem question="Why can RAM stay high after stopping?" answer="Docker/WSL can retain memory and file cache. Stored Docker images use disk space; they do not prove a model is still loaded. See the memory help guide before stopping shared services." />
          </div>
        </section>

        <section className="mt-20 rounded-[24px] border border-[#2b2f39] bg-[#12141b] p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <SectionHeading eyebrow="Release & support" title="Verify the release. Follow progress. Share feedback." description="Use the checksum before installation, review the current release notes, or report a reproducible issue through GitHub." compact />
            <div className="grid min-w-0 gap-3 sm:grid-cols-2 lg:min-w-[520px]">
              <ResourceLink href={RELEASE_URL} label="v0.4 preview release" />
              <ResourceLink href={CHECKSUM_URL} label="SHA-256 checksums" />
              <ResourceLink href={FEEDBACK_URL} label="Known limits & feedback" />
              <ResourceLink href={SUPPORT_URL} label="Supported platforms" />
              <ResourceLink href={VALIDATION_URL} label="Intel test results" />
              <ResourceLink href={ISSUES_URL} label="Report an issue" />
            </div>
          </div>
        </section>

        <section className="my-20 overflow-hidden rounded-[28px] border border-purple-400/25 bg-gradient-to-r from-purple-500/15 to-cyan-400/10 p-7 text-center sm:p-10">
          <Sparkles className="mx-auto h-8 w-8 text-purple-300" />
          <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">Your idea deserves better than a guess.</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-gray-300 sm:text-base">Improve the prompt, protect the intention, confirm the scene and then move to video generation.</p>
          <div className="mt-7 flex flex-col flex-wrap justify-center gap-3 sm:flex-row">
            <DownloadButton href={WINDOWS_URL} label="Download for Windows" />
            <DownloadButton href={LINUX_URL} label="Download for Linux" secondary />
            <Link href={RELEASE_URL} target="_blank" rel="noreferrer" className="inline-flex h-11 items-center justify-center rounded-xl border border-[#3a3e49] bg-[#15171e] px-5 text-sm font-bold text-gray-100 transition hover:bg-[#1d2028]">
              Read release notes <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </section>

        <footer className="border-t border-[#252933] py-7 text-center text-xs leading-5 text-gray-500">
          Director&apos;s Cut AI Pro · MediaForge Prompt Studio v0.4 Preview<br />
          Personal, non-commercial evaluation · <Link href={LICENSE_URL} target="_blank" rel="noreferrer" className="text-gray-400 underline hover:text-white">License</Link>
        </footer>
      </div>
    </main>
  );
}

function TrustItem({ text }: { text: string }) {
  return <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-300" />{text}</span>;
}

function DownloadButton({ href, label, secondary = false }: { href: string; label: string; secondary?: boolean }) {
  return (
    <Link href={href} target="_blank" rel="noreferrer" className={`inline-flex h-11 min-w-[220px] items-center justify-center rounded-xl px-5 text-sm font-bold transition ${secondary ? "border border-[#3a3e49] bg-[#15171e] text-gray-100 hover:bg-[#1d2028]" : "bg-gradient-to-r from-purple-500 to-cyan-400 text-[#08090f] hover:brightness-110"}`}>
      <Download className="mr-2 h-4 w-4" />{label}
    </Link>
  );
}

function SectionHeading({ eyebrow, title, description, compact = false }: { eyebrow: string; title: string; description: string; compact?: boolean }) {
  return (
    <div className={compact ? "max-w-2xl" : "mx-auto max-w-4xl text-center"}>
      <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-300">{eyebrow}</p>
      <h2 className={`mt-3 font-black tracking-tight ${compact ? "text-3xl sm:text-4xl" : "text-3xl sm:text-5xl"}`}>{title}</h2>
      <p className="mt-4 text-sm leading-7 text-gray-400 sm:text-base">{description}</p>
    </div>
  );
}

function InfoCard({ number, icon, title, description }: { number: string; icon: ReactNode; title: string; description: string }) {
  return (
    <article className="rounded-2xl border border-[#2b2f39] bg-[#12141b] p-5">
      <div className="flex items-center justify-between"><span className="text-sm font-black text-purple-300">{number}</span><span className="text-emerald-300">{icon}</span></div>
      <h3 className="mt-4 text-xl font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-gray-400">{description}</p>
    </article>
  );
}

function FeatureLine({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <div className="flex gap-3 rounded-2xl border border-[#2b2f39] bg-[#12141b] p-4">
      <span className="mt-0.5 text-emerald-300">{icon}</span><div><h3 className="font-bold">{title}</h3><p className="mt-1 text-sm leading-6 text-gray-400">{text}</p></div>
    </div>
  );
}

function ShowcaseCard({ image, alt, eyebrow, title, description }: { image: string; alt: string; eyebrow: string; title: string; description: string }) {
  return (
    <article className="overflow-hidden rounded-[24px] border border-[#2b2f39] bg-[#12141b] p-3">
      <div className="overflow-hidden rounded-[18px] border border-[#30343e] bg-[#0d0f15]"><img src={image} alt={alt} className="aspect-[16/10] w-full object-cover object-top" /></div>
      <div className="p-4 sm:p-5"><p className="text-xs font-black uppercase tracking-[0.12em] text-purple-300">{eyebrow}</p><h3 className="mt-2 text-2xl font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-gray-400">{description}</p></div>
    </article>
  );
}

function MetricCard({ value, label }: { value: string; label: string }) {
  return <article className="rounded-2xl border border-purple-400/20 bg-purple-500/[0.07] p-5"><p className="text-3xl font-black text-purple-200">{value}</p><p className="mt-1 text-sm leading-6 text-gray-400">{label}</p></article>;
}

function InstallCard({ title, badge, href, downloadLabel, steps }: { title: string; badge: string; href: string; downloadLabel: string; steps: string[] }) {
  return (
    <article className="rounded-[24px] border border-[#2b2f39] bg-[#12141b] p-6">
      <div className="flex flex-wrap items-center justify-between gap-3"><h3 className="text-2xl font-black">{title}</h3><span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">{badge}</span></div>
      <ol className="mt-5 space-y-4">{steps.map((step, index) => <li key={step} className="flex gap-3 text-sm leading-6 text-gray-300"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-500/15 text-xs font-bold text-purple-300">{index + 1}</span>{step}</li>)}</ol>
      <Link href={href} target="_blank" rel="noreferrer" className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-cyan-400 px-5 text-sm font-black text-[#08090f] transition hover:brightness-110"><Download className="mr-2 h-4 w-4" />{downloadLabel}</Link>
    </article>
  );
}

function DetailCard({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return <article className="rounded-2xl border border-[#2b2f39] bg-[#12141b] p-5"><div className="text-emerald-300">{icon}</div><h3 className="mt-4 text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-gray-400">{text}</p></article>;
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group rounded-2xl border border-[#2b2f39] bg-[#12141b] p-5 open:border-purple-400/30">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-gray-100">{question}<span className="text-xl font-light text-purple-300 transition group-open:rotate-45">+</span></summary>
      <p className="mt-4 border-t border-[#2b2f39] pt-4 text-sm leading-7 text-gray-400">{answer}</p>
    </details>
  );
}

function ResourceLink({ href, label }: { href: string; label: string }) {
  return <Link href={href} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-xl border border-[#30343e] bg-[#0d0f15] px-4 py-3 text-sm font-semibold text-gray-200 transition hover:border-purple-400/50 hover:bg-[#15171e]">{label}<ExternalLink className="h-4 w-4 text-gray-500" /></Link>;
}
