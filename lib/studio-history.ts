import type {
  PromptDoctorOptions,
  PromptDoctorResult,
} from "@/lib/prompt-doctor-engine";

/**
 * Prompts saved from Prompt Doctor Lite. Everything stays in this browser's
 * localStorage, in a separate list per Pi user id. Nothing is sent to a server.
 */
export type SavedPrompt = {
  id: string;
  savedAt: number;
  favorite: boolean;
  options: PromptDoctorOptions;
  result: PromptDoctorResult;
};

export const MAX_SAVED_PROMPTS = 50;

const KEY_PREFIX = "dcp-studio-history-v1:";

function storageKey(userId: string): string {
  return `${KEY_PREFIX}${userId}`;
}

function isSavedPrompt(value: unknown): value is SavedPrompt {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<SavedPrompt>;

  return (
    typeof item.id === "string" &&
    typeof item.savedAt === "number" &&
    typeof item.favorite === "boolean" &&
    !!item.options &&
    typeof item.options.input === "string" &&
    !!item.result &&
    typeof item.result.improvedPrompt === "string" &&
    Array.isArray(item.result.shots)
  );
}

/** Reads the saved list; a missing, blocked or damaged store gives an empty list. */
export function loadSavedPrompts(userId: string): SavedPrompt[] {
  try {
    const raw = window.localStorage.getItem(storageKey(userId));
    if (!raw) return [];

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(isSavedPrompt);
  } catch {
    return [];
  }
}

/** Returns false when the browser refused the write (private mode, full storage). */
export function persistSavedPrompts(
  userId: string,
  items: SavedPrompt[]
): boolean {
  try {
    window.localStorage.setItem(storageKey(userId), JSON.stringify(items));
    return true;
  } catch {
    return false;
  }
}

export function newSavedPrompt(
  options: PromptDoctorOptions,
  result: PromptDoctorResult
): SavedPrompt {
  return {
    id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    savedAt: Date.now(),
    favorite: false,
    options,
    result,
  };
}

/**
 * Adds a prompt at the top. When the list is full the oldest non-favourite is
 * dropped; if everything is a favourite nothing is added and null is returned.
 */
export function addSavedPrompt(
  items: SavedPrompt[],
  entry: SavedPrompt
): SavedPrompt[] | null {
  const next = [entry, ...items];
  if (next.length <= MAX_SAVED_PROMPTS) return next;

  for (let i = next.length - 1; i > 0; i -= 1) {
    if (!next[i].favorite) {
      next.splice(i, 1);
      return next;
    }
  }

  return null;
}
