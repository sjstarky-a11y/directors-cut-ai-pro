"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Copy,
  Download,
  Sparkles,
  Wand2,
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
import { WINDOWS_URL, LINUX_URL } from "@/lib/mediaforge-release";

const MODES: { value: PromptMode; label: string; hint: string }[] = [
  { value: "improve", label: "Improve", hint: "Clearer, more complete prompt" },
  { value: "cinematic", label: "Cinematic", hint: "Film look, camera and mood" },
  { value: "commercial", label: "Commercial", hint: "Product and brand focus" },
  { value: "shots", label: "Shot plan", hint: "Scene split into shots" },
];

const FORMATS: VideoFormat[] = ["16:9", "9:16", "1:1"];
const DURATIONS = [5, 10, 15, 30, 60];
const LANGUAGES: OutputLanguage[] = ["English", "Croatian"];
const MAX_INPUT = 1200;

const EXAMPLES = [
  "A hand closes a brass compass on a sunlit wooden table",
  "A runner crosses an empty bridge at sunrise",
  "A new sneaker rotating on a reflective black surface",
];

/** Clipboard can be restricted inside some in-app browsers, so keep a fallback. */
async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const area = document.createElement("textarea");
      area.value = text;
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(area);
      return ok;
    } catch {
      return false;
    }
  }
}

function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [state, setState] = useState<"idle" | "done" | "failed">("idle");

  const onClick = async () => {
    const ok = await copyText(text);
    setState(ok ? "done" : "failed");
    window.setTimeout(() => setState("idle"), 1800);
  };

  return (
    <button
      type="button"
      onClick={() => void onClick()}
      className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-md border border-gray-700 bg-gray-900 px-3 text-xs font-semibold text-gray-200 transition hover:border-purple-400/50"
    >
      {state === "done" ? (
        <Check className="h-3.5 w-3.5 text-emerald-300" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
      {state === "done" ? "Copied" : state === "failed" ? "Select & copy" : label}
    </button>
  );
}

function ResultBlock({
  title,
  text,
  highlight = false,
}: {
  title: string;
  text: string;
  highlight?: boolean;
}) {
  return (
    <section
      className={`rounded-2xl border p-4 sm:p-5 ${
        highlight
          ? "border-purple-400/40 bg-purple-500/10"
          : "border-gray-800 bg-gray-900/60"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-gray-400">
          {title}
        </h3>
        <CopyButton text={text} />
      </div>
      <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-gray-100">
        {text}
      </p>
    </section>
  );
}

const selectClass =
  "h-11 w-full rounded-md border border-gray-700 bg-gray-900 px-3 text-sm text-white focus:border-purple-400 focus:outline-none";

export default function StudioPage() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<PromptMode>("cinematic");
  const [format, setFormat] = useState<VideoFormat>("16:9");
  const [duration, setDuration] = useState(10);
  const [language, setLanguage] = useState<OutputLanguage>("English");
  const [options, setOptions] = useState<PromptDoctorOptions | null>(null);
  const [result, setResult] = useState<PromptDoctorResult | null>(null);
  const [error, setError] = useState("");

  const run = () => {
    const next: PromptDoctorOptions = { input, mode, format, duration, language };

    try {
      setResult(generatePromptDoctorResult(next));
      setOptions(next);
      setError("");
    } catch {
      setResult(null);
      setError("Write a short idea or an existing prompt first.");
    }
  };

  const downloadText = () => {
    if (!result || !options) return;

    const blob = new Blob([formatPromptDoctorResult(options, result)], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "prompt-doctor.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-[#07070d] text-white">
      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-purple-300 hover:text-purple-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Home
        </Link>

        <header className="mt-5">
          <p className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-200">
            <Sparkles className="h-3.5 w-3.5" />
            Free for Pi users
          </p>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl">
            Prompt Doctor Lite
          </h1>
          <p className="mt-3 text-sm leading-7 text-gray-400 sm:text-base">
            Write a rough idea. Get a stronger video prompt with camera
            direction, lighting, a negative prompt and a shot plan. It runs in
            your browser; your idea is not sent anywhere.
          </p>
        </header>

        <section className="mt-6 rounded-2xl border border-gray-800 bg-gray-900/60 p-4 sm:p-6">
          <label htmlFor="idea" className="text-sm font-semibold">
            Your idea or prompt
          </label>
          <textarea
            id="idea"
            value={input}
            onChange={(event) => setInput(event.target.value.slice(0, MAX_INPUT))}
            rows={5}
            placeholder="e.g. A runner crosses an empty bridge at sunrise"
            className="mt-2 w-full rounded-md border border-gray-700 bg-gray-950 p-3 text-sm leading-6 text-white placeholder:text-gray-500 focus:border-purple-400 focus:outline-none"
          />
          <div className="mt-1 flex justify-between text-xs text-gray-500">
            <span>{input.length}/{MAX_INPUT}</span>
          </div>

          <div className="mt-2 flex flex-wrap gap-2">
            {EXAMPLES.map((example) => (
              <button
                key={example}
                type="button"
                onClick={() => setInput(example)}
                className="rounded-full border border-gray-700 px-3 py-1.5 text-xs text-gray-300 transition hover:border-purple-400/50"
              >
                {example}
              </button>
            ))}
          </div>

          <fieldset className="mt-5">
            <legend className="text-sm font-semibold">Mode</legend>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {MODES.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setMode(item.value)}
                  aria-pressed={mode === item.value}
                  className={`rounded-lg border p-3 text-left transition ${
                    mode === item.value
                      ? "border-purple-400 bg-purple-500/15"
                      : "border-gray-700 hover:border-gray-600"
                  }`}
                >
                  <span className="block text-sm font-semibold">{item.label}</span>
                  <span className="mt-0.5 block text-xs text-gray-400">
                    {item.hint}
                  </span>
                </button>
              ))}
            </div>
          </fieldset>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <div>
              <label htmlFor="format" className="text-sm font-semibold">
                Format
              </label>
              <select
                id="format"
                className={`mt-2 ${selectClass}`}
                value={format}
                onChange={(e) => setFormat(e.target.value as VideoFormat)}
              >
                {FORMATS.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="duration" className="text-sm font-semibold">
                Duration
              </label>
              <select
                id="duration"
                className={`mt-2 ${selectClass}`}
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
              >
                {DURATIONS.map((d) => (
                  <option key={d} value={d}>{d} s</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="language" className="text-sm font-semibold">
                Output language
              </label>
              <select
                id="language"
                className={`mt-2 ${selectClass}`}
                value={language}
                onChange={(e) => setLanguage(e.target.value as OutputLanguage)}
              >
                {LANGUAGES.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
          </div>

          {error && (
            <p className="mt-4 text-sm text-amber-300" role="alert">
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={run}
            className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-600 px-6 text-base font-semibold text-white transition hover:from-purple-700 hover:to-pink-700"
          >
            <Wand2 className="h-5 w-5" />
            Improve my prompt
          </button>
        </section>

        {result && options && (
          <div className="mt-6 space-y-4" aria-live="polite">
            <ResultBlock title="Improved prompt" text={result.improvedPrompt} highlight />
            <ResultBlock title="Diagnosis" text={result.diagnosis} />
            <ResultBlock title="Camera direction" text={result.cameraDirection} />
            <ResultBlock title="Lighting & mood" text={result.lightingMood} />
            <ResultBlock title="Negative prompt" text={result.negativePrompt} />
            <ResultBlock title="Continuity notes" text={result.continuityNotes} />

            <section className="rounded-2xl border border-gray-800 bg-gray-900/60 p-4 sm:p-5">
              <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-gray-400">
                Shot plan
              </h3>
              <ol className="mt-4 space-y-4">
                {result.shots.map((shot) => (
                  <li key={shot.number} className="rounded-xl border border-gray-800 bg-gray-950/60 p-4">
                    <p className="text-sm font-semibold">
                      {shot.number}. {shot.title}
                      <span className="ml-2 text-xs font-normal text-gray-400">
                        {shot.duration}s
                      </span>
                    </p>
                    <p className="mt-2 text-sm leading-6 text-gray-300">
                      <span className="text-gray-500">Camera: </span>{shot.camera}
                    </p>
                    <p className="text-sm leading-6 text-gray-300">
                      <span className="text-gray-500">Action: </span>{shot.action}
                    </p>
                  </li>
                ))}
              </ol>
            </section>

            <div className="flex flex-wrap gap-3">
              <CopyButton
                text={formatPromptDoctorResult(options, result)}
                label="Copy everything"
              />
              <button
                type="button"
                onClick={downloadText}
                className="inline-flex h-8 items-center gap-1.5 rounded-md border border-gray-700 bg-gray-900 px-3 text-xs font-semibold text-gray-200 transition hover:border-purple-400/50"
              >
                <Download className="h-3.5 w-3.5" />
                Save as .txt
              </button>
            </div>
          </div>
        )}

        <section className="mt-10 rounded-2xl border border-gray-800 bg-gray-900/40 p-5 text-sm leading-7 text-gray-400">
          <p className="font-semibold text-gray-200">Want the full version?</p>
          <p className="mt-1">
            MediaForge Prompt Studio runs on your own Windows or Linux computer
            and adds image previews and a fuller workflow.
          </p>
          <div className="mt-3 flex flex-wrap gap-4">
            <Link href="/prompt-doctor" className="font-semibold text-purple-300 hover:text-purple-200">
              Features &amp; downloads
            </Link>
            <Link href={WINDOWS_URL} target="_blank" rel="noreferrer" className="text-gray-300 hover:text-white">
              Windows
            </Link>
            <Link href={LINUX_URL} target="_blank" rel="noreferrer" className="text-gray-300 hover:text-white">
              Linux
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
