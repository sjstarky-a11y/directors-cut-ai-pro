# Director’s Cut AI Pro

Public website for MediaForge Prompt Studio, built with Next.js, React and Tailwind.

## Live pages

- [Home](https://directors-cut-ai-pro.vercel.app/)
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
