"use client"

import React, { useState } from "react"
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle,
    DialogDescription 
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Check, Ticket, ChevronRight, Info } from "lucide-react"
import { Event } from "@/constants/events/mock-event-details"
import { cn } from "@/lib/utils"

interface TicketSelectionModalProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    event: Event
}

export function TicketSelectionModal({ isOpen, onOpenChange, event }: TicketSelectionModalProps) {
    const [selectedTier, setSelectedTier] = useState<string | null>(null)

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-[calc(100%-2rem)] md:max-w-[700px] p-0 overflow-hidden border-none bg-white rounded-3xl shadow-2xl animate-in fade-in zoom-in-95 duration-300">
                {/* ── Compact Header Section ── */}
                <div className="bg-[#014B52] p-6 md:p-8 text-white relative overflow-hidden">
                    <div className="absolute -top-6 -right-6 opacity-10">
                        <Ticket className="h-32 w-32 rotate-12" />
                    </div>
                    <DialogHeader className="relative z-10 space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="bg-[#F5A800] h-1 w-4 rounded-full" />
                            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#F5A800]">Ticket Selection</p>
                        </div>
                        <DialogTitle className="text-xl md:text-2xl font-black tracking-tight leading-tight">{event.title}</DialogTitle>
                        <DialogDescription className="text-white/60 font-medium text-xs">
                            Select your preferred ticket tier to continue.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                {/* ── Optimized Tiers List ── */}
                <div className="p-4 md:p-6 space-y-4 max-h-[45vh] overflow-y-auto custom-scrollbar bg-gray-50/30">
                    {event.tickets.tiers.map((tier) => (
                        <div 
                            key={tier.id}
                            onClick={() => !tier.sold_out && setSelectedTier(tier.id)}
                            className={cn(
                                "relative p-4 md:p-5 rounded-2xl border-2 transition-all cursor-pointer group",
                                selectedTier === tier.id 
                                    ? "border-[#014B52] bg-[#014B52]/5" 
                                    : "border-gray-100 bg-white hover:border-gray-200 shadow-sm hover:shadow-md",
                                tier.sold_out && "opacity-60 cursor-not-allowed"
                            )}
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="space-y-3 flex-1">
                                    <div className="flex items-center gap-2.5">
                                        <div className={cn(
                                            "h-4 w-4 rounded-full border-2 flex items-center justify-center transition-all",
                                            selectedTier === tier.id 
                                                ? "border-[#014B52] bg-[#014B52]" 
                                                : "border-gray-300"
                                        )}>
                                            {selectedTier === tier.id && <Check className="h-2.5 w-2.5 text-white" />}
                                        </div>
                                        <h3 className="text-sm md:text-base font-black text-gray-900 tracking-tight">{tier.name}</h3>
                                        {tier.quantity_remaining < 20 && !tier.sold_out && (
                                            <span className="bg-red-50 text-red-500 text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded shadow-sm">
                                                Only {tier.quantity_remaining} Left
                                            </span>
                                        )}
                                    </div>
                                    
                                    <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                                        {tier.perks.map((perk, idx) => (
                                            <div key={idx} className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500">
                                                <div className="h-3.5 w-3.5 rounded-full bg-[#F5A800]/10 flex items-center justify-center shrink-0">
                                                    <Check className="h-2 w-2 text-[#F5A800]" />
                                                </div>
                                                {perk}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                <div className="text-left sm:text-right space-y-0.5 shrink-0">
                                    <p className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">${tier.price.toFixed(0)}</p>
                                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Per Ticket</p>
                                </div>
                            </div>

                            {tier.sold_out && (
                                <div className="absolute inset-0 bg-white/60 flex items-center justify-center backdrop-blur-[1px] rounded-2xl">
                                    <p className="bg-gray-900 text-white text-[9px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-lg">
                                        Sold Out
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* ── Compact Footer ── */}
                <div className="p-5 md:p-6 bg-white border-t border-gray-100">
                    <div className="flex items-center gap-2 text-gray-400 mb-5">
                        <Info className="h-3.5 w-3.5 text-[#F5A800]" />
                        <p className="text-[9px] font-bold uppercase tracking-widest leading-none pt-0.5">Max {event.tickets.max_per_order} tickets per order</p>
                    </div>
                    <Button 
                        disabled={!selectedTier}
                        className="w-full h-12 md:h-14 bg-[#014B52] hover:bg-[#023a40] text-white font-black text-xs md:text-sm rounded-xl transition-all flex items-center justify-center gap-2 group shadow-lg shadow-[#014B52]/10 disabled:opacity-50"
                    >
                        Proceed to Checkout
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
