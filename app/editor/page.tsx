"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  Clapperboard,
  Copy,
  Download,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Scene = {
  id: string;
  title: string;
  duration: number;
  description: string;
  camera: string;
  lighting: string;
  notes: string;
};

const STORAGE_KEY = "directors-cut-scene-planner";

const initialScenes: Scene[] = [
  {
    id: "scene-1",
    title: "Opening Shot",
    duration: 4,
    description: "Introduce the location and establish the visual atmosphere.",
    camera: "Wide establishing shot with a slow push-in.",
    lighting: "Soft directional light with natural contrast.",
    notes: "Keep the main subject clearly visible.",
  },
  {
    id: "scene-2",
    title: "Main Action",
    duration: 6,
    description: "Show the central action and the subject interacting with the environment.",
    camera: "Medium tracking shot at eye level.",
    lighting: "Match the light direction from the opening shot.",
    notes: "Preserve wardrobe, props and screen direction.",
  },
];

export default function EditorPage() {
  const [projectTitle, setProjectTitle] = useState("Untitled Video Plan");
  const [scenes, setScenes] = useState<Scene[]>(initialScenes);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const imported = localStorage.getItem(
      "directors-cut-scene-planner-import"
    );

    if (!imported) {
      return;
    }

    try {
      const parsed = JSON.parse(imported) as {
        projectTitle?: string;
        scenes?: Scene[];
      };

      if (parsed.projectTitle) {
        setProjectTitle(parsed.projectTitle);
      }

      if (Array.isArray(parsed.scenes) && parsed.scenes.length > 0) {
        setScenes(parsed.scenes);
        setStatus("Shot plan imported from Prompt Doctor.");
      }

      localStorage.removeItem(
        "directors-cut-scene-planner-import"
      );
    } catch {
      setStatus("Unable to import the shot plan.");
    }
  }, []);

  const totalDuration = useMemo(
    () => scenes.reduce((sum, scene) => sum + scene.duration, 0),
    [scenes]
  );

  const updateScene = (
    id: string,
    field: keyof Scene,
    value: string | number
  ) => {
    setScenes((current) =>
      current.map((scene) =>
        scene.id === id ? { ...scene, [field]: value } : scene
      )
    );
  };

  const addScene = () => {
    const nextNumber = scenes.length + 1;

    setScenes((current) => [
      ...current,
      {
        id: `scene-${Date.now()}`,
        title: `Scene ${nextNumber}`,
        duration: 5,
        description: "",
        camera: "",
        lighting: "",
        notes: "",
      },
    ]);
  };

  const deleteScene = (id: string) => {
    setScenes((current) => current.filter((scene) => scene.id !== id));
  };

  const moveScene = (index: number, direction: -1 | 1) => {
    const target = index + direction;

    if (target < 0 || target >= scenes.length) {
      return;
    }

    const reordered = [...scenes];
    [reordered[index], reordered[target]] = [
      reordered[target],
      reordered[index],
    ];

    setScenes(reordered);
  };

  const showStatus = (message: string) => {
    setStatus(message);
    window.setTimeout(() => setStatus(""), 2200);
  };

  const saveProject = () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        projectTitle,
        scenes,
        savedAt: new Date().toISOString(),
      })
    );

    showStatus("Project saved locally.");
  };

  const copyPlan = async () => {
    await navigator.clipboard.writeText(buildTextPlan());
    showStatus("Shot plan copied.");
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

  const buildTextPlan = () => {
    const sceneText = scenes
      .map(
        (scene, index) => `SCENE ${index + 1}: ${scene.title}
Duration: ${scene.duration}s
Description: ${scene.description || "-"}
Camera: ${scene.camera || "-"}
Lighting: ${scene.lighting || "-"}
Notes: ${scene.notes || "-"}`
      )
      .join("\n\n");

    return `DIRECTOR'S CUT AI PRO — SCENE PLAN

Project: ${projectTitle}
Total duration: ${totalDuration}s
Scenes: ${scenes.length}

${sceneText}`;
  };

  const exportText = () => {
    downloadFile(
      `scene-plan-${Date.now()}.txt`,
      buildTextPlan(),
      "text/plain;charset=utf-8"
    );

    showStatus("TXT exported.");
  };

  const exportJson = () => {
    downloadFile(
      `scene-plan-${Date.now()}.json`,
      JSON.stringify(
        {
          app: "Director's Cut AI Pro",
          projectTitle,
          totalDuration,
          scenes,
          createdAt: new Date().toISOString(),
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
      <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-700 bg-gray-900 text-gray-300 hover:bg-gray-800"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>

            <div>
              <h1 className="text-xl font-bold sm:text-2xl">
                Scene & Shot Planner
              </h1>
              <p className="text-sm text-gray-400">
                Build an editable production plan.
              </p>
            </div>
          </div>

          <Button
            onClick={saveProject}
            className="bg-gradient-to-r from-purple-600 to-pink-600"
          >
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
        </header>

        <section className="mb-6 rounded-2xl border border-gray-800 bg-gray-900/70 p-4 sm:p-6">
          <label className="block text-sm font-medium text-gray-300">
            Project title
          </label>

          <input
            value={projectTitle}
            onChange={(event) => setProjectTitle(event.target.value)}
            className="mt-2 w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 text-lg font-semibold outline-none focus:border-purple-500"
          />

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            <SummaryCard label="Scenes" value={`${scenes.length}`} />
            <SummaryCard label="Duration" value={`${totalDuration}s`} />
            <SummaryCard
              label="Status"
              value={status || "Ready"}
              fullWidth
            />
          </div>
        </section>

        <section className="space-y-4">
          {scenes.map((scene, index) => (
            <article
              key={scene.id}
              className="rounded-2xl border border-gray-800 bg-gray-900/75 p-4 sm:p-5"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/15 text-purple-300">
                    <Clapperboard className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wide text-purple-300">
                      Scene {index + 1}
                    </p>

                    <input
                      value={scene.title}
                      onChange={(event) =>
                        updateScene(
                          scene.id,
                          "title",
                          event.target.value
                        )
                      }
                      className="mt-1 w-full border-0 bg-transparent text-lg font-bold outline-none"
                    />
                  </div>
                </div>

                <div className="flex gap-1">
                  <IconButton
                    label="Move up"
                    disabled={index === 0}
                    onClick={() => moveScene(index, -1)}
                  >
                    <ArrowUp className="h-4 w-4" />
                  </IconButton>

                  <IconButton
                    label="Move down"
                    disabled={index === scenes.length - 1}
                    onClick={() => moveScene(index, 1)}
                  >
                    <ArrowDown className="h-4 w-4" />
                  </IconButton>

                  <IconButton
                    label="Delete"
                    onClick={() => deleteScene(scene.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </IconButton>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Duration in seconds">
                  <input
                    type="number"
                    min={1}
                    max={300}
                    value={scene.duration}
                    onChange={(event) =>
                      updateScene(
                        scene.id,
                        "duration",
                        Math.max(1, Number(event.target.value))
                      )
                    }
                    className="planner-input"
                  />
                </Field>

                <Field label="Camera direction">
                  <input
                    value={scene.camera}
                    onChange={(event) =>
                      updateScene(
                        scene.id,
                        "camera",
                        event.target.value
                      )
                    }
                    placeholder="Wide shot, slow push-in..."
                    className="planner-input"
                  />
                </Field>

                <Field label="Scene description" wide>
                  <textarea
                    value={scene.description}
                    onChange={(event) =>
                      updateScene(
                        scene.id,
                        "description",
                        event.target.value
                      )
                    }
                    placeholder="What happens in this scene?"
                    className="planner-textarea"
                  />
                </Field>

                <Field label="Lighting & mood">
                  <textarea
                    value={scene.lighting}
                    onChange={(event) =>
                      updateScene(
                        scene.id,
                        "lighting",
                        event.target.value
                      )
                    }
                    placeholder="Golden hour, soft contrast..."
                    className="planner-textarea"
                  />
                </Field>

                <Field label="Continuity notes">
                  <textarea
                    value={scene.notes}
                    onChange={(event) =>
                      updateScene(
                        scene.id,
                        "notes",
                        event.target.value
                      )
                    }
                    placeholder="Wardrobe, props, screen direction..."
                    className="planner-textarea"
                  />
                </Field>
              </div>
            </article>
          ))}
        </section>

        <Button
          onClick={addScene}
          variant="outline"
          className="mt-5 h-12 w-full border-dashed border-purple-500/50 bg-purple-500/5 text-purple-200 hover:bg-purple-500/10"
        >
          <Plus className="mr-2 h-5 w-5" />
          Add scene
        </Button>

        <section className="mt-6 rounded-2xl border border-gray-800 bg-gray-900/70 p-4">
          <h2 className="font-bold">Export production plan</h2>

          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            <Button
              onClick={copyPlan}
              variant="outline"
              className="border-gray-700 bg-transparent"
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </Button>

            <Button
              onClick={exportText}
              variant="outline"
              className="border-gray-700 bg-transparent"
            >
              <Download className="mr-2 h-4 w-4" />
              Export TXT
            </Button>

            <Button
              onClick={exportJson}
              variant="outline"
              className="border-gray-700 bg-transparent"
            >
              <Download className="mr-2 h-4 w-4" />
              Export JSON
            </Button>
          </div>
        </section>
      </div>

      <style jsx>{`
        .planner-input,
        .planner-textarea {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid rgb(55 65 81);
          background: rgb(3 7 18 / 0.8);
          padding: 0.75rem;
          color: white;
          outline: none;
        }

        .planner-input:focus,
        .planner-textarea:focus {
          border-color: rgb(168 85 247);
        }

        .planner-textarea {
          min-height: 96px;
          resize: vertical;
        }
      `}</style>
    </main>
  );
}

function Field({
  label,
  children,
  wide = false,
}: {
  label: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <label className={wide ? "sm:col-span-2" : ""}>
      <span className="mb-2 block text-sm font-medium text-gray-300">
        {label}
      </span>
      {children}
    </label>
  );
}

function SummaryCard({
  label,
  value,
  fullWidth = false,
}: {
  label: string;
  value: string;
  fullWidth?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border border-gray-800 bg-gray-950/70 p-3 ${
        fullWidth ? "col-span-2 sm:col-span-1" : ""
      }`}
    >
      <p className="text-xs uppercase tracking-wide text-gray-500">
        {label}
      </p>
      <p className="mt-1 truncate font-semibold text-gray-200">
        {value}
      </p>
    </div>
  );
}

function IconButton({
  children,
  label,
  disabled = false,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-700 bg-gray-950 text-gray-400 transition hover:bg-gray-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
    >
      {children}
    </button>
  );
}