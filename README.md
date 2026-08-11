# Director's Cut AI Pro

**AI video pre-production tools for creators.**

Director's Cut AI Pro is a Pi Network-oriented video pre-production project for prompt improvement, scene planning, shot organization and practical AI-video workflows.

Its first stable local AI product is **MediaForge Prompt Studio V1.0**.

> **Fix the prompt before you generate.**

---

## MediaForge Prompt Studio V1.0

MediaForge Prompt Studio is a local AI workspace for video creators, filmmakers, advertisers and AI-video users.

Its flagship tool, **Prompt Doctor**, is designed around **semantic fidelity**: preserve the user's stated subject, action, setting, continuity and explicit constraints, then add useful production direction only where appropriate.

### Prompt Doctor workflows

- **Improve** — strengthen rough or incomplete prompts while preserving the original concept.
- **Diagnose** — identify ambiguity, missing direction, conflicts and weak prompt structure.
- **Cinematic** — add controlled cinematic direction for composition, camera, atmosphere and visual storytelling.
- **Commercial** — use a fidelity-first deterministic workflow designed to avoid unsupported invention of branding, product materials, colors, benefits, props or story elements.
- **Shot List** — turn a scene idea into practical shot-by-shot production direction.

### Supported formats

- 16:9
- 9:16
- 1:1

### V1 runtime

- **Product:** MediaForge Prompt Studio
- **Flagship tool:** Prompt Doctor
- **Release:** `1.0.0`
- **Docker image:** `aerialcroatia/mediaforge-prompt-doctor:1.0.0`
- **Stable tag:** `aerialcroatia/mediaforge-prompt-doctor:latest`
- **Validated model:** `ai/qwen2.5:3B-Q4_K_M`
- **Output language:** English
- **Runtime:** Pi SoloHost + Docker Model Runner
- **Health endpoint:** `/health`

---

## Product structure

Director's Cut AI Pro is the wider public project and pre-production platform.

### MediaForge Prompt Studio
**Available · V1.0**

The stable local AI workspace distributed through Pi SoloHost.

### Prompt Doctor
**Flagship Studio tool**

Diagnoses and repairs rough AI-video prompts while preserving the creator's original intent.

### Scene & Shot Planner
**Preview**

Explores scene structure, shot order, duration and production notes.

### AI Video Editor
**Future phase**

Planned workspace for media analysis, continuity, editing guidance and AI-assisted video creation.

---

## Current project features

The wider Director's Cut AI Pro project includes:

- Pi Network authentication
- MediaForge Prompt Studio
- Prompt Doctor
- Camera, lighting and continuity guidance
- Automatic shot-plan generation
- Prompt Doctor to Scene Planner transfer
- Editable scenes and shot order
- Local browser project storage
- TXT and JSON export
- Scene & Shot Planner preview
- AI Video Editor roadmap

---

## Local AI and privacy

**MediaForge Prompt Studio V1 runs locally through Pi SoloHost and Docker Model Runner.**

Prompt generation in the local V1 runtime is processed on the user's own computer and does not require an external hosted AI provider.

The public Director's Cut AI Pro web application also contains browser-based project features, Pi authentication and preview modules. Users should separately review the privacy behavior of Pi Desktop, Docker and any optional third-party services they enable.

Environment secrets are not stored in this repository.

---

## Live project

### Public web app

- **Web:** https://directors-cut-ai-pro.vercel.app
- **PiNet:** https://directorscutaipr0154.pinet.com

### Pi SoloHost

- **App:** MediaForge Prompt Studio
- **App ID:** `sjstarky/mediaforge-prompt-studio`
- **Category:** Utility
- **Status:** Listed in Discover

### Docker Hub

- **Runtime image:** https://hub.docker.com/r/aerialcroatia/mediaforge-prompt-doctor

### Stable image

```text
aerialcroatia/mediaforge-prompt-doctor:1.0.0
```

---

## Run MediaForge Prompt Studio locally

MediaForge Prompt Studio V1 is distributed as a containerized local application intended for Pi SoloHost / Docker Model Runner environments.

The validated V1 model is:

```text
ai/qwen2.5:3B-Q4_K_M
```

The application uses Docker Model Runner for local inference.

Performance depends on the user's local hardware.

---

## Release notes — V1.0.0

First stable MediaForge Prompt Studio runtime release.

### Included

- Final Prompt Studio UI
- Prompt Doctor
- Improve mode
- Diagnose mode
- Cinematic mode
- Commercial fidelity mode
- Shot List mode
- 16:9, 9:16 and 1:1 format selection
- Docker Model Runner integration
- Qwen 2.5 3B validated runtime
- Local health endpoint
- Pi SoloHost-compatible package
- Docker Hub release image
- Clean-install validation
- End-to-end local inference validation

### Commercial fidelity mode

Commercial mode uses a deterministic fidelity-first path designed to avoid unsupported invention of:

- branding
- product materials
- colors
- product benefits
- props
- story elements

---

## Development

The public Director's Cut AI Pro web application is built with:

- Next.js
- React
- TypeScript
- Tailwind CSS

The MediaForge Prompt Studio local runtime uses:

- Python
- FastAPI
- Uvicorn
- Docker
- Docker Model Runner
- Qwen 2.5 3B

---

## Repository

This repository contains the public Director's Cut AI Pro web application and project documentation.

The stable MediaForge Prompt Studio V1 runtime is currently distributed through Docker Hub using:

```text
aerialcroatia/mediaforge-prompt-doctor:1.0.0
```

The Docker repository name reflects the Prompt Doctor runtime component, while the public SoloHost product is **MediaForge Prompt Studio**.

---

## Status

**Director's Cut AI Pro:** active development  
**MediaForge Prompt Studio:** stable V1.0 release  
**Prompt Doctor:** flagship Studio tool  
**Scene & Shot Planner:** preview  
**AI Video Editor:** future phase
