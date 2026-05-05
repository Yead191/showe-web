import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Smartphone, Compass } from "lucide-react";

export default function LandingCTA() {
    return (
        <section className="py-10 lg:py-16 bg-white mb-16">
            <div className="container mx-auto px-4">
                <div className="relative bg-[#014B52] rounded-[3rem] px-6 py-16 md:p-20 overflow-hidden shadow-2xl shadow-[#014B52]/20 border border-white/10">
                    {/* Background Decorations */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F5A800]/20 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/3" />

                    {/* Pattern Overlay */}
                    <div className="absolute inset-0 bg-[url('/assets/images/pattern.png')] opacity-5 pointer-events-none mix-blend-overlay" />

                    <div className="relative z-10 text-center max-w-3xl mx-auto space-y-8">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-museo leading-tight tracking-tight">
                            Ready to elevate your <span className="text-[#F5A800]">event experience?</span>
                        </h2>
                        <p className="text-lg md:text-xl text-white/80 font-light max-w-2xl mx-auto leading-relaxed">
                            Don't just attend an event—immerse yourself in it. Start exploring today and discover a new way to connect with the performances you love.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                            <Button className="h-14 px-8 md:px-10 bg-[#F5A800] hover:bg-[#e09900] text-white font-bold text-lg rounded-2xl flex items-center gap-3 shadow-lg shadow-[#F5A800]/20 active:scale-95 transition-all w-full sm:w-auto">
                                <Smartphone size={22} />
                                Download App
                            </Button>
                            <Link href="/events" className="w-full sm:w-auto">
                                <Button className="h-14 px-8 md:px-10 border-white/20 text-white hover:bg-white/10 hover:border-white/40 hover:text-white font-bold text-lg rounded-2xl flex items-center gap-3 backdrop-blur-md bg-white/5 w-full transition-all">
                                    <Compass size={22} />
                                    Discover Events
                                </Button>
                            </Link>
                        </div>

                        <div className="pt-6 text-white/60 text-sm font-medium">
                            Or <Link href="/home" className="text-white hover:text-[#F5A800] underline underline-offset-4 transition-colors">visit our platform</Link> to explore more.
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
