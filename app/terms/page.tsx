import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

export const metadata = {
  title: "Terms of Service | Director's Cut AI Pro",
  description: "Terms of Service for Director's Cut AI Pro.",
};

export default function TermsPage() {
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
            <FileText className="h-6 w-6" />
          </div>

          <div>
            <h1 className="text-3xl font-bold">Terms of Service</h1>
            <p className="mt-1 text-sm text-gray-400">
              Effective date: November 17, 2026
            </p>
          </div>
        </div>

        <div className="space-y-8 leading-7 text-gray-300">
          <section>
            <h2 className="text-xl font-semibold text-white">
              1. Acceptance of these terms
            </h2>
            <p className="mt-2">
              By opening or using Director&apos;s Cut AI Pro (the
              &quot;Service&quot;) you agree to these Terms of Service and to
              the{" "}
              <Link
                href="/privacy"
                className="font-medium text-purple-300 hover:text-purple-200"
              >
                Privacy Policy
              </Link>
              . If you do not agree, please do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              2. About the Service
            </h2>
            <p className="mt-2">
              Director&apos;s Cut AI Pro is a video pre-production workspace
              for improving prompts, planning scenes and organizing camera,
              lighting and continuity notes. The Service is currently in a
              public preview. Features may change, be limited or be removed
              at any time, and the Service is provided without a guarantee
              of availability.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              3. Pi Network sign-in and accounts
            </h2>
            <p className="mt-2">
              Sign-in is provided through Pi Network authentication. Pi
              Network is a separate third-party platform with its own terms
              and rules, which also apply to your use of Pi features. You are
              responsible for the security of your Pi account. The Service
              never asks for your Pi Wallet passphrase or private key, and
              you should never share them with anyone.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              4. Acceptable use
            </h2>
            <p className="mt-2">
              You agree not to use the Service to break the law, infringe the
              rights of others, create or promote harmful or abusive content,
              attempt to disrupt or gain unauthorized access to the Service or
              its infrastructure, or misuse the Service in a way that could
              harm other users.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              5. Your content and generated results
            </h2>
            <p className="mt-2">
              Prompts, scene plans and notes you create remain yours.
              Projects saved by the Prompt Doctor and Scene Planner are
              stored locally in your browser, so you are responsible for
              exporting or backing up anything you want to keep. Suggestions
              and results produced by the Service are provided as creative
              aids; you are responsible for checking them and for how you use
              them, including any rights and permissions needed for your own
              projects.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              6. Downloadable software
            </h2>
            <p className="mt-2">
              Downloadable tools offered alongside the Service, such as
              MediaForge Prompt Studio, are provided under their own
              license. The current public preview is intended for personal,
              non-commercial evaluation. Please read the license that comes
              with each download.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              7. Payments
            </h2>
            <p className="mt-2">
              Commercial plans are not yet available. Any payment
              functionality currently present is for testing only. If paid
              features are introduced, they will be paid in Pi through the Pi
              Network payment system, and the price, what is included and
              the refund conditions will be shown before you confirm a
              payment. Pi transactions are recorded on the blockchain and
              cannot be reversed by this Service, so please review every
              payment carefully before you approve it in the Pi Wallet.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              8. Custom video projects
            </h2>
            <p className="mt-2">
              Requests for custom AI video production are discussed
              individually through the contact page. Scope, delivery,
              price and payment for such work are agreed separately in
              writing before work begins and are not part of the public
              preview.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              9. Disclaimer of warranties
            </h2>
            <p className="mt-2">
              The Service is provided &quot;as is&quot; and &quot;as
              available&quot;. To the extent permitted by law, no warranty is
              given that the Service will be uninterrupted, error-free or
              suitable for a particular purpose.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              10. Limitation of liability
            </h2>
            <p className="mt-2">
              To the extent permitted by applicable law, the operator of the
              Service is not liable for indirect or consequential losses,
              loss of data or loss of profit arising from your use of the
              Service. Nothing in these terms limits any liability that
              cannot be limited by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              11. Changes to these terms
            </h2>
            <p className="mt-2">
              These terms may be updated when the Service changes. The
              effective date at the top will be updated when material
              changes are published. Continued use of the Service after a
              change means you accept the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              12. Contact
            </h2>
            <p className="mt-2">
              Questions about these terms can be sent through the public
              developer contact page.
            </p>

            <Link
              href="/contact"
              className="mt-3 inline-block font-medium text-purple-300 hover:text-purple-200"
            >
              Open Contact Developer page
            </Link>
          </section>
        </div>
      </article>
    </main>
  );
}
