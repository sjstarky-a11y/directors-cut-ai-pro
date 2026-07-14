"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  piNetwork,
  type PiPayment,
  type PiProductId,
} from "@/lib/pi-network";

interface PiPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: PiProductId;
  amount: number;
  planName: string;
  planDescription: string;
  onSuccess?: (payment: PiPayment) => void;
}

export function PiPaymentModal({
  isOpen,
  onClose,
  productId,
  amount,
  planName,
  planDescription,
  onSuccess,
}: PiPaymentModalProps) {
  const [isProcessing, setIsProcessing] =
    useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      const payment =
        await piNetwork.createPayment(productId);

      console.log(
        "Pi payment completed:",
        payment
      );

      onSuccess?.(payment);
      onClose();
    } catch (error) {
      console.error("Pi payment failed:", error);

      const message =
        error instanceof Error
          ? error.message
          : "Unknown payment error.";

      alert(`Payment failed: ${message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open && !isProcessing) {
          onClose();
        }
      }}
    >
      <DialogContent className="sm:max-w-md bg-gray-900 border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-white">
            Confirm Test-Pi Payment
          </DialogTitle>

          <DialogDescription className="text-gray-400">
            This transaction is performed on Pi
            Testnet for Developer Portal validation.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg">
            <div>
              <div className="font-semibold text-white">
                {planName}
              </div>

              <div className="text-sm text-gray-400">
                {planDescription}
              </div>
            </div>

            <div className="text-2xl font-bold text-white">
              {amount} Test-π
            </div>
          </div>

          <div className="text-xs text-gray-500 text-center">
            The payment is not successful until the
            Pi transaction and server completion are
            both verified.
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isProcessing}
            className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
          >
            Cancel
          </Button>

          <Button
            onClick={handlePayment}
            disabled={isProcessing}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {isProcessing
              ? "Processing..."
              : "Pay 1 Test-π"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}