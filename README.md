# Director's Cut AI Pro

AI video pre-production tools for creators and the public home of **MediaForge Prompt Studio**.

## MediaForge Prompt Studio v0.2 Public Preview

MediaForge is a private local AI workspace that helps creators move from a rough idea to a stronger, reviewed prompt for AI video generation.

Its current workflow includes:

- **Prompt Doctor** for Improve, Diagnose, Cinematic, Commercial and Shot List workflows.
- **Fidelity Guard** to protect the original subject, action, setting and explicit constraints.
- **Visual Proof Frame** for a fast local SDXL scene preview.
- **Model Adapter** for Generic Video, Runway Gen-4.5, Veo 3.1 and Kling VIDEO 3.0.
- Automatic **CPU or NVIDIA** runtime selection with optional Developer controls.
- Reproducible Windows and Linux release packages with SHA-256 checksums.

## Download

- [v0.2 release and notes](https://github.com/sjstarky-a11y/mediaforge-prompt-studio/releases/tag/v0.2)
- [Windows x64 ZIP](https://github.com/sjstarky-a11y/mediaforge-prompt-studio/releases/download/v0.2/MediaForge-Prompt-Studio-v0.2-Windows-x64.zip)
- [Linux x86_64 archive](https://github.com/sjstarky-a11y/mediaforge-prompt-studio/releases/download/v0.2/MediaForge-Prompt-Studio-v0.2-Linux-x86_64.tar.gz)
- [SHA-256 checksums](https://github.com/sjstarky-a11y/mediaforge-prompt-studio/releases/download/v0.2/SHA256SUMS-v0.2.txt)

The release archives do not bundle AI models. The first start downloads the required local models, including a Visual Proof model of several gigabytes. Prompt Doctor remains usable while the image model is prepared.

## Current validation

| Platform | Prompt runtime | Visual Proof runtime | Status |
| --- | --- | --- | --- |
| Windows without NVIDIA | CPU / llama.cpp | CPU / OpenVINO SDXL INT8 | Tested |
| Windows GTX 1050 4 GB | NVIDIA CUDA | CUDA low-memory / Diffusers SDXL | Tested end-to-end |
| Ubuntu 24.04 WSL2 | CPU / llama.cpp | CPU / OpenVINO SDXL INT8 | Tested |
| Native Linux NVIDIA | CUDA with CPU fallback | CUDA / Diffusers SDXL | Included; broader hardware validation pending |

macOS support is planned for a later milestone.

## Local AI and privacy

The downloadable Studio processes prompts and proof frames through services running on the user's own computer. It does not require a hosted AI provider. Users should separately review the privacy behavior of Docker, Pi Desktop and any optional third-party video services they choose to use.

## Website

- [Director's Cut AI Pro](https://directors-cut-ai-pro.vercel.app/)
- [MediaForge Prompt Doctor, documentation and downloads](https://directors-cut-ai-pro.vercel.app/prompt-doctor)

The website also includes a lightweight browser-local Prompt Doctor demo. The complete local AI workflow is available in the downloadable v0.2 application.

## Development

The website uses Next.js, React, TypeScript and Tailwind CSS.

```bash
pnpm install
pnpm dev
```

Production check:

```bash
pnpm build
```

## Project status

- **Director's Cut AI Pro:** active development
- **MediaForge Prompt Studio:** v0.2 Public Preview
- **Prompt Doctor:** available
- **Scene & Shot Planner:** preview
- **AI Video Editor:** future phase
