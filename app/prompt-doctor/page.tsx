"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Check,
  Clipboard,
  Download,
  Clapperboard,
  Home,
  RotateCcw,
  Save,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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

export default function PromptDoctorPage() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<PromptMode>("improve");
  const [format, setFormat] = useState<VideoFormat>("16:9");
  const [duration, setDuration] = useState(30);
  const [language, setLanguage] =
    useState<OutputLanguage>("English");

  const [result, setResult] =
    useState<PromptDoctorResult | null>(null);

  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

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

      const generated =
        generatePromptDoctorResult(options);

      setResult(generated);
      showStatus("Prompt improved.");
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
    setDuration(30);
    setLanguage("English");
    setResult(null);
    setError("");
    setStatus("");
  };

  const handleCopy = async () => {
    if (!result) {
      return;
    }

    const text = formatPromptDoctorResult(
      options,
      result
    );

    await navigator.clipboard.writeText(text);
    showStatus("Copied to clipboard.");
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

  const handleSendToPlanner = () => {
    if (!result) {
      return;
    }

    const plannerScenes = result.shots.map((shot) => ({
      id: `scene-${Date.now()}-${shot.number}`,
      title: shot.title,
      duration: shot.duration,
      description: shot.action,
      camera: shot.camera,
      lighting: shot.lighting,
      notes: result.continuityNotes,
    }));

    localStorage.setItem(
      "directors-cut-scene-planner-import",
      JSON.stringify({
        projectTitle:
          input.trim().slice(0, 60) || "Prompt Doctor Project",
        scenes: plannerScenes,
        importedAt: new Date().toISOString(),
      })
    );

    router.push("/editor");
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
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 font-bold">
              DC
            </div>

            <div>
              <h1 className="text-xl font-bold sm:text-2xl">
                Director&apos;s Cut AI Pro
              </h1>

              <p className="text-sm text-gray-400">
                Prompt Doctor Beta
              </p>
            </div>
          </div>

          <Link href="/">
            <Button
              variant="outline"
              className="border-gray-700 bg-transparent text-gray-200 hover:bg-gray-800"
            >
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
          </Link>
        </header>

        <section className="mb-8 max-w-4xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-sm text-purple-200">
            <Sparkles className="h-4 w-4" />
            Free local prompt workspace
          </div>

          <h2 className="text-3xl font-bold leading-tight sm:text-5xl">
            Turn a rough idea into a
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              production-ready video plan.
            </span>
          </h2>

          <p className="mt-4 max-w-3xl text-base leading-7 text-gray-400 sm:text-lg">
            Improve prompts, define camera direction,
            strengthen lighting and mood, create negative
            prompts and generate a practical shot plan.
          </p>

          <p className="mt-2 text-sm text-emerald-300/80">
            This beta works locally in your browser. Your
            prompt is not sent to an external AI service.
          </p>
        </section>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-2xl border border-gray-800 bg-gray-900/70 p-5 shadow-xl backdrop-blur">
            <label
              htmlFor="rough-prompt"
              className="mb-2 block font-semibold"
            >
              Rough idea or weak prompt
            </label>

            <textarea
              id="rough-prompt"
              value={input}
              onChange={(event) =>
                setInput(event.target.value)
              }
              placeholder="Example: A couple sits on a beach at sunset while the camera slowly moves closer."
              className="min-h-44 w-full resize-y rounded-xl border border-gray-700 bg-gray-950/80 p-4 text-white outline-none transition placeholder:text-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
            />

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="space-y-2">
                <span className="block text-sm font-medium text-gray-300">
                  Mode
                </span>

                <select
                  value={mode}
                  onChange={(event) =>
                    setMode(
                      event.target.value as PromptMode
                    )
                  }
                  className="w-full rounded-lg border border-gray-700 bg-gray-950 p-3 text-white"
                >
                  <option value="improve">
                    Improve
                  </option>
                  <option value="cinematic">
                    Cinematic
                  </option>
                  <option value="commercial">
                    Commercial
                  </option>
                  <option value="shots">
                    Shot list
                  </option>
                </select>
              </label>

              <label className="space-y-2">
                <span className="block text-sm font-medium text-gray-300">
                  Format
                </span>

                <select
                  value={format}
                  onChange={(event) =>
                    setFormat(
                      event.target.value as VideoFormat
                    )
                  }
                  className="w-full rounded-lg border border-gray-700 bg-gray-950 p-3 text-white"
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

              <label className="space-y-2">
                <span className="block text-sm font-medium text-gray-300">
                  Duration
                </span>

                <select
                  value={duration}
                  onChange={(event) =>
                    setDuration(
                      Number(event.target.value)
                    )
                  }
                  className="w-full rounded-lg border border-gray-700 bg-gray-950 p-3 text-white"
                >
                  <option value={10}>10 seconds</option>
                  <option value={30}>30 seconds</option>
                  <option value={60}>60 seconds</option>
                </select>
              </label>

              <label className="space-y-2">
                <span className="block text-sm font-medium text-gray-300">
                  Output language
                </span>

                <select
                  value={language}
                  onChange={(event) =>
                    setLanguage(
                      event.target
                        .value as OutputLanguage
                    )
                  }
                  className="w-full rounded-lg border border-gray-700 bg-gray-950 p-3 text-white"
                >
                  <option value="English">
                    English
                  </option>
                  <option value="Croatian">
                    Croatian
                  </option>
                </select>
              </label>
            </div>

            {error && (
              <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
                {error}
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                onClick={handleGenerate}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Generate
              </Button>

              <Button
                onClick={handleReset}
                variant="outline"
                className="border-gray-700 bg-transparent text-gray-300 hover:bg-gray-800"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>
          </section>

          <section className="rounded-2xl border border-gray-800 bg-gray-900/70 p-5 shadow-xl backdrop-blur">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold">
                  Production result
                </h3>

                <p className="text-sm text-gray-500">
                  Structured for AI video workflows.
                </p>
              </div>

              {status && (
                <div className="flex items-center gap-2 text-sm text-emerald-300">
                  <Check className="h-4 w-4" />
                  {status}
                </div>
              )}
            </div>

            {!result ? (
              <div className="flex min-h-[520px] items-center justify-center rounded-xl border border-dashed border-gray-700 bg-gray-950/40 p-8 text-center text-gray-500">
                Enter an idea and generate your first
                production-ready prompt.
              </div>
            ) : (
              <div className="space-y-5">
                <ResultSection
                  title="Diagnosis"
                  content={result.diagnosis}
                />

                <ResultSection
                  title="Improved prompt"
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
                  <h4 className="mb-3 font-semibold text-purple-200">
                    Shot plan
                  </h4>

                  <div className="space-y-3">
                    {result.shots.map((shot) => (
                      <article
                        key={shot.number}
                        className="rounded-xl border border-gray-800 bg-gray-950/70 p-4"
                      >
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <h5 className="font-semibold">
                            {shot.number}. {shot.title}
                          </h5>

                          <span className="rounded-full bg-purple-500/10 px-2 py-1 text-xs text-purple-300">
                            {shot.duration}s
                          </span>
                        </div>

                        <p className="text-sm text-gray-400">
                          <strong className="text-gray-300">
                            Camera:
                          </strong>{" "}
                          {shot.camera}
                        </p>

                        <p className="mt-2 text-sm text-gray-400">
                          <strong className="text-gray-300">
                            Action:
                          </strong>{" "}
                          {shot.action}
                        </p>
                      </article>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 border-t border-gray-800 pt-5">
                  <Button
                    onClick={handleSendToPlanner}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <Clapperboard className="mr-2 h-4 w-4" />
                    Send to Scene Planner
                  </Button>

                  <Button
                    onClick={handleCopy}
                    variant="outline"
                    className="border-gray-700 bg-transparent text-gray-300 hover:bg-gray-800"
                  >
                    <Clipboard className="mr-2 h-4 w-4" />
                    Copy all
                  </Button>

                  <Button
                    onClick={handleSave}
                    variant="outline"
                    className="border-gray-700 bg-transparent text-gray-300 hover:bg-gray-800"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save locally
                  </Button>

                  <Button
                    onClick={handleExportText}
                    variant="outline"
                    className="border-gray-700 bg-transparent text-gray-300 hover:bg-gray-800"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    TXT
                  </Button>

                  <Button
                    onClick={handleExportJson}
                    variant="outline"
                    className="border-gray-700 bg-transparent text-gray-300 hover:bg-gray-800"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    JSON
                  </Button>
                </div>
              </div>
            )}
          </section>
        </div>
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
      <h4 className="mb-2 font-semibold text-purple-200">
        {title}
      </h4>

      <div
        className={`rounded-xl border p-4 text-sm leading-7 ${
          emphasized
            ? "border-purple-500/30 bg-purple-500/10 text-gray-100"
            : "border-gray-800 bg-gray-950/70 text-gray-300"
        }`}
      >
        {content}
      </div>
    </div>
  );
}