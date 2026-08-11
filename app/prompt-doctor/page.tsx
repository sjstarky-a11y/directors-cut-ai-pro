"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import {
  Clipboard,
  Download,
  Home,
  RotateCcw,
  Save,
  Sparkles,
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

        <footer className="py-4 text-center text-xs text-gray-600">
          Director&apos;s Cut AI Pro · MediaForge Prompt Studio · Prompt Doctor browser workspace
        </footer>
      </div>
    </main>
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
