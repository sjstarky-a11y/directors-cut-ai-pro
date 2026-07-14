"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PiLoginButton } from "@/components/pi-login-button";
import { PiPaymentModal } from "@/components/pi-payment-modal";
import { usePiAuth } from "@/contexts/pi-auth-context";

const plans = [
  {
    name: "Basic",
    price: 10,
    description: "Perfect for getting started",
    features: [
      "720p export quality",
      "10 GB cloud storage",
      "Basic AI effects",
      "Email support",
    ],
  },
  {
    name: "Pro",
    price: 25,
    description: "For professional creators",
    features: [
      "4K export quality",
      "100 GB cloud storage",
      "Advanced AI effects",
      "Priority support",
      "Custom branding",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: 50,
    description: "For teams and studios",
    features: [
      "8K export quality",
      "Unlimited cloud storage",
      "All AI features",
      "24/7 dedicated support",
      "Team collaboration",
      "API access",
    ],
  },
];

export default function PricingPage() {
  const { isAuthenticated } = usePiAuth();

  const [
    isChecklistPaymentOpen,
    setIsChecklistPaymentOpen,
  ] = useState(false);

  const startChecklistPayment = () => {
    if (!isAuthenticated) {
      alert(
        "Please authenticate with Pi before starting the Test-Pi payment."
      );

      return;
    }

    setIsChecklistPaymentOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <header className="flex items-center justify-between mb-12">
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold">
                DC
              </span>
            </div>

            <h1 className="text-2xl font-bold text-white">
              Director&apos;s Cut AI Pro
            </h1>
          </Link>

          <PiLoginButton />
        </header>

        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="text-4xl font-bold text-white mb-4">
            Pi Testnet Payment
          </h2>

          <p className="text-xl text-gray-400">
            Complete one verified User-to-App
            transaction for the Developer Portal
            checklist.
          </p>
        </div>

        <div className="max-w-xl mx-auto mb-14 p-6 rounded-xl border border-purple-500/40 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
          <div className="flex items-start justify-between gap-6 mb-5">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Checklist Test Payment
              </h3>

              <p className="text-gray-400">
                One Testnet transaction processed
                through server approval and completion.
              </p>
            </div>

            <div className="text-right shrink-0">
              <div className="text-3xl font-bold text-white">
                1
              </div>

              <div className="text-purple-300">
                Test-π
              </div>
            </div>
          </div>

          <Button
            onClick={startChecklistPayment}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            Start Test-Pi Payment
          </Button>
        </div>

        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-3">
            Future Plans
          </h2>

          <p className="text-gray-400">
            Commercial subscriptions remain disabled
            until their real features and persistent
            entitlements are implemented.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto opacity-70">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative p-6 rounded-lg border ${
                plan.popular
                  ? "bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/50"
                  : "bg-gray-800/50 border-gray-700"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-xs font-semibold text-white">
                  Planned
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {plan.name}
                </h3>

                <p className="text-gray-400 text-sm mb-4">
                  {plan.description}
                </p>

                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-white">
                    {plan.price}
                  </span>

                  <span className="text-xl text-purple-400">
                    π
                  </span>

                  <span className="text-gray-400">
                    /month
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-gray-300"
                  >
                    <span className="text-purple-400 mt-0.5">
                      ✓
                    </span>

                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                disabled
                className="w-full bg-gray-700"
              >
                Coming later
              </Button>
            </div>
          ))}
        </div>
      </div>

      <PiPaymentModal
        isOpen={isChecklistPaymentOpen}
        onClose={() =>
          setIsChecklistPaymentOpen(false)
        }
        productId="checklist_test"
        amount={1}
        planName="Checklist Test Payment"
        planDescription="Developer Portal Testnet validation transaction"
        onSuccess={(payment) => {
          alert(
            `Test-Pi payment completed successfully.\nPayment ID: ${payment.identifier}`
          );
        }}
      />
    </div>
  );
}