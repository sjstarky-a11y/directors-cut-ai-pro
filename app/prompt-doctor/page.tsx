"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Clipboard,
  Cpu,
  Download,
  ExternalLink,
  HardDriveDownload,
  Home,
  MonitorCog,
  RotateCcw,
  Save,
  ShieldCheck,
  Sparkles,
  Terminal,
} from "lucide-react";
import {
  formatPromptDoctorResult,
  generatePromptDoctorResult,
  type OutputLanguage,
  type PromptDoctorOptions,
  type PromptDoctorResult,
  type PromptMode,
  type VideoFormat,
} from "@/lib/prompt-doctor-engine";

const STORAGE_KEY = "directors-cut-prompt-doctor-projects";

const RELEASE_URL =
  "https://github.com/sjstarky-a11y/mediaforge-prompt-studio/releases/tag/v0.2";
const WINDOWS_URL =
  "https://github.com/sjstarky-a11y/mediaforge-prompt-studio/releases/download/v0.2/MediaForge-Prompt-Studio-v0.2-Windows-x64.zip";
const LINUX_URL =
  "https://github.com/sjstarky-a11y/mediaforge-prompt-studio/releases/download/v0.2/MediaForge-Prompt-Studio-v0.2-Linux-x86_64.tar.gz";
const CHECKSUM_URL =
  "https://github.com/sjstarky-a11y/mediaforge-prompt-studio/releases/download/v0.2/SHA256SUMS-v0.2.txt";
const GITHUB_URL =
  "https://github.com/sjstarky-a11y/mediaforge-prompt-studio";
const ISSUES_URL = `${GITHUB_URL}/issues`;

type SavedProject = {
  id: string;
  createdAt: string;
  options: PromptDoctorOptions;
  result: PromptDoctorResult;
};

const MODE_LABELS: Record<PromptMode, string> = {
  improve: "Improve",
  cinematic: "Cinematic",
  commercial: "Commercial",
  shots: "Shot List",
};

const MODE_HELP: Record<PromptMode, string> = {
  improve:
    "Strengthen a weak or rough prompt while preserving the original subject, action, setting and explicit constraints.",
  cinematic:
    "Add controlled cinematic direction for composition, camera, atmosphere and visual storytelling.",
  commercial:
    "Shape the idea for product-focused presentation while keeping explicit product details intact.",
  shots:
    "Turn the idea into a practical shot-by-shot plan for production.",
};

export default function PromptDoctorPage() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<PromptMode>("improve");
  const [format, setFormat] = useState<VideoFormat>("16:9");
  const [result, setResult] = useState<PromptDoctorResult | null>(null);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  // The existing browser engine expects these fields.
  // V2 keeps them fixed so the UI matches the stable SoloHost workspace.
  const duration = 30;
  const language: OutputLanguage = "English";

  const options: PromptDoctorOptions = {
    input,
    mode,
    format,
    duration,
    language,
  };

  const showStatus = (message: string) => {
    setStatus(message);

    window.setTimeout(() => {
      setStatus("");
    }, 2500);
  };

  const handleGenerate = () => {
    try {
      setError("");

      const generated = generatePromptDoctorResult(options);

      setResult(generated);
      showStatus("Prompt Doctor complete.");
    } catch (generationError) {
      setResult(null);

      setError(
        generationError instanceof Error
          ? generationError.message
          : "Unable to process the prompt."
      );
    }
  };

  const handleReset = () => {
    setInput("");
    setMode("improve");
    setFormat("16:9");
    setResult(null);
    setError("");
    setStatus("");
  };

  const handleClearResult = () => {
    setResult(null);
    setError("");
    setStatus("");
  };

  const handleCopy = async () => {
    if (!result) {
      return;
    }

    const text = formatPromptDoctorResult(options, result);

    await navigator.clipboard.writeText(text);
    showStatus("Copied all.");
  };

  const handleCopyFinalPrompt = async () => {
    if (!result) {
      return;
    }

    await navigator.clipboard.writeText(result.improvedPrompt);
    showStatus("Final prompt copied.");
  };

  const handleSave = () => {
    if (!result) {
      return;
    }

    const current = localStorage.getItem(STORAGE_KEY);

    let projects: SavedProject[] = [];

    if (current) {
      try {
        projects = JSON.parse(current) as SavedProject[];
      } catch {
        projects = [];
      }
    }

    const project: SavedProject = {
      id: `${Date.now()}`,
      createdAt: new Date().toISOString(),
      options,
      result,
    };

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([project, ...projects].slice(0, 25))
    );

    showStatus("Project saved locally.");
  };

  const downloadFile = (
    filename: string,
    content: string,
    type: string
  ) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = filename;
    anchor.click();

    URL.revokeObjectURL(url);
  };

  const handleExportText = () => {
    if (!result) {
      return;
    }

    downloadFile(
      `directors-cut-prompt-${Date.now()}.txt`,
      formatPromptDoctorResult(options, result),
      "text/plain;charset=utf-8"
    );

    showStatus("TXT exported.");
  };

  const handleExportJson = () => {
    if (!result) {
      return;
    }

    downloadFile(
      `directors-cut-project-${Date.now()}.json`,
      JSON.stringify(
        {
          app: "Director's Cut AI Pro",
          workspace: "MediaForge Prompt Studio",
          tool: "Prompt Doctor",
          createdAt: new Date().toISOString(),
          options,
          result,
        },
        null,
        2
      ),
      "application/json;charset=utf-8"
    );

    showStatus("JSON exported.");
  };

  return (
    <main className="min-h-screen bg-[#08090f] text-white">
      <div className="mx-auto max-w-[1480px] px-4 py-4 sm:px-6 lg:px-8">
        <header className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 overflow-hidden rounded-xl border border-amber-300/25 bg-[#11131a] shadow-lg">
              <img
                src="/mediaforge-logo.png"
                alt="MediaForge logo"
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <h1 className="text-xl font-bold sm:text-2xl">
                MediaForge Prompt Doctor
              </h1>

              <p className="text-xs text-gray-400 sm:text-sm">
                Part of MediaForge Prompt Studio
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden rounded-full border border-emerald-400/20 bg-emerald-400/5 px-4 py-2 text-xs font-semibold text-emerald-300 sm:block">
              BROWSER LOCAL · PRIVATE · READY
            </div>

            <Link
              href="/"
              className="inline-flex h-10 items-center justify-center rounded-xl border border-gray-700 bg-[#13151c] px-4 text-sm font-medium text-gray-200 transition hover:border-gray-600 hover:bg-[#191c24]"
            >
              <Home className="mr-2 h-4 w-4" />
              Home
            </Link>
          </div>
        </header>

        <section className="mb-4 overflow-hidden rounded-[22px] border border-purple-400/30 bg-gradient-to-br from-purple-500/15 via-[#12141b] to-cyan-400/10 p-5 shadow-2xl sm:p-7">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-emerald-300">
                <CheckCircle2 className="h-3.5 w-3.5" />
                v0.2 Public Preview is available
              </div>
              <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
                Try the browser demo — or download the full local workspace.
              </h2>
              <p className="mt-3 max-w-4xl text-sm leading-6 text-gray-300">
                The demo below runs immediately in your browser. The downloadable
                application adds local AI generation, Fidelity Guard, Visual Proof
                Frame, Model Adapter, and automatic CPU or NVIDIA runtime selection.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
              <DownloadButton href={WINDOWS_URL} label="Download for Windows" />
              <DownloadButton href={LINUX_URL} label="Download for Linux" secondary />
            </div>
          </div>
        </section>

        <div className="grid gap-4 lg:grid-cols-[0.93fr_1.07fr]">
          <section className="overflow-hidden rounded-[22px] border border-[#2b2f39] bg-[#12141b] shadow-2xl">
            <div className="p-5 sm:p-6">
              <div className="mb-5">
                <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.08em] text-emerald-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-300" />
                  Prompt Doctor
                </div>

                <h2 className="max-w-xl text-3xl font-black leading-[1.04] tracking-tight sm:text-4xl lg:text-[46px]">
                  Fix the prompt before you generate.
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-400">
                  Diagnose weak instructions, protect your original intent, and turn rough
                  ideas into clearer prompts for AI video workflows — without rewriting the
                  concept into something else.
                </p>
              </div>

              <div>
                <label
                  htmlFor="rough-prompt"
                  className="mb-2 block text-sm font-semibold"
                >
                  Your idea or prompt
                </label>

                <textarea
                  id="rough-prompt"
                  value={input}
                  maxLength={5000}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Example: A woman enters an empty kitchen, approaches the window, and looks outside."
                  className="min-h-[132px] w-full resize-y rounded-2xl border border-[#30343e] bg-[#0d0f15] p-4 text-[15px] leading-6 text-white outline-none transition placeholder:text-gray-600 focus:border-purple-500/70 focus:ring-2 focus:ring-purple-500/10"
                />

                <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">
                  <span>
                    Keep the important facts in your prompt. Prompt Doctor will work around them.
                  </span>
                  <span>{input.length} / 5000</span>
                </div>
              </div>

              <div className="mt-5">
                <div className="mb-2 text-sm font-semibold">
                  Mode
                </div>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {(Object.keys(MODE_LABELS) as PromptMode[]).map((item) => {
                    const active = mode === item;

                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setMode(item)}
                        className={`rounded-xl border px-3 py-2.5 text-sm font-semibold transition ${
                          active
                            ? "border-transparent text-[#090a0f] shadow-lg"
                            : "border-[#343843] bg-[#191b22] text-gray-300 hover:border-gray-600 hover:bg-[#1d2028]"
                        }`}
                        style={
                          active
                            ? {
                                background:
                                  "linear-gradient(100deg, #8b6cf4 0%, #66d7c9 100%)",
                                boxShadow:
                                  "0 10px 30px rgba(116, 99, 238, 0.18)",
                              }
                            : undefined
                        }
                      >
                        {MODE_LABELS[item]}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-2 rounded-xl border border-[#2c3038] bg-[#101218] px-3 py-3 text-xs leading-5 text-gray-400">
                  {MODE_HELP[mode]}
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_1fr_1.05fr]">
                <label className="space-y-2">
                  <span className="block text-xs font-semibold text-gray-300">
                    Format
                  </span>

                  <select
                    value={format}
                    onChange={(event) =>
                      setFormat(event.target.value as VideoFormat)
                    }
                    className="h-12 w-full rounded-xl border border-[#30343e] bg-[#0d0f15] px-3 text-sm text-white outline-none focus:border-purple-500/70"
                  >
                    <option value="16:9">
                      16:9 horizontal
                    </option>
                    <option value="9:16">
                      9:16 vertical
                    </option>
                    <option value="1:1">
                      1:1 square
                    </option>
                  </select>
                </label>

                <div className="space-y-2">
                  <span className="block text-xs font-semibold text-gray-300">
                    Output language
                  </span>

                  <div className="flex h-12 items-center justify-between rounded-xl border border-[#30343e] bg-[#0d0f15] px-3 text-sm text-white">
                    <span>English</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                      Browser
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleGenerate}
                  className="mt-auto inline-flex h-12 items-center justify-center rounded-xl px-4 text-sm font-black text-[#090a0f] transition hover:brightness-105"
                  style={{
                    background:
                      "linear-gradient(100deg, #8b6cf4 0%, #62d6ca 100%)",
                    boxShadow:
                      "0 14px 35px rgba(104, 95, 230, 0.18)",
                  }}
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Run Prompt Doctor
                </button>
              </div>

              {error && (
                <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
                  {error}
                </div>
              )}

              <div className="mt-3 flex items-center justify-between gap-3 text-xs">
                <span className="text-gray-500">
                  {status || "Ready."}
                </span>

                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center text-gray-500 transition hover:text-gray-300"
                >
                  <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
                  Reset workspace
                </button>
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-[22px] border border-[#2b2f39] bg-[#12141b] shadow-2xl">
            <div className="p-4 sm:p-5">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <h3 className="text-sm font-bold">
                    Prompt Doctor result
                  </h3>
                  <span className="text-xs text-gray-500">
                    {MODE_LABELS[mode]}
                  </span>
                </div>

                <div className="rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1.5 text-xs text-emerald-300">
                  <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-300" />
                  Local browser engine
                </div>
              </div>

              <div className="min-h-[420px] max-h-[650px] overflow-y-auto rounded-2xl border border-[#30343e] bg-[#0d0f15]">
                {!result ? (
                  <div className="flex min-h-[420px] items-center justify-center p-8 text-center">
                    <div>
                      <p className="font-semibold text-gray-200">
                        Your diagnosis and final prompt will appear here.
                      </p>

                      <p className="mt-2 text-sm text-gray-500">
                        Choose a mode, enter your idea, and run Prompt Doctor.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-5 p-5">
                    <ResultSection
                      title="Prompt diagnosis"
                      content={result.diagnosis}
                    />

                    <ResultSection
                      title="Final prompt"
                      content={result.improvedPrompt}
                      emphasized
                    />

                    <ResultSection
                      title="Camera direction"
                      content={result.cameraDirection}
                    />

                    <ResultSection
                      title="Lighting & mood"
                      content={result.lightingMood}
                    />

                    <ResultSection
                      title="Negative prompt"
                      content={result.negativePrompt}
                    />

                    <ResultSection
                      title="Continuity notes"
                      content={result.continuityNotes}
                    />

                    <div>
                      <h4 className="mb-3 text-xs font-bold uppercase tracking-[0.08em] text-gray-400">
                        Shot plan
                      </h4>

                      <div className="space-y-3">
                        {result.shots.map((shot) => (
                          <article
                            key={shot.number}
                            className="rounded-xl border border-[#2c3038] bg-[#13151c] p-4"
                          >
                            <div className="mb-2 flex items-center justify-between gap-3">
                              <h5 className="font-semibold text-gray-100">
                                {shot.number}. {shot.title}
                              </h5>

                              <span className="rounded-full border border-purple-400/20 bg-purple-500/10 px-2 py-1 text-xs text-purple-300">
                                {shot.duration}s
                              </span>
                            </div>

                            <p className="text-sm leading-6 text-gray-400">
                              <strong className="text-gray-300">
                                Camera:
                              </strong>{" "}
                              {shot.camera}
                            </p>

                            <p className="mt-1.5 text-sm leading-6 text-gray-400">
                              <strong className="text-gray-300">
                                Action:
                              </strong>{" "}
                              {shot.action}
                            </p>
                          </article>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={handleCopy}
                    disabled={!result}
                    className="inline-flex h-11 items-center justify-center rounded-xl border border-[#3a3e49] bg-[#1b1d24] px-4 text-sm font-semibold text-gray-100 transition hover:bg-[#22252e] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Clipboard className="mr-2 h-4 w-4" />
                    Copy all
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyFinalPrompt}
                    disabled={!result}
                    className="inline-flex h-11 items-center justify-center rounded-xl border border-purple-500/40 bg-purple-500/10 px-4 text-sm font-semibold text-purple-100 transition hover:bg-purple-500/15 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Copy final prompt
                  </button>

                  <button
                    type="button"
                    onClick={handleClearResult}
                    disabled={!result}
                    className="inline-flex h-11 items-center justify-center rounded-xl border border-[#3a3e49] bg-[#1b1d24] px-4 text-sm font-semibold text-gray-200 transition hover:bg-[#22252e] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Clear
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  <MiniAction
                    label="Save"
                    icon={<Save className="h-3.5 w-3.5" />}
                    onClick={handleSave}
                    disabled={!result}
                  />

                  <MiniAction
                    label="TXT"
                    icon={<Download className="h-3.5 w-3.5" />}
                    onClick={handleExportText}
                    disabled={!result}
                  />

                  <MiniAction
                    label="JSON"
                    icon={<Download className="h-3.5 w-3.5" />}
                    onClick={handleExportJson}
                    disabled={!result}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        <section className="mt-16 scroll-mt-6" id="mediaforge-v02">
          <SectionHeading
            eyebrow="MediaForge Prompt Studio v0.2"
            title="One local workflow from rough idea to video-ready prompt."
            description="Built for creators who want useful AI assistance without exposing their creative work to a hosted prompt service."
          />

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <InfoCard
              number="01"
              title="Diagnose"
              description="Prompt Doctor finds ambiguity, missing direction and contradictions before generation."
            />
            <InfoCard
              number="02"
              title="Protect"
              description="Fidelity Guard checks whether the result preserves the subject, action, setting and explicit constraints."
            />
            <InfoCard
              number="03"
              title="Confirm"
              description="Visual Proof Frame generates a fast local SDXL still so you can approve or regenerate the scene."
            />
            <InfoCard
              number="04"
              title="Adapt"
              description="Model Adapter transparently prepares approved wording for Generic Video, Runway, Veo or Kling."
            />
          </div>
        </section>

        <section className="mt-16 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="overflow-hidden rounded-[24px] border border-[#2b2f39] bg-[#11131a] p-2 shadow-2xl">
            <img
              src="/mediaforge-v02-workspace.webp"
              alt="MediaForge Prompt Studio v0.2 local workspace running in a browser"
              className="w-full rounded-[18px]"
            />
          </div>
          <div>
            <SectionHeading
              eyebrow="Simple by default"
              title="The user sees CPU or GPU. MediaForge handles the rest."
              description="Hardware detection selects the compatible runtime automatically. Model and backend details remain available in Developer settings without crowding the normal workflow."
              compact
            />
            <div className="mt-5 space-y-3">
              <FeatureLine icon={<Cpu className="h-5 w-5" />} title="CPU path" text="Compatible OpenVINO image generation and llama.cpp Prompt Doctor fallback." />
              <FeatureLine icon={<MonitorCog className="h-5 w-5" />} title="NVIDIA path" text="CUDA acceleration with a tested low-memory mode for older 4 GB cards." />
              <FeatureLine icon={<ShieldCheck className="h-5 w-5" />} title="Developer control" text="Optional installed-model selection and clear runtime reporting when needed." />
            </div>
          </div>
        </section>

        <section className="mt-16 grid gap-6 md:grid-cols-2">
          <ShowcaseCard
            image="/mediaforge-v02-proof-frame.webp"
            alt="A Visual Proof Frame generated locally in MediaForge"
            title="Visual Proof Frame"
            description="Confirm the subject, location and visual direction before spending credits or time in an external video generator."
          />
          <ShowcaseCard
            image="/mediaforge-v02-model-adapter.webp"
            alt="MediaForge Model Adapter with a Generic Video target"
            title="Transparent Model Adapter"
            description="If no model-specific change is required, MediaForge says Compatible as-is. When wording changes, the reason is shown instead of hidden."
          />
        </section>

        <section className="mt-16" id="download">
          <SectionHeading
            eyebrow="Download & install"
            title="Choose your operating system. The setup stays simple."
            description="Docker Desktop is the only major prerequisite. AI models are downloaded locally after installation and are not bundled inside the small release archive."
          />

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <InstallCard
              title="Windows 10/11"
              badge="CPU + NVIDIA"
              href={WINDOWS_URL}
              downloadLabel="Download Windows ZIP"
              steps={[
                "Install and start Docker Desktop using Linux containers.",
                "Extract the complete ZIP into a new folder.",
                "Read START-HERE-WINDOWS.txt, then double-click MediaForge-Windows.cmd.",
                "MediaForge detects CPU or NVIDIA support, installs what it needs, and opens the app.",
              ]}
            />
            <InstallCard
              title="Linux x86_64"
              badge="CPU + NVIDIA path"
              href={LINUX_URL}
              downloadLabel="Download Linux archive"
              steps={[
                "Install Docker Engine with the Compose plugin.",
                "Extract the .tar.gz archive into a new folder.",
                "Read START-HERE-LINUX.txt, then run ./MediaForge-Linux.sh.",
                "MediaForge detects available hardware and starts the compatible local runtime.",
              ]}
            />
          </div>

          <div className="mt-5 rounded-2xl border border-amber-400/25 bg-amber-400/10 p-5">
            <div className="flex gap-3">
              <HardDriveDownload className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
              <div>
                <h3 className="font-bold text-amber-100">First start downloads several gigabytes</h3>
                <p className="mt-1 text-sm leading-6 text-amber-100/70">
                  Visual Proof Frame needs a large local SDXL model. The application
                  shows its preparation status and disables proof generation until it
                  is ready. Prompt Doctor remains available during the download. Future
                  starts reuse the local model cache.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16 grid gap-5 lg:grid-cols-3">
          <DetailCard
            icon={<ShieldCheck className="h-6 w-6" />}
            title="Privacy"
            text="Prompt and image inference runs through local services on your computer. The Studio runtime does not require a hosted AI provider."
          />
          <DetailCard
            icon={<Terminal className="h-6 w-6" />}
            title="Validated paths"
            text="Windows CPU/OpenVINO, Windows NVIDIA CUDA low-memory on a GTX 1050 4 GB, and Ubuntu 24.04 WSL2 CPU/OpenVINO have completed real tests."
          />
          <DetailCard
            icon={<MonitorCog className="h-6 w-6" />}
            title="Current scope"
            text="This is a pre-release. Native Linux NVIDIA support is included but still needs broader hardware validation. macOS support is planned later."
          />
        </section>

        <section className="mt-16 rounded-[24px] border border-[#2b2f39] bg-[#12141b] p-6 sm:p-8">
          <SectionHeading
            eyebrow="Before you start"
            title="Requirements and useful links"
            description="Keep Docker running, allow enough disk space for local models, and use the checksum file if you want to verify the download."
            compact
          />
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <ResourceLink href={RELEASE_URL} label="v0.2 release notes" />
            <ResourceLink href={CHECKSUM_URL} label="SHA-256 checksums" />
            <ResourceLink href={GITHUB_URL} label="Source code on GitHub" />
            <ResourceLink href={ISSUES_URL} label="Report an issue" />
          </div>
        </section>

        <footer className="mt-14 border-t border-[#252933] py-7 text-center text-xs leading-5 text-gray-500">
          Director&apos;s Cut AI Pro · MediaForge Prompt Studio v0.2 Public Preview<br />
          Local AI tools for cinematic video creation
        </footer>
      </div>
    </main>
  );
}

function DownloadButton({ href, label, secondary = false }: {
  href: string;
  label: string;
  secondary?: boolean;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex h-11 min-w-[220px] items-center justify-center rounded-xl px-5 text-sm font-bold transition ${
        secondary
          ? "border border-[#3a3e49] bg-[#15171e] text-gray-100 hover:bg-[#1d2028]"
          : "bg-gradient-to-r from-purple-500 to-cyan-400 text-[#08090f] hover:brightness-110"
      }`}
    >
      <Download className="mr-2 h-4 w-4" />
      {label}
    </Link>
  );
}

function SectionHeading({ eyebrow, title, description, compact = false }: {
  eyebrow: string;
  title: string;
  description: string;
  compact?: boolean;
}) {
  return (
    <div className={compact ? "max-w-2xl" : "mx-auto max-w-4xl text-center"}>
      <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-300">{eyebrow}</p>
      <h2 className={`mt-3 font-black tracking-tight ${compact ? "text-3xl" : "text-3xl sm:text-5xl"}`}>{title}</h2>
      <p className="mt-4 text-sm leading-7 text-gray-400 sm:text-base">{description}</p>
    </div>
  );
}

function InfoCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <article className="rounded-2xl border border-[#2b2f39] bg-[#12141b] p-5">
      <span className="text-sm font-black text-purple-300">{number}</span>
      <h3 className="mt-3 text-xl font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-gray-400">{description}</p>
    </article>
  );
}

function FeatureLine({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <div className="flex gap-3 rounded-2xl border border-[#2b2f39] bg-[#12141b] p-4">
      <span className="mt-0.5 text-emerald-300">{icon}</span>
      <div><h3 className="font-bold">{title}</h3><p className="mt-1 text-sm leading-6 text-gray-400">{text}</p></div>
    </div>
  );
}

function ShowcaseCard({ image, alt, title, description }: { image: string; alt: string; title: string; description: string }) {
  return (
    <article className="overflow-hidden rounded-[24px] border border-[#2b2f39] bg-[#12141b] p-3">
      <div className="overflow-hidden rounded-[18px] border border-[#30343e] bg-[#0d0f15]">
        <img src={image} alt={alt} className="aspect-[16/10] w-full object-cover object-top" />
      </div>
      <div className="p-4 sm:p-5">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-gray-400">{description}</p>
      </div>
    </article>
  );
}

function InstallCard({ title, badge, href, downloadLabel, steps }: {
  title: string;
  badge: string;
  href: string;
  downloadLabel: string;
  steps: string[];
}) {
  return (
    <article className="rounded-[24px] border border-[#2b2f39] bg-[#12141b] p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-2xl font-black">{title}</h3>
        <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">{badge}</span>
      </div>
      <ol className="mt-5 space-y-4">
        {steps.map((step, index) => (
          <li key={step} className="flex gap-3 text-sm leading-6 text-gray-300">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-500/15 text-xs font-bold text-purple-300">{index + 1}</span>
            {step}
          </li>
        ))}
      </ol>
      <Link href={href} target="_blank" rel="noreferrer" className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-cyan-400 px-5 text-sm font-black text-[#08090f] transition hover:brightness-110">
        <Download className="mr-2 h-4 w-4" />{downloadLabel}
      </Link>
    </article>
  );
}

function DetailCard({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <article className="rounded-2xl border border-[#2b2f39] bg-[#12141b] p-5">
      <div className="text-emerald-300">{icon}</div>
      <h3 className="mt-4 text-lg font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-gray-400">{text}</p>
    </article>
  );
}

function ResourceLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-xl border border-[#30343e] bg-[#0d0f15] px-4 py-3 text-sm font-semibold text-gray-200 transition hover:border-purple-400/50 hover:bg-[#15171e]">
      {label}<ExternalLink className="h-4 w-4 text-gray-500" />
    </Link>
  );
}

function ResultSection({
  title,
  content,
  emphasized = false,
}: {
  title: string;
  content: string;
  emphasized?: boolean;
}) {
  return (
    <div>
      <h4 className="mb-2 text-xs font-bold uppercase tracking-[0.08em] text-gray-400">
        {title}
      </h4>

      <div
        className={`whitespace-pre-wrap rounded-xl border p-4 text-sm leading-7 ${
          emphasized
            ? "border-purple-500/30 bg-purple-500/10 text-gray-100"
            : "border-[#2c3038] bg-[#13151c] text-gray-300"
        }`}
      >
        {content}
      </div>
    </div>
  );
}

function MiniAction({
  label,
  icon,
  onClick,
  disabled = false,
}: {
  label: string;
  icon: ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex h-9 items-center justify-center rounded-lg border border-[#343843] bg-[#15171e] px-3 text-xs font-medium text-gray-400 transition hover:bg-[#1d2028] hover:text-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
    >
      <span className="mr-1.5">{icon}</span>
      {label}
    </button>
  );
}
