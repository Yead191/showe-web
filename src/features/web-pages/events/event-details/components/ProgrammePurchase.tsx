"use client"

import * as React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Loader2, CheckCircle2, ChevronRight, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getImageUrl } from "@/lib/getImageUrl"
import { nextFetch } from "@/helpers/next-fetch/NextFetch"
import { revalidateTags } from "@/helpers/next-fetch/revalidateTags"
import AuthModal from "@/features/auth/components/AuthModal"
import { EventProgramme } from "../types"

interface ProgrammePurchaseProps {
    eventId: string
    programme?: EventProgramme
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user?: any
}

export function ProgrammePurchase({ eventId, programme, user }: ProgrammePurchaseProps) {
    const router = useRouter()
    const [checking, setChecking] = React.useState(true)
    const [isPurchased, setIsPurchased] = React.useState(false)
    const [isBuying, setIsBuying] = React.useState(false)
    const [showAuth, setShowAuth] = React.useState(false)
    // Remember that a purchase was requested before login, so we can resume it.
    const pendingPurchaseRef = React.useRef(false)

    // On mount, check whether the current user already owns this programme.
    React.useEffect(() => {
        if (!programme?._id) {
            setChecking(false)
            return
        }
        let active = true
        ;(async () => {
            try {
                const res = await nextFetch(`/programmes/${programme._id}`, {
                    method: "GET",
                    cache: "no-store",
                })
                if (active) setIsPurchased(!!res?.success)
            } catch {
                if (active) setIsPurchased(false)
            } finally {
                if (active) setChecking(false)
            }
        })()
        return () => {
            active = false
        }
    }, [programme?._id])

    if (!programme?._id) return null

    const priceLabel = programme.price_pence
        ? `£${(programme.price_pence / 100).toFixed(2)}`
        : null

    const doPurchase = async () => {
        setIsBuying(true)
        try {
            // Purchase is tied to the event, not the programme id.
            const res = await nextFetch(`/event/purchase/${eventId}`, {
                method: "POST",
            })

            const checkoutUrl =
                typeof res?.data === "string" ? res.data : res?.data?.url

            if (res?.success && checkoutUrl) {
                // Revalidate the event page so ownership state is fresh on return.
                await revalidateTags([`event-${eventId}`])
                window.location.href = checkoutUrl
                return
            }

            toast.error(res?.message || "Could not start the purchase. Please try again.", {
                id: "buy-programme",
            })
        } catch {
            toast.error("Something went wrong starting the purchase.", {
                id: "buy-programme",
            })
        } finally {
            setIsBuying(false)
        }
    }

    const handleBuyClick = () => {
        // Require login before purchasing.
        if (!user) {
            pendingPurchaseRef.current = true
            setShowAuth(true)
            return
        }
        doPurchase()
    }

    const handleLoginSuccess = () => {
        setShowAuth(false)
        if (pendingPurchaseRef.current) {
            pendingPurchaseRef.current = false
            // The auth cookie is set now, so the purchase request will be authorized.
            doPurchase()
        }
    }

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
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Programme</p>
                    <p className="text-sm font-black text-gray-900 leading-tight truncate">{programme.title}</p>
                    {priceLabel && !isPurchased && (
                        <p className="text-xs font-black text-[#F5A800]">{priceLabel}</p>
                    )}
                </div>
            </div>

            {/* ── Action ── */}
            {checking ? (
                <Button
                    disabled
                    className="w-full h-12 rounded-2xl bg-gray-100 text-gray-400 font-black hover:bg-gray-100"
                >
                    <Loader2 className="h-4 w-4 animate-spin" />
                </Button>
            ) : isPurchased ? (
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
                            Purchase Programme{priceLabel ? ` · ${priceLabel}` : ""}
                        </>
                    )}
                </Button>
            )}

            <AuthModal
                open={showAuth}
                onOpenChange={(open) => {
                    setShowAuth(open)
                    if (!open) pendingPurchaseRef.current = false
                }}
                onLoginSuccess={handleLoginSuccess}
                initialView="login"
                redirectOnSuccess={false}
            />
        </div>
    )
}
