import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowRight, Camera, Film, Mail, Volume2 } from "lucide-react";
import SceneShotPlanner from "@/components/scene-shot-planner";
import { VIDEO_ENQUIRY_URL } from "@/lib/video-studio";

export const metadata: Metadata = {
  title: "Custom AI Video Production | Director's Cut AI Pro",
  description: "Custom AI video shaped around your brief. Explore real studio examples, then discuss your scene, camera direction, atmosphere and sound with us.",
  alternates: { canonical: "https://directors-cut-ai-pro.vercel.app/editor" },
  keywords: ["custom AI video", "AI video production", "creative studio", "Director's Cut AI Pro"],
  twitter: {
    card: "summary_large_image",
    title: "Your idea. Made into a film.",
    description: "Explore our AI video work and tell us what you want to create.",
    images: ["https://directors-cut-ai-pro.vercel.app/video-studio/compass.webp"],
  },
  openGraph: {
    title: "Your idea. Made into a film.",
    description: "Explore our AI video work and tell us what you want to create.",
    url: "https://directors-cut-ai-pro.vercel.app/editor",
    images: [{ url: "https://directors-cut-ai-pro.vercel.app/video-studio/compass.webp", width: 848, height: 480, alt: "A brass compass in warm window light" }],
  },
};

const examples = [
  {
    slug: "compass", number: "01", category: "DETAIL & STORY", title: "A small gesture. A cinematic moment.",
    description: "A hand closes a brass compass on a sunlit wooden table. A simple action becomes a quiet story through texture, light and framing.",
    direction: "Warm window light, an intimate close-up and one deliberate movement.",
    notice: "The interaction with the object and the atmosphere of the scene.",
    duration: "5 seconds", audio: false, width: 848, height: 480,
  },
  {
    slug: "matchday", number: "02", category: "CROWD & ATMOSPHERE", title: "The energy of matchday.",
    description: "Green and white flags rise above a packed football terrace. Crowd movement and stadium light give this short scene a sense of scale.",
    direction: "A lively stadium moment with waving flags and an energetic crowd.",
    notice: "Movement across the frame and the feeling of being in the stands.",
    duration: "4 seconds", audio: true, width: 864, height: 480,
  },
  {
    slug: "dragonfly-117", number: "03", category: "NATURE & MOTION", title: "A moment in nature.",
    description: "A red dragonfly rests on a rock in a close view of a natural setting.",
    direction: "Bring the dragonfly to life with gentle wing movement and a fixed camera.",
    notice: "The delicate wings, vivid colour and texture of the rock.",
    duration: "5 seconds", audio: false, width: 848, height: 480,
  },
  {
    slug: "dragonfly-118", number: "04", category: "NATURE & SOUND", title: "The same idea, with sound.",
    description: "A second interpretation of the dragonfly scene brings sound into the natural setting.",
    direction: "Explore subtle movement and sound around the same visual idea.",
    notice: "How the wings and surrounding details contribute to the scene.",
    duration: "5 seconds", audio: true, width: 864, height: 480,
  },
  {
    slug: "hawk", number: "05", category: "WILDLIFE & ACTION", title: "A still moment takes flight.",
    description: "A hawk perched beside an ivy-covered tree spreads its wings and takes flight. Sunlit foliage frames the movement as the bird leaves the branch.",
    direction: "Move from a quiet perch into flight while keeping the camera fixed.",
    notice: "The feather detail, unfolding wings and transition from stillness to motion.",
    duration: "5 seconds", audio: false, width: 848, height: 480,
  },
];

const capabilities = [
  { icon: Film, title: "Start with your idea", text: "Bring a written brief, a reference image or a scene you have in mind. We help turn it into a clear visual direction." },
  { icon: Camera, title: "Direct the scene", text: "Agree the subject, action, camera movement, lighting and mood. Build a single moment or plan a sequence of shots." },
  { icon: Volume2, title: "Shape the sound", text: "Discuss ambience, sound effects and spoken lines where the scene calls for them. Sound and delivery are agreed for each project." },
];

export default function VideoStudioPage() {
  return (
    <main id="top" className="min-h-screen bg-[#080a0c] text-white selection:bg-lime-300 selection:text-black">
      <a href="#work" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:p-4 focus:text-black">Skip to video examples</a>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <header className="flex flex-wrap items-center justify-between gap-5 border-b border-white/10 py-6">
          <Link href="/" className="text-sm font-bold tracking-tight">DIRECTOR&apos;S CUT <span className="text-lime-200">AI PRO</span></Link>
          <nav aria-label="Video studio navigation" className="flex items-center gap-5 text-sm text-gray-300 sm:gap-8">
            <a href="#work" className="hover:text-lime-200">Selected work</a>
            <a href="#process" className="hover:text-lime-200">Process</a>
            <a href={VIDEO_ENQUIRY_URL} className="inline-flex items-center gap-2 font-semibold text-lime-200">Let&apos;s talk <ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
          </nav>
        </header>
        <section className="grid gap-10 pb-14 pt-16 sm:pt-24 lg:grid-cols-[1.25fr_1fr] lg:items-end lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-lime-200">Independent studio · Custom AI video</p>
            <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-[1.04] tracking-[-0.05em] sm:text-7xl lg:text-8xl">Your idea.<br /><span className="text-gray-400">Made into</span><br />a film.</h1>
          </div>
          <div className="max-w-lg lg:pb-2">
            <p className="text-lg leading-8 text-gray-300 sm:text-xl">A product moment. A story worth telling. The atmosphere you want people to feel.</p>
            <p className="mt-4 leading-7 text-gray-400">We create AI video around your brief — from the first visual direction to motion, sound and the final edit.</p>
            <div className="mt-7 flex flex-wrap items-center gap-5">
              <a href={VIDEO_ENQUIRY_URL} className="inline-flex min-h-12 items-center gap-3 rounded-full bg-lime-200 px-6 font-semibold text-[#10130c] transition hover:bg-lime-100">Tell us your idea <ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
              <a href="#work" className="inline-flex min-h-12 items-center gap-2 text-sm font-medium text-white hover:text-lime-200">Explore the work <ArrowDown className="h-4 w-4" aria-hidden="true" /></a>
            </div>
          </div>
        </section>
        <section id="work" aria-labelledby="work-title" className="scroll-mt-8 pb-20">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-3 border-t border-white/10 pt-7">
            <h2 id="work-title" className="text-sm font-semibold uppercase tracking-[0.18em]">Selected work</h2>
            <p className="text-sm text-gray-400">Real studio examples · AI-generated video</p>
          </div>
          <div className="space-y-12 sm:space-y-16">
            {examples.map((example) => (
              <article key={example.slug} className="grid gap-6 lg:grid-cols-[1.65fr_1fr] lg:items-center lg:gap-10">
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#141719]">
                  <video controls playsInline preload="none" poster={`/video-studio/${example.slug}.webp`} width={example.width} height={example.height} aria-label={example.title} aria-describedby={`${example.slug}-description`} className="block h-auto w-full">
                    <source src={`/video-studio/${example.slug}.mp4`} type="video/mp4" />
                    Your browser does not support video playback. <a href={`/video-studio/${example.slug}.mp4`}>Open the video</a>.
                  </video>
                  <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-xs text-gray-400"><span>{example.duration} · {example.audio ? "Audio included" : "Silent scene"}</span><a href={`/video-studio/${example.slug}.mp4`} className="text-gray-300 underline decoration-gray-600 underline-offset-4 hover:text-lime-200">Open video</a></div>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.15em] text-lime-200"><span className="mr-3 text-gray-500">{example.number}</span>{example.category}</p>
                  <h3 className="mt-4 max-w-md text-3xl font-medium leading-tight tracking-tight sm:text-4xl">{example.title}</h3>
                  <p id={`${example.slug}-description`} className="mt-4 leading-7 text-gray-400">{example.description}</p>
                  <dl className="mt-6 space-y-4 border-t border-white/10 pt-5 text-sm leading-6">
                    <div><dt className="font-medium text-gray-200">Creative direction</dt><dd className="mt-1 text-gray-400">{example.direction}</dd></div>
                    <div><dt className="font-medium text-gray-200">What to notice</dt><dd className="mt-1 text-gray-400">{example.notice}</dd></div>
                  </dl>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-8 text-sm leading-6 text-gray-500">These short examples show our studio explorations. Your project&apos;s length, format and sound are agreed around your brief.</p>
        </section>
        <section aria-labelledby="possibilities-title" className="border-y border-white/10 py-14 sm:py-20">
          <p className="text-xs uppercase tracking-[0.2em] text-lime-200">Built around your brief</p>
          <h2 id="possibilities-title" className="mt-4 max-w-2xl text-3xl font-medium tracking-tight sm:text-5xl">One clear idea.<br />Many creative possibilities.</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {capabilities.map(({ icon: Icon, title, text }) => <div key={title}><Icon className="h-6 w-6 text-lime-200" strokeWidth={1.5} aria-hidden="true" /><h3 className="mt-5 text-xl font-medium">{title}</h3><p className="mt-3 leading-7 text-gray-400">{text}</p></div>)}
          </div>
        </section>
        <section id="process" aria-labelledby="process-title" className="scroll-mt-8 py-14 sm:py-20">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
            <div><p className="text-xs uppercase tracking-[0.2em] text-lime-200">How we work</p><h2 id="process-title" className="mt-4 text-3xl font-medium tracking-tight sm:text-5xl">From a brief<br />to a finished scene.</h2></div>
            <ol className="grid gap-x-8 gap-y-9 sm:grid-cols-2">
              {[
                ["01", "Tell us the story", "Share the purpose, audience, references and where the video will be used."],
                ["02", "Agree the direction", "We define the look, key action, shot plan and scope before production."],
                ["03", "Create and refine", "Review the scenes with us and refine the motion, detail and sound."],
                ["04", "Prepare the delivery", "Receive the approved edit in the format agreed for your project."],
              ].map(([number, title, text]) => <li key={number}><span className="text-xs text-lime-200">{number}</span><h3 className="mt-3 text-lg font-medium">{title}</h3><p className="mt-2 text-sm leading-7 text-gray-400">{text}</p></li>)}
            </ol>
          </div>
        </section>
        <section aria-labelledby="enquiry-title" className="rounded-3xl bg-lime-200 px-6 py-10 text-[#10130c] sm:px-10 sm:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em]">Let&apos;s make something</p>
          <div className="mt-5 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-xl"><h2 id="enquiry-title" className="text-4xl font-semibold tracking-tight sm:text-6xl">What do you want<br />to bring to life?</h2><p className="mt-5 leading-7 text-[#35402b]">Send a few lines about your idea, the intended use and your timeline. Add a reference if you have one.</p></div>
            <a href={VIDEO_ENQUIRY_URL} className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#10130c] px-6 text-sm font-semibold text-lime-100 transition hover:bg-[#29331e]"><Mail className="h-4 w-4" aria-hidden="true" />sinisa@secus.hr<ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
          </div>
        </section>
        <section className="py-12" aria-label="Optional planning tool">
          <details id="shot-planner" className="group rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-7">
            <summary className="cursor-pointer text-lg font-medium marker:text-lime-200">Want to outline your scenes? <span className="ml-2 text-sm font-normal text-gray-400">Open the Scene &amp; Shot Planner</span></summary>
            <p className="mb-6 mt-4 max-w-2xl text-sm leading-6 text-gray-400">Use this planning tool to organise your ideas and export a brief. Video production is arranged directly with the studio.</p>
            <SceneShotPlanner />
          </details>
        </section>
        <footer className="flex flex-wrap justify-between gap-4 border-t border-white/10 py-7 text-xs text-gray-500"><p>Director&apos;s Cut AI Pro · Independent creative studio</p><div className="flex gap-5"><Link href="/prompt-doctor" className="hover:text-white">Prompt Studio</Link><Link href="/contact" className="hover:text-white">Contact</Link><Link href="/privacy" className="hover:text-white">Privacy</Link></div></footer>
      </div>
    </main>
  );
}
