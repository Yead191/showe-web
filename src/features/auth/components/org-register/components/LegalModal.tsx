"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@radix-ui/react-scroll-area";

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "terms" | "privacy";
}

export function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
  const isTerms = type === "terms";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl bg-white p-6 rounded-2xl max-h-[85vh] flex flex-col sm:max-w-2xl">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-xl font-bold text-slate-900">
            {isTerms
              ? "SHOWE Organization Terms & Conditions"
              : "SHOWE Privacy Policy"}
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500">
            {isTerms
              ? "Last updated: 2026. Please review our platform usage and publisher terms."
              : "Last updated: 2026. How we handle and protect your organization and attendee data."}
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto pr-2 my-4 text-sm text-slate-600 space-y-4 max-h-[55vh] leading-relaxed">
          {isTerms ? (
            <>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <h4 className="font-semibold text-slate-900 mb-1">
                  1. Principal Seller Model
                </h4>
                <p>
                  As an event organizer or venue on SHOWE, you act as the
                  principal seller of all programmes, digital content, and
                  tickets published under your account. SHOWE acts solely as
                  your technology and distribution platform agent.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <h4 className="font-semibold text-slate-900 mb-1">
                  2. Subscription & Billing
                </h4>
                <p>
                  Subscriptions are billed in advance on a recurring monthly
                  cycle via Stripe. You may cancel or adjust your subscription
                  tier anytime through your organizer portal. Fees paid are
                  non-refundable for partial months once billed.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <h4 className="font-semibold text-slate-900 mb-1">
                  3. Content & Copyright
                </h4>
                <p>
                  You warrant that all texts, imagery, artist bios, and media
                  uploaded to your SHOWE programmes are properly licensed and do
                  not infringe third-party intellectual property rights.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <h4 className="font-semibold text-slate-900 mb-1">
                  4. Refunds & Disputes
                </h4>
                <p>
                  Refund policies for programme sales or ticketing sit with your
                  organization. Stripe processing fees and platform usage
                  charges may apply to processed refunds.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <h4 className="font-semibold text-slate-900 mb-1">
                  1. Data Collection & Processing
                </h4>
                <p>
                  We collect organizer information (organization name, contact
                  details, email, phone) to create and administer your account,
                  facilitate billing, and provide customer support.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <h4 className="font-semibold text-slate-900 mb-1">
                  2. Payment Security
                </h4>
                <p>
                  All payment card details are encrypted and securely handled
                  directly by Stripe. SHOWE does not store your full card number
                  or CVV on our servers.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <h4 className="font-semibold text-slate-900 mb-1">
                  3. Attendee & Analytics Privacy
                </h4>
                <p>
                  Attendee interactions, QR scans, and programme dwell times are
                  processed in aggregate to give you insights into audience
                  engagement while respecting user privacy rights under GDPR and
                  applicable data protection regulations.
                </p>
              </div>
            </>
          )}
        </div>

        <div className="pt-3 border-t flex justify-end">
          <Button
            onClick={onClose}
            className="bg-primary-600 hover:bg-[#01383d] text-white px-6 rounded-xl"
          >
            I Understand
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
