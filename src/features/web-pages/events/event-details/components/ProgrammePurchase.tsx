"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, CheckCircle2, ChevronRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getImageUrl } from "@/lib/getImageUrl";
import { nextFetch } from "@/helpers/next-fetch/NextFetch";
import { revalidateTags } from "@/helpers/next-fetch/revalidateTags";
import AuthModal from "@/features/auth/components/AuthModal";
import { EventProgramme } from "../types";

interface ProgrammePurchaseProps {
  eventId: string;
  programme?: EventProgramme;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user?: any;
  isPurchased?: boolean;
}

export function ProgrammePurchase({
  eventId,
  programme,
  user,
  isPurchased,
}: ProgrammePurchaseProps) {
  const router = useRouter();
  const [isBuying, setIsBuying] = React.useState(false);
  const [showAuth, setShowAuth] = React.useState(false);
  // Remember that a purchase was requested before login, so we can resume it.
  const pendingPurchaseRef = React.useRef(false);

  if (!programme?._id) return null;

  const pricePence = programme.price_pence ?? 0;
  const isFree = pricePence === 0;
  const priceLabel = isFree ? "Free" : `£${(pricePence / 100).toFixed(2)}`;

  const doPurchase = async () => {
    setIsBuying(true);
    try {
      // Purchase is tied to the event, not the programme id.
      const res = await nextFetch(`/event/purchase/${eventId}`, {
        method: "POST",
      });

      const checkoutUrl =
        typeof res?.data === "string" ? res.data : res?.data?.url;

      if (res?.success) {
        // Revalidate the event page and programmes so state is fresh
        await revalidateTags([`event-${eventId}`, "programmes"]);

        if (checkoutUrl) {
          window.location.href = checkoutUrl;
          return;
        }

        // For free programmes / direct purchase without checkout url, navigate to programmes
        toast.success(res?.message || "Programme claimed successfully!");
        router.push("/programmes");
        router.refresh();
        return;
      }

      toast.error(
        res?.message || "Could not start the purchase. Please try again.",
        {
          id: "buy-programme",
        },
      );
    } catch {
      toast.error("Something went wrong starting the purchase.", {
        id: "buy-programme",
      });
    } finally {
      setIsBuying(false);
    }
  };

  const handleBuyClick = () => {
    // Require login before purchasing.
    if (!user) {
      pendingPurchaseRef.current = true;
      setShowAuth(true);
      return;
    }
    doPurchase();
  };

  const handleLoginSuccess = () => {
    setShowAuth(false);
    if (pendingPurchaseRef.current) {
      pendingPurchaseRef.current = false;
      // The auth cookie is set now, so the purchase request will be authorized.
      doPurchase();
    }
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-[#014B52]/3 p-4 space-y-4">
      {/* ── Programme header ── */}
      <div className="flex items-center gap-3">
        <div className="relative h-14 w-14 rounded-xl overflow-hidden border border-gray-100 shrink-0 shadow-sm bg-gray-100">
          <Image
            src={getImageUrl(programme.cover_image)}
            alt={programme.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
            Programme
          </p>
          <p className="text-sm font-black text-gray-900 leading-tight truncate">
            {programme.title}
          </p>
          {priceLabel && !isPurchased && (
            <p className="text-xs font-black text-[#F5A800]">{priceLabel}</p>
          )}
        </div>
      </div>

      {/* ── Action ── */}
      {isPurchased ? (
        <Button
          onClick={() => router.push("/programmes")}
          className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          <CheckCircle2 className="h-5 w-5" />
          Purchased · View Programmes
          <ChevronRight className="h-4 w-4" />
        </Button>
      ) : (
        <Button
          onClick={handleBuyClick}
          disabled={isBuying}
          className="w-full h-12 bg-[#014B52] hover:bg-[#023a40] text-white font-black rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-[#014B52]/20"
        >
          {isBuying ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <BookOpen className="h-5 w-5" />
              {isFree ? "Get Free Programme" : `Purchase Programme · ${priceLabel}`}
            </>
          )}
        </Button>
      )}

      <AuthModal
        open={showAuth}
        onOpenChange={(open) => {
          setShowAuth(open);
          if (!open) pendingPurchaseRef.current = false;
        }}
        onLoginSuccess={handleLoginSuccess}
        initialView="login"
        redirectOnSuccess={false}
      />
    </div>
  );
}
