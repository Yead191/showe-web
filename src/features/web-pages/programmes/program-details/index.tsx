"use client"
import React, { useState, useRef, useEffect, useCallback, forwardRef } from "react";
import { useRouter } from "next/navigation";
import { pdfjs, Document, Page } from "react-pdf";
import HTMLFlipBook from "react-pageflip";
import { ChevronLeft, ChevronRight, X, Download, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Set up the worker for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface ProgramDetailsPageProps {
    book: string;
}

// ── Sub-component for individual pages ───────────────────────────────────────
const PDFPage = forwardRef<HTMLDivElement, { pageNumber: number; book: string; width: number }>(
    ({ pageNumber, book, width }, ref) => {
        return (
            <div className="bg-white shadow-inner overflow-hidden flex items-center justify-center h-full" ref={ref}>
                <Page
                    pageNumber={pageNumber}
                    width={width}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    className="max-w-full"
                    loading={<div className="w-full h-full bg-white flex items-center justify-center text-gray-200">Loading...</div>}
                />
            </div>
        );
    }
);
PDFPage.displayName = "PDFPage";

export default function ProgramDetailsPage({ book }: ProgramDetailsPageProps) {
    const router = useRouter();
    const [numPages, setNumPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [scale, setScale] = useState(1);
    const [loading, setLoading] = useState(true);
    const bookRef = useRef<any>(null);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
        setLoading(false);
    };

    const prevPage = () => {
        bookRef.current?.pageFlip().prevPage();
    };

    const nextPage = () => {
        bookRef.current?.pageFlip().nextPage();
    };

    const onPage = useCallback((e: any) => {
        setCurrentPage(e.data);
    }, []);

    return (
        <div className="relative w-full h-screen bg-[#020617] overflow-hidden flex flex-col items-center select-none text-white font-sans">
            {/* ── Starfield Background ── */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1e293b] via-[#020617] to-[#020617]" />
                {/* Random Stars */}
                {[...Array(100)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute bg-white rounded-full opacity-30 animate-pulse"
                        style={{
                            width: Math.random() * 2 + "px",
                            height: Math.random() * 2 + "px",
                            top: Math.random() * 100 + "%",
                            left: Math.random() * 100 + "%",
                            animationDelay: Math.random() * 5 + "s",
                            animationDuration: Math.random() * 3 + 2 + "s",
                        }}
                    />
                ))}
            </div>

            {/* ── Header / Navbar ── */}
            <div className="relative z-50 w-full flex items-center justify-between px-6 py-4 bg-black/40 backdrop-blur-md border-b border-white/5">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group"
                >
                    <div className="p-1.5 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                        <X size={18} />
                    </div>
                    <span className="text-sm font-medium tracking-wide">Back to Programmes</span>
                </button>

                <div className="flex items-center gap-4">
                    <div className="flex items-center bg-white/5 rounded-full px-3 py-1.5 gap-3 border border-white/10">
                        <button onClick={() => setScale(s => Math.max(0.4, s - 0.1))} className="hover:text-blue-400 transition-colors"><ZoomOut size={16} /></button>
                        <span className="text-xs font-mono w-10 text-center">{Math.round(scale * 100)}%</span>
                        <button onClick={() => setScale(s => Math.min(1.5, s + 0.1))} className="hover:text-blue-400 transition-colors"><ZoomIn size={16} /></button>
                    </div>

                    <a
                        href={book}
                        download
                        className="p-2 rounded-full bg-blue-600 hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20"
                        title="Download PDF"
                    >
                        <Download size={18} />
                    </a>
                </div>
            </div>

            {/* ── Main Book Area ── */}
            <div className="flex-1 w-full flex items-center justify-center p-8 relative overflow-hidden">
                {loading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-[#020617]">
                        <div className="w-12 h-12 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mb-4" />
                        <p className="text-blue-400/70 text-sm font-medium animate-pulse">Loading Grimoire...</p>
                    </div>
                )}

                <div className="relative transition-transform duration-300 ease-out" style={{ transform: `scale(${scale})` }}>
                    <Document
                        file={book}
                        onLoadSuccess={onDocumentLoadSuccess}
                        loading={null}
                    >
                        {/* @ts-ignore */}
                        <HTMLFlipBook
                            width={450}
                            height={650}
                            size="stretch"
                            minWidth={315}
                            maxWidth={1000}
                            minHeight={400}
                            maxHeight={1533}
                            maxShadowOpacity={0.6}
                            showCover={true}
                            onFlip={onPage}
                            className="book-container shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)]"
                            ref={bookRef}
                            style={{ margin: '0 auto' }}
                            useMouseEvents={true}
                            swipeDistance={30}
                            showPageCorners={true}
                            disableFlipByClick={false}
                            flippingTime={1000}
                            usePortrait={false}
                            startPage={0}
                            drawShadow={true}
                        >
                            {Array.from(new Array(numPages), (el, index) => (
                                <PDFPage key={index} pageNumber={index + 1} book={book} width={450} />
                            ))}
                        </HTMLFlipBook>
                    </Document>
                </div>
            </div>

            {/* ── Navigation Arrows ── */}
            <div className="absolute inset-y-0 left-4 flex items-center">
                <button
                    onClick={prevPage}
                    disabled={currentPage === 0}
                    className="p-4 rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all disabled:opacity-0 disabled:pointer-events-none group backdrop-blur-sm"
                >
                    <ChevronLeft size={48} className="group-active:scale-90 transition-transform" />
                </button>
            </div>
            <div className="absolute inset-y-0 right-4 flex items-center">
                <button
                    onClick={nextPage}
                    disabled={currentPage >= numPages - 1}
                    className="p-4 rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all disabled:opacity-0 disabled:pointer-events-none group backdrop-blur-sm"
                >
                    <ChevronRight size={48} className="group-active:scale-90 transition-transform" />
                </button>
            </div>

            {/* ── Bottom Controls ── */}
            <div className="relative z-50 flex flex-col items-center gap-4 mb-8">
                <div className="px-6 py-2.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl flex items-center gap-4">
                    <span className="text-xs font-bold text-white/30 tracking-[0.2em]">PROGRESS</span>
                    <div className="flex items-baseline gap-1">
                        <span className="text-lg font-bold text-blue-400">{currentPage + 1}</span>
                        <span className="text-xs text-white/20">/</span>
                        <span className="text-sm text-white/40">{numPages}</span>
                    </div>
                </div>
            </div>

            {/* ── Progress Bar ── */}
            <div className="w-full h-1 bg-white/5 relative z-50">
                <div
                    className="absolute h-full bg-linear-to-r from-blue-600 via-indigo-500 to-purple-600 transition-all duration-500"
                    style={{ width: `${((currentPage + 1) / (numPages || 1)) * 100}%` }}
                />
            </div>

            <style jsx global>{`
                .stf__parent {
                    background-color: transparent !important;
                }
                .stf__wrapper {
                    border-radius: 4px;
                }
                /* Realistic Spine Effect */
                .book-container {
                    perspective: 2000px;
                }
                .stf__block {
                   background-color: white;
                }
                canvas {
                    max-width: 100% !important;
                    height: auto !important;
                }
                /* Add a subtle spine line in the middle when two pages are shown */
                .stf__parent::after {
                    content: "";
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 50%;
                    width: 2px;
                    background: linear-gradient(to right, rgba(0,0,0,0.1), rgba(0,0,0,0.3), rgba(0,0,0,0.1));
                    z-index: 100;
                    pointer-events: none;
                }
            `}</style>
        </div>
    );
}