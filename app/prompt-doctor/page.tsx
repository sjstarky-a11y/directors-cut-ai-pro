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

const RELEASE_URL =
  "https://github.com/sjstarky-a11y/mediaforge-prompt-studio/releases/tag/v0.2";
const WINDOWS_URL =
  "https://github.com/sjstarky-a11y/mediaforge-prompt-studio/releases/download/v0.2/MediaForge-Prompt-Studio-v0.2-Windows-x64.zip";
const LINUX_URL =
  "https://github.com/sjstarky-a11y/mediaforge-prompt-studio/releases/download/v0.2/MediaForge-Prompt-Studio-v0.2-Linux-x86_64.tar.gz";
const CHECKSUM_URL =
  "https://github.com/sjstarky-a11y/mediaforge-prompt-studio/releases/download/v0.2/SHA256SUMS-v0.2.txt";
const GITHUB_URL = "https://github.com/sjstarky-a11y/mediaforge-prompt-studio";
const ISSUES_URL = `${GITHUB_URL}/issues`;

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
                <CheckCircle2 className="h-3.5 w-3.5" />v0.2 Public Preview
              </Link>
              <h1 className="mt-5 text-4xl font-black leading-[0.98] tracking-tight sm:text-5xl lg:text-6xl">
                Better AI video starts before generation.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-gray-300 sm:text-lg">
                MediaForge turns rough ideas into stronger prompts, protects the creative intent, confirms the scene with a local proof frame, and prepares the approved prompt for your AI video service.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <DownloadButton href={WINDOWS_URL} label="Download for Windows" />
                <DownloadButton href={LINUX_URL} label="Download for Linux" secondary />
              </div>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-gray-400 sm:text-sm">
                <TrustItem text="Runs on your computer" />
                <TrustItem text="CPU or NVIDIA" />
                <TrustItem text="No cloud AI required" />
              </div>
            </div>

            <div className="overflow-hidden rounded-[24px] border border-[#3a3e49] bg-[#0d0f15] p-2 shadow-2xl">
              <img src="/mediaforge-v02-workspace.webp" alt="MediaForge Prompt Studio v0.2 local workspace" className="w-full rounded-[18px]" />
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-[0.88fr_1.12fr]">
          <article className="rounded-[24px] border border-[#2b2f39] bg-[#12141b] p-6 sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-purple-300">Why Prompt Doctor matters</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">A powerful video model cannot rescue unclear direction.</h2>
            <p className="mt-4 text-sm leading-7 text-gray-400 sm:text-base">
              AI video tools can be impressive, but vague prompts often change the subject, location, action or visual intention. Prompt Doctor strengthens the instruction before expensive generation begins — without silently replacing the creator&apos;s idea with its own.
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
          <SectionHeading eyebrow="One coherent workflow" title="Improve. Protect. Prove. Adapt." description="Four connected steps help creators move from a rough idea to a prompt they can use with confidence." />
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <InfoCard number="01" icon={<ScanSearch className="h-5 w-5" />} title="Improve" description="Prompt Doctor identifies ambiguity, missing direction and contradictions, then strengthens the wording." />
            <InfoCard number="02" icon={<ShieldCheck className="h-5 w-5" />} title="Protect" description="Fidelity Guard checks whether the subject, action, setting and explicit constraints remain intact." />
            <InfoCard number="03" icon={<Film className="h-5 w-5" />} title="Prove" description="Visual Proof Frame creates a fast local SDXL still so the scene can be approved or regenerated." />
            <InfoCard number="04" icon={<WandSparkles className="h-5 w-5" />} title="Adapt" description="Model Adapter prepares approved wording for Generic Video, Runway, Veo or Kling and explains any change." />
          </div>
        </section>

        <section className="mt-20 grid gap-6 md:grid-cols-2">
          <ShowcaseCard image="/mediaforge-v02-proof-frame.webp" alt="A Visual Proof Frame generated locally in MediaForge" eyebrow="See the idea before video generation" title="Visual Proof Frame" description="Confirm the subject, location and visual direction before spending credits or time in an external video generator. It is a scene-confirmation tool, not a perfect computer-vision verifier." />
          <ShowcaseCard image="/mediaforge-v02-model-adapter.webp" alt="MediaForge Model Adapter with a Generic Video target" eyebrow="No hidden rewrite" title="Transparent Model Adapter" description="If no model-specific change is needed, MediaForge says Compatible as-is. When wording changes, the reason is shown instead of hidden." />
        </section>

        <section className="mt-20 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <SectionHeading eyebrow="Simple by default" title="The user chooses the task. MediaForge handles the runtime." description="Hardware detection selects a compatible CPU or NVIDIA path automatically. Backend and model details remain available in Developer settings without crowding the normal workflow." compact />
            <div className="mt-6 space-y-3">
              <FeatureLine icon={<Cpu className="h-5 w-5" />} title="CPU compatible" text="OpenVINO image generation and llama.cpp Prompt Doctor provide a broad fallback path." />
              <FeatureLine icon={<MonitorCog className="h-5 w-5" />} title="NVIDIA accelerated" text="CUDA acceleration includes a tested low-memory mode for older 4 GB cards." />
              <FeatureLine icon={<ShieldCheck className="h-5 w-5" />} title="Local-first privacy" text="Prompts and proof frames are processed by services running on the user&apos;s computer." />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <MetricCard value="51" label="automated checks in the v0.2 release gate" />
            <MetricCard value="4 GB" label="GTX 1050 low-memory path validated end to end" />
            <MetricCard value="3" label="real tested paths: Windows CPU, Windows NVIDIA and Ubuntu WSL2 CPU" />
          </div>
        </section>

        <section className="mt-20 scroll-mt-6" id="download">
          <SectionHeading eyebrow="Download & install" title="Choose your operating system. Keep the setup simple." description="Docker is the main prerequisite. MediaForge then detects compatible hardware and downloads the required local models." />
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <InstallCard title="Windows 10/11" badge="CPU + NVIDIA" href={WINDOWS_URL} downloadLabel="Download Windows ZIP" steps={[
              "Install and start Docker Desktop using Linux containers.",
              "Extract the complete ZIP into a new folder.",
              "Read START-HERE-WINDOWS.txt and double-click MediaForge-Windows.cmd.",
              "MediaForge detects CPU or NVIDIA support, installs the local runtime and opens the app.",
            ]} />
            <InstallCard title="Linux x86_64" badge="CPU + NVIDIA path" href={LINUX_URL} downloadLabel="Download Linux archive" steps={[
              "Install Docker Engine with the Compose plugin.",
              "Extract the .tar.gz archive into a new folder.",
              "Read START-HERE-LINUX.txt and run ./MediaForge-Linux.sh.",
              "MediaForge detects available hardware and starts the compatible local runtime.",
            ]} />
          </div>
          <div className="mt-5 rounded-2xl border border-amber-400/25 bg-amber-400/10 p-5">
            <div className="flex gap-3">
              <HardDriveDownload className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
              <div>
                <h3 className="font-bold text-amber-100">The first Visual Proof model download is several gigabytes</h3>
                <p className="mt-1 text-sm leading-6 text-amber-100/70">MediaForge shows preparation status and keeps proof generation disabled until the image model is ready. Prompt Doctor remains usable during the download, and future starts reuse the local cache.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-20 grid gap-5 lg:grid-cols-3">
          <DetailCard icon={<ShieldCheck className="h-6 w-6" />} title="Private by design" text="The full AI workflow runs through local services. Models are downloaded to the computer and are not bundled in the small release archive." />
          <DetailCard icon={<Terminal className="h-6 w-6" />} title="Public preview" text="Windows CPU/OpenVINO, Windows NVIDIA CUDA low-memory, and Ubuntu 24.04 WSL2 CPU/OpenVINO have completed real tests." />
          <DetailCard icon={<MonitorCog className="h-6 w-6" />} title="Current scope" text="Native Linux NVIDIA support is included but still needs broader hardware validation. macOS support is planned for a later milestone." />
        </section>

        <section className="mt-20 scroll-mt-6" id="faq">
          <SectionHeading eyebrow="Questions before downloading" title="What users should know" description="Clear expectations are part of a trustworthy local AI product." />
          <div className="mx-auto mt-8 max-w-4xl space-y-3">
            <FaqItem question="Is the website the same as the MediaForge application?" answer="No. This website explains the product and provides verified downloads. The full Prompt Doctor, Fidelity Guard, Visual Proof Frame and Model Adapter run in the downloaded local workspace." />
            <FaqItem question="Does MediaForge send my prompts to a cloud AI provider?" answer="The MediaForge v0.2 workflow uses local model services on your computer. Internet access is needed for the initial software and model downloads, but the core inference workflow is local." />
            <FaqItem question="Do I need to choose AI models or CUDA settings?" answer="Normally, no. MediaForge automatically selects a compatible CPU or NVIDIA path. Technical model and runtime controls are available only when Developer settings are opened." />
            <FaqItem question="Why is the release archive small if the application uses large AI models?" answer="The models are not bundled. They are downloaded locally during setup, which keeps the release archive small and lets future versions manage compatible runtimes independently." />
            <FaqItem question="Is v0.2 production-ready?" answer="It is a public pre-release intended for testing and feedback. Windows and WSL2 paths have completed real validation; broader native Linux hardware coverage is still growing." />
          </div>
        </section>

        <section className="mt-20 rounded-[24px] border border-[#2b2f39] bg-[#12141b] p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <SectionHeading eyebrow="Open development" title="Verify the release. Follow progress. Share feedback." description="Use the checksum before installation, review the current release notes, or report a reproducible issue through GitHub." compact />
            <div className="grid min-w-[280px] gap-3 sm:grid-cols-2 lg:min-w-[520px]">
              <ResourceLink href={RELEASE_URL} label="v0.2 release" />
              <ResourceLink href={CHECKSUM_URL} label="SHA-256 checksums" />
              <ResourceLink href={GITHUB_URL} label="GitHub repository" />
              <ResourceLink href={ISSUES_URL} label="Report an issue" />
            </div>
          </div>
        </section>

        <section className="my-20 overflow-hidden rounded-[28px] border border-purple-400/25 bg-gradient-to-r from-purple-500/15 to-cyan-400/10 p-7 text-center sm:p-10">
          <Sparkles className="mx-auto h-8 w-8 text-purple-300" />
          <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">Your idea deserves better than a guess.</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-gray-300 sm:text-base">Improve the prompt, protect the intention, confirm the scene and then move to video generation.</p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <DownloadButton href={WINDOWS_URL} label="Download for Windows" />
            <Link href={RELEASE_URL} target="_blank" rel="noreferrer" className="inline-flex h-11 items-center justify-center rounded-xl border border-[#3a3e49] bg-[#15171e] px-5 text-sm font-bold text-gray-100 transition hover:bg-[#1d2028]">
              Read release notes <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </section>

        <footer className="border-t border-[#252933] py-7 text-center text-xs leading-5 text-gray-500">
          Director&apos;s Cut AI Pro · MediaForge Prompt Studio v0.2 Public Preview<br />Local-first tools for cinematic AI video creation
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
