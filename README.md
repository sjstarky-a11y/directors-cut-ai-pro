# Director’s Cut AI Pro

Public website for MediaForge Prompt Studio, built with Next.js, React and Tailwind.

## Live pages

- [Home](https://directors-cut-ai-pro.vercel.app/)
- [Custom AI video: selected work and enquiries](https://directors-cut-ai-pro.vercel.app/editor)
- [MediaForge: workflow, setup and downloads](https://directors-cut-ai-pro.vercel.app/prompt-doctor)
- [v0.4 preview release](https://github.com/sjstarky-a11y/mediaforge-prompt-studio/releases/tag/v0.4-preview)
- [Current application guides](https://github.com/sjstarky-a11y/mediaforge-prompt-studio/tree/main/docs)

## Current scope

Windows/Linux packages select CPU, NVIDIA or Intel runtimes. Intel Arc Pro B60 text
and Fast/Quality Proof were verified on Windows/WSL2. Native Linux GPU installation
needs hardware validation. Croatian output is experimental; all results need review.
Hero uses a separate CPU/NVIDIA service. This preview has no macOS package.

The website provides product information and downloads. AI inference runs in the
separate local application. Public release URLs are centralized in
`lib/mediaforge-release.ts`; no private model configurations belong on this website.

## Video studio

The `/editor` page presents custom AI video services and three approved studio
examples. Enquiries open the visitor's email app; no enquiry is submitted by the
website. The optional Scene & Shot Planner remains available at the bottom.
Contact links are centralized in `lib/video-studio.ts`.

Public clips and posters live in `public/video-studio/`. Use neutral filenames,
H.264/AAC MP4 with fast-start playback, and WebP posters. Export clean media without
source prompts, generation metadata or private workflow details. Never commit
source job files. Keep playback user-initiated and update the visible descriptions
when replacing clips. These are studio explorations, not client testimonials.

## Development and deployment

```text
pnpm install --frozen-lockfile
pnpm dev
pnpm build
```

Vercel project: `directors-cut-ai-pro`, team `sjstarky-9531s-projects`, production
branch `main`. Review changes through a pull request and check the Vercel preview
before merging. Keep server credentials in Vercel environment settings; see
[SECURITY-NOTE.md](SECURITY-NOTE.md).
