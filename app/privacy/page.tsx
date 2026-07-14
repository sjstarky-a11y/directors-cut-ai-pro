import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Director's Cut AI Pro",
  description:
    "Privacy Policy for Director's Cut AI Pro.",
};

export default function PrivacyPage() {
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
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300">
            <ShieldCheck className="h-6 w-6" />
          </div>

          <div>
            <h1 className="text-3xl font-bold">Privacy Policy</h1>
            <p className="mt-1 text-sm text-gray-400">
              Effective date: July 15, 2026
            </p>
          </div>
        </div>

        <div className="space-y-8 leading-7 text-gray-300">
          <section>
            <h2 className="text-xl font-semibold text-white">
              1. About this application
            </h2>
            <p className="mt-2">
              Director&apos;s Cut AI Pro is a video pre-production
              workspace for improving prompts, planning scenes and
              organizing camera, lighting and continuity notes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              2. Pi Network authentication
            </h2>
            <p className="mt-2">
              When you sign in with Pi Network, the application receives
              your Pi user identifier, username and an authentication
              access token. The token is sent securely to the application
              backend and verified through the official Pi Network API.
            </p>
            <p className="mt-2">
              The application does not request or receive your Pi Wallet
              passphrase, private key or account password.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              3. Prompt and project data
            </h2>
            <p className="mt-2">
              The current Prompt Doctor processes your prompt locally in
              your browser. Prompt text is not sent to an external AI
              provider.
            </p>
            <p className="mt-2">
              Projects saved through the Prompt Doctor or Scene Planner
              are stored in your browser&apos;s local storage. This data
              remains on the device and browser where it was created
              unless you manually export or delete it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              4. Payments
            </h2>
            <p className="mt-2">
              If Pi payments are introduced or initiated, payment
              identifiers and transaction information may be processed
              to approve and verify the transaction. Wallet passphrases
              and private keys are never collected by this application.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              5. Hosting and technical data
            </h2>
            <p className="mt-2">
              The application is hosted using third-party infrastructure.
              Hosting providers may process standard technical data such
              as IP address, browser type, request time and diagnostic
              logs for security and service operation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              6. Data sharing
            </h2>
            <p className="mt-2">
              Personal data is not sold to advertisers. Information is
              shared only when required to operate authentication,
              hosting, security or payment functionality, or when
              required by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              7. Your choices
            </h2>
            <p className="mt-2">
              You can remove locally saved projects by clearing the
              browser&apos;s site data. You may also stop using Pi
              authentication by leaving the application or revoking
              access through available Pi Network account controls.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              8. Contact
            </h2>
            <p className="mt-2">
              Privacy questions and data-related requests can be submitted
              through the public developer contact page.
            </p>

            <Link
              href="/contact"
              className="mt-3 inline-block font-medium text-purple-300 hover:text-purple-200"
            >
              Open Contact Developer page
            </Link>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              9. Policy updates
            </h2>
            <p className="mt-2">
              This policy may be updated when application functionality
              changes. The effective date shown at the top will be updated
              when material changes are published.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}