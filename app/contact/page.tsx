import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  MessageSquare,
} from "lucide-react";

export const metadata = {
  title: "Contact Developer | Director's Cut AI Pro",
  description:
    "Developer contact information for Director's Cut AI Pro.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950 px-4 py-8 text-white">
      <article className="mx-auto max-w-3xl rounded-2xl border border-gray-800 bg-gray-900/80 p-6 shadow-xl sm:p-10">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-purple-300 hover:text-purple-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Director&apos;s Cut AI Pro
        </Link>

        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-300">
            <MessageSquare className="h-6 w-6" />
          </div>

          <div>
            <h1 className="text-3xl font-bold">Contact Developer</h1>
            <p className="mt-1 text-gray-400">
              Director&apos;s Cut AI Pro
            </p>
          </div>
        </div>

        <div className="space-y-6 text-gray-300">
          <section className="rounded-xl border border-gray-800 bg-gray-950/70 p-5">
            <p className="text-sm uppercase tracking-wide text-gray-500">
              Developer
            </p>
            <p className="mt-2 text-lg font-semibold text-white">
              SJS / sjstarky-a11y
            </p>
          </section>

          <section className="rounded-xl border border-gray-800 bg-gray-950/70 p-5">
            <div className="flex items-center gap-3">
              <Github className="h-5 w-5 text-purple-300" />

              <div>
                <h2 className="font-semibold text-white">
                  GitHub repository
                </h2>
                <p className="text-sm text-gray-400">
                  Source code, documentation and issue reporting.
                </p>
              </div>
            </div>

            <a
              href="https://github.com/sjstarky-a11y/directors-cut-ai-pro"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 font-medium text-purple-300 hover:text-purple-200"
            >
              Open public repository
              <ExternalLink className="h-4 w-4" />
            </a>
          </section>

          <section className="rounded-xl border border-gray-800 bg-gray-950/70 p-5">
            <h2 className="font-semibold text-white">
              Support and bug reports
            </h2>

            <p className="mt-2 leading-7 text-gray-400">
              For application support, bug reports, privacy questions or
              feature suggestions, open a public issue in the GitHub
              repository.
            </p>

            <a
              href="https://github.com/sjstarky-a11y/directors-cut-ai-pro/issues"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 font-medium text-purple-300 hover:text-purple-200"
            >
              Open GitHub Issues
              <ExternalLink className="h-4 w-4" />
            </a>
          </section>

          <section className="rounded-xl border border-gray-800 bg-gray-950/70 p-5">
            <h2 className="font-semibold text-white">
              Privacy requests
            </h2>

            <p className="mt-2 leading-7 text-gray-400">
              Do not include wallet passphrases, private keys, API keys,
              passwords or other sensitive information in a public issue.
            </p>

            <Link
              href="/privacy"
              className="mt-4 inline-block font-medium text-purple-300 hover:text-purple-200"
            >
              Read the Privacy Policy
            </Link>
          </section>
        </div>
      </article>
    </main>
  );
}