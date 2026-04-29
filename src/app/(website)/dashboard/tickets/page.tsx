"use client"

import React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, QrCode, Download, ExternalLink } from "lucide-react"

const MOCK_TICKETS = [
    {
        id: "TKT-2024-001",
        event: "The Phantom of the Opera",
        date: "May 15, 2026",
        time: "19:30",
        venue: "Grand Opera House",
        seat: "Section B, Row 4, Seat 12",
        status: "Active",
        color: "#014B52"
    },
    {
        id: "TKT-2024-002",
        event: "Jazz Night with Luna Ray",
        date: "June 02, 2026",
        time: "20:00",
        venue: "The Blue Room",
        seat: "Section A, Table 5",
        status: "Upcoming",
        color: "#F5A800"
    }
]

export default function TicketsPage() {
    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* ── Header ── */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">Your Tickets</h1>
                    <p className="text-gray-500 font-medium">Access your active bookings and entry codes</p>
                </div>
                <Button variant="outline" className="rounded-2xl h-11 px-6 border-gray-200 text-xs font-black uppercase tracking-widest gap-2 hover:bg-gray-50 transition-all">
                    <Calendar size={14} />
                    Past Bookings
                </Button>
            </div>

            {/* ── Tickets List ── */}
            <div className="grid grid-cols-1 gap-6">
                {MOCK_TICKETS.map((ticket) => (
                    <div key={ticket.id} className="group relative bg-white border border-gray-100 rounded-[24px] md:rounded-[32px] overflow-hidden hover:shadow-2xl hover:shadow-black/5 transition-all duration-500">
                        <div className="flex flex-col md:flex-row">
                            
                            {/* Left Section (Main Info) */}
                            <div className="flex-1 p-6 md:p-8 space-y-4 md:space-y-6">
                                <div className="flex items-center justify-between">
                                    <Badge className={`rounded-full px-3 md:px-4 py-0.5 md:py-1 text-[9px] md:text-[10px] font-black uppercase tracking-widest border-none ${
                                        ticket.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                                    }`}>
                                        {ticket.status}
                                    </Badge>
                                    <span className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest">{ticket.id}</span>
                                </div>
                                
                                <div>
                                    <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-2">{ticket.event}</h3>
                                    <div className="flex flex-wrap gap-3 md:gap-4">
                                        <div className="flex items-center gap-1.5 text-[11px] md:text-xs font-bold text-gray-500">
                                            <Calendar className="h-3.5 w-3.5 text-[#014B52]" />
                                            {ticket.date} at {ticket.time}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[11px] md:text-xs font-bold text-gray-500">
                                            <MapPin className="h-3.5 w-3.5 text-[#014B52]" />
                                            {ticket.venue}
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 md:pt-6 border-t border-gray-50 flex items-center justify-between">
                                    <div className="space-y-1">
                                        <p className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Your Seat</p>
                                        <p className="text-xs md:text-sm font-black text-gray-900">{ticket.seat}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="icon" className="h-9 w-9 md:h-10 md:w-10 rounded-xl bg-gray-50 text-gray-500 hover:text-[#014B52] hover:bg-white border border-transparent hover:border-gray-100">
                                            <Download size={16} />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-9 w-9 md:h-10 md:w-10 rounded-xl bg-gray-50 text-gray-500 hover:text-[#014B52] hover:bg-white border border-transparent hover:border-gray-100">
                                            <ExternalLink size={16} />
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Right Section (QR Area) */}
                            <div className="md:w-64 bg-gray-50/50 p-6 md:p-8 flex flex-col items-center justify-center gap-3 md:gap-4 border-t md:border-t-0 md:border-l border-gray-100">
                                <div className="relative p-2 md:p-3 bg-white rounded-2xl md:rounded-3xl shadow-sm group-hover:scale-105 transition-transform duration-500">
                                    <QrCode size={100} className="text-[#014B52] md:hidden" />
                                    <QrCode size={120} className="text-[#014B52] hidden md:block" />
                                    <div className="absolute inset-0 bg-[#014B52]/5 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <p className="text-[9px] md:text-[10px] font-black text-[#014B52] uppercase tracking-[0.2em] animate-pulse">Scan at Entrance</p>
                            </div>

                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State Help */}
            <div className="text-center p-12 bg-gray-50/30 rounded-[40px] border border-dashed border-gray-200">
                <p className="text-sm font-bold text-gray-400 mb-2">Can't find your ticket?</p>
                <button className="text-xs font-black text-[#014B52] hover:text-[#F5A800] transition-colors uppercase tracking-widest underline underline-offset-4">
                    Import from Email
                </button>
            </div>
        </div>
    )
}
