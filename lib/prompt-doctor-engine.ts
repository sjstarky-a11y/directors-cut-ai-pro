export type PromptMode =
  | "improve"
  | "cinematic"
  | "commercial"
  | "shots";

export type VideoFormat = "16:9" | "9:16" | "1:1";
export type OutputLanguage = "English" | "Croatian";

export type PromptDoctorOptions = {
  input: string;
  mode: PromptMode;
  format: VideoFormat;
  duration: number;
  language: OutputLanguage;
};

export type ShotPlanItem = {
  number: number;
  duration: number;
  title: string;
  camera: string;
  action: string;
  lighting: string;
};

export type PromptDoctorResult = {
  diagnosis: string;
  improvedPrompt: string;
  cameraDirection: string;
  lightingMood: string;
  negativePrompt: string;
  continuityNotes: string;
  shots: ShotPlanItem[];
};

function cleanInput(input: string): string {
  return input
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[.]+$/, "");
}

function containsAny(text: string, words: string[]): boolean {
  const lower = text.toLowerCase();

  return words.some((word) => lower.includes(word));
}

function detectLighting(input: string, language: OutputLanguage): string {
  const beach = containsAny(input, [
    "beach",
    "sea",
    "ocean",
    "sunset",
    "plaža",
    "more",
    "zalazak",
  ]);

  const nightCity = containsAny(input, [
    "night",
    "city",
    "neon",
    "noć",
    "grad",
  ]);

  const product = containsAny(input, [
    "product",
    "bottle",
    "car",
    "watch",
    "phone",
    "proizvod",
    "boca",
    "automobil",
    "sat",
    "telefon",
  ]);

  const interior = containsAny(input, [
    "room",
    "office",
    "kitchen",
    "studio",
    "interior",
    "soba",
    "ured",
    "kuhinja",
  ]);

  if (language === "Croatian") {
    if (beach) {
      return "Toplo svjetlo zlatnog sata, mekani odsjaji na vodi, blaga atmosferska izmaglica i prirodan kontrast.";
    }

    if (nightCity) {
      return "Motivirana neonska i ulična rasvjeta, kontrolirani kontrast, refleksije na površinama i duboke sjene.";
    }

    if (product) {
      return "Čisto studijsko ključno svjetlo, precizan rubni sjaj, premium refleksije i jasno odvajanje proizvoda od pozadine.";
    }

    if (interior) {
      return "Meko svjetlo kroz prozor uz motivirana praktična svjetla, prirodne sjene i ugodnu dubinu prostora.";
    }

    return "Meko usmjereno ključno svjetlo, prirodan kontrast, suptilna atmosferska dubina i kontrolirani naglasci.";
  }

  if (beach) {
    return "Warm golden-hour light, soft reflections on the water, subtle atmospheric haze and natural contrast.";
  }

  if (nightCity) {
    return "Motivated neon and street lighting, controlled contrast, reflective surfaces and deep cinematic shadows.";
  }

  if (product) {
    return "Clean studio key light, precise rim lighting, premium reflections and clear separation from the background.";
  }

  if (interior) {
    return "Soft window light supported by motivated practical lights, natural shadows and comfortable spatial depth.";
  }

  return "Soft directional key light, natural contrast, subtle atmospheric depth and controlled highlights.";
}

function cameraForFormat(
  format: VideoFormat,
  mode: PromptMode,
  language: OutputLanguage
): string {
  const commercialAddition =
    mode === "commercial"
      ? language === "Croatian"
        ? " Uključi čiste detaljne kadrove i jasan završni hero kadar."
        : " Include clean detail shots and a clear final hero frame."
      : "";

  if (language === "Croatian") {
    const camera =
      format === "9:16"
        ? "Koristi vertikalno kadriranje, drži glavni subjekt unutar sigurne središnje zone te kombiniraj srednje i krupne kadrove."
        : format === "1:1"
          ? "Koristi uravnotežene kvadratne kompozicije, jasno središte interesa i kontrolirane prijelaze između srednjih i detaljnih kadrova."
          : "Počni širokim uvodnim kadrom, prijeđi u kontrolirani srednji kadar i završi odabranim krupnim detaljima.";

    return `${camera}${commercialAddition}`;
  }

  const camera =
    format === "9:16"
      ? "Use vertical framing, keep the main subject inside the central safe area, and combine medium shots with selective close-ups."
      : format === "1:1"
        ? "Use balanced square compositions, a clear center of interest, and controlled transitions between medium and detail shots."
        : "Begin with a wide establishing shot, move into a controlled medium shot, and finish with selective close details.";

  return `${camera}${commercialAddition}`;
}

function buildDiagnosis(
  mode: PromptMode,
  language: OutputLanguage
): string {
  if (language === "Croatian") {
    if (mode === "shots") {
      return "Ideja ima osnovnu radnju, ali treba je podijeliti na jasne kadrove s određenim trajanjem, kamerom, rasvjetom i kontinuitetom.";
    }

    if (mode === "commercial") {
      return "Koncept treba jasniji fokus na korist, vizualni identitet, proizvod ili uslugu te snažniji završni kadar.";
    }

    if (mode === "cinematic") {
      return "Ideja je razumljiva, ali nedostaju precizna režijska namjera, vizualna atmosfera, pokret kamere i emocionalni ritam.";
    }

    return "Ideja je jasna, ali nedostaju kadar, pokret kamere, rasvjeta, atmosfera, ritam i tehnička ograničenja.";
  }

  if (mode === "shots") {
    return "The idea has a basic action, but it needs to be divided into clear shots with defined duration, camera direction, lighting and continuity.";
  }

  if (mode === "commercial") {
    return "The concept needs a clearer benefit, stronger visual identity, focused product or service presentation and a stronger closing frame.";
  }

  if (mode === "cinematic") {
    return "The idea is understandable, but it lacks precise directorial intent, visual atmosphere, camera movement and emotional pacing.";
  }

  return "The idea is clear, but it lacks framing, camera movement, lighting, atmosphere, pacing and technical constraints.";
}

function buildImprovedPrompt(
  input: string,
  options: PromptDoctorOptions,
  lighting: string,
  camera: string
): string {
  const style =
    options.mode === "commercial"
      ? options.language === "Croatian"
        ? "premium reklamni"
        : "premium commercial"
      : options.mode === "cinematic"
        ? options.language === "Croatian"
          ? "filmski"
          : "cinematic"
        : options.language === "Croatian"
          ? "vizualno uvjerljiv"
          : "visually convincing";

  if (options.language === "Croatian") {
    return `Izradi ${style} video u formatu ${options.format}, trajanja približno ${options.duration} sekundi. Osnovna scena: ${input}. Jasno definiraj glavni subjekt, njegovu radnju i odnos prema prostoru. ${camera} Pokret neka bude prirodan, kontroliran i čitljiv, bez naglih promjena položaja ili izgleda subjekta. Rasvjeta i atmosfera: ${lighting} Zadrži konzistentan izgled likova, odjeće, rekvizita, lokacije i smjera svjetla kroz cijelu sekvencu. Završni kadar mora imati jasan vizualni naglasak i osjećaj dovršene scene.`;
  }

  return `Create a ${style} ${options.format} video lasting approximately ${options.duration} seconds. Core scene: ${input}. Clearly define the main subject, its action and its relationship to the environment. ${camera} Movement should feel natural, controlled and readable, without sudden changes in subject position or appearance. Lighting and atmosphere: ${lighting} Maintain consistent characters, wardrobe, props, location and light direction throughout the sequence. End with a clear visual emphasis and a resolved final frame.`;
}

function buildNegativePrompt(language: OutputLanguage): string {
  if (language === "Croatian") {
    return "Izbjegavati deformirana lica i tijela, dodatne prste ili udove, promjene identiteta, nestabilan pokret, treperenje, skokove u kontinuitetu, neprirodnu fiziku, zamućene detalje, slučajni tekst, logotipe, watermark, preeksponirane dijelove i neželjene moderne predmete.";
  }

  return "Avoid distorted faces and bodies, extra fingers or limbs, identity changes, unstable motion, flicker, continuity jumps, unnatural physics, blurred details, random text, logos, watermarks, blown highlights and unwanted modern objects.";
}

function buildContinuity(language: OutputLanguage): string {
  if (language === "Croatian") {
    return "Zadržati isti identitet likova, frizuru, odjeću, rekvizite, položaj važnih objekata, vremenske uvjete, paletu boja i smjer rasvjete u svakom kadru.";
  }

  return "Keep character identity, hairstyle, wardrobe, props, important object placement, weather, color palette and lighting direction consistent in every shot.";
}

function distributeDurations(total: number, count: number): number[] {
  const base = Math.floor(total / count);
  const remainder = total - base * count;

  return Array.from({ length: count }, (_, index) =>
    base + (index < remainder ? 1 : 0)
  );
}

function buildShots(
  input: string,
  options: PromptDoctorOptions,
  lighting: string
): ShotPlanItem[] {
  const count =
    options.duration <= 10
      ? 3
      : options.duration <= 30
        ? 5
        : 6;

  const durations = distributeDurations(options.duration, count);

  const english = [
    {
      title: "Establishing shot",
      camera: "Wide shot with a slow controlled push-in",
      action: `Introduce the environment and visual context for: ${input}`,
    },
    {
      title: "Subject introduction",
      camera: "Medium shot at eye level",
      action: "Reveal the main subject and establish the central action.",
    },
    {
      title: "Action development",
      camera: "Medium tracking shot or gentle lateral movement",
      action: "Develop the main action while preserving readable movement.",
    },
    {
      title: "Emotional or product detail",
      camera: "Selective close-up with shallow depth of field",
      action: "Highlight the most important emotional, visual or product detail.",
    },
    {
      title: "Payoff",
      camera: "Controlled hero shot with a subtle camera move",
      action: "Deliver the strongest visual moment and clarify the purpose of the scene.",
    },
    {
      title: "Closing frame",
      camera: "Stable final composition",
      action: "Resolve the scene with a clean, memorable final image.",
    },
  ];

  const croatian = [
    {
      title: "Uvodni kadar",
      camera: "Široki kadar s polaganim kontroliranim približavanjem",
      action: `Predstaviti prostor i vizualni kontekst za scenu: ${input}`,
    },
    {
      title: "Predstavljanje subjekta",
      camera: "Srednji kadar u razini očiju",
      action: "Jasno predstaviti glavni subjekt i središnju radnju.",
    },
    {
      title: "Razvoj radnje",
      camera: "Srednji prateći kadar ili blago bočno kretanje",
      action: "Razviti glavnu radnju uz čitljiv i prirodan pokret.",
    },
    {
      title: "Emocionalni ili proizvodni detalj",
      camera: "Odabrani krupni kadar s plitkom dubinom polja",
      action: "Naglasiti najvažniji emocionalni, vizualni ili proizvodni detalj.",
    },
    {
      title: "Vrhunac",
      camera: "Kontrolirani hero kadar sa suptilnim pokretom kamere",
      action: "Prikazati najsnažniji vizualni trenutak i svrhu scene.",
    },
    {
      title: "Završni kadar",
      camera: "Stabilna završna kompozicija",
      action: "Zaključiti scenu čistom i pamtljivom završnom slikom.",
    },
  ];

  const source =
    options.language === "Croatian" ? croatian : english;

  return source.slice(0, count).map((shot, index) => ({
    number: index + 1,
    duration: durations[index],
    title: shot.title,
    camera: shot.camera,
    action: shot.action,
    lighting,
  }));
}

export function generatePromptDoctorResult(
  options: PromptDoctorOptions
): PromptDoctorResult {
  const input = cleanInput(options.input);

  if (!input) {
    throw new Error("A prompt or idea is required.");
  }

  const lighting = detectLighting(input, options.language);
  const camera = cameraForFormat(
    options.format,
    options.mode,
    options.language
  );

  return {
    diagnosis: buildDiagnosis(options.mode, options.language),
    improvedPrompt: buildImprovedPrompt(
      input,
      options,
      lighting,
      camera
    ),
    cameraDirection: camera,
    lightingMood: lighting,
    negativePrompt: buildNegativePrompt(options.language),
    continuityNotes: buildContinuity(options.language),
    shots: buildShots(input, options, lighting),
  };
}

export function formatPromptDoctorResult(
  options: PromptDoctorOptions,
  result: PromptDoctorResult
): string {
  const shotText = result.shots
    .map(
      (shot) =>
        `${shot.number}. ${shot.title} — ${shot.duration}s\nCamera: ${shot.camera}\nAction: ${shot.action}\nLighting: ${shot.lighting}`
    )
    .join("\n\n");

  return [
    "DIRECTOR'S CUT AI PRO — PROMPT DOCTOR",
    "",
    `Mode: ${options.mode}`,
    `Format: ${options.format}`,
    `Duration: ${options.duration}s`,
    `Language: ${options.language}`,
    "",
    "ORIGINAL IDEA",
    options.input,
    "",
    "DIAGNOSIS",
    result.diagnosis,
    "",
    "IMPROVED PROMPT",
    result.improvedPrompt,
    "",
    "CAMERA DIRECTION",
    result.cameraDirection,
    "",
    "LIGHTING & MOOD",
    result.lightingMood,
    "",
    "NEGATIVE PROMPT",
    result.negativePrompt,
    "",
    "CONTINUITY NOTES",
    result.continuityNotes,
    "",
    "SHOT PLAN",
    shotText,
  ].join("\n");
}