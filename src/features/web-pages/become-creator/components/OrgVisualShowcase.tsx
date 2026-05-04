import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function OrgVisualShowcase() {
    return (
        <section className="relative py-24 bg-[#014B52] overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F5A800]/10 rounded-full blur-[120px] -mr-64 -mt-64" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Visual: Audience Emotion */}
                    <div className="w-full lg:w-1/2 relative group">
                        <div className="absolute inset-0 bg-linear-to-tr from-[#014B52] to-transparent z-10 opacity-40 rounded-3xl" />
                        <div className="relative h-[400px] md:h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                            {/* Placeholder for high-emotion audience image */}
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110" />

                            {/* In-image overlay info */}
                            <div className="absolute bottom-8 left-8 right-8 z-20 bg-black/60 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                                <p className="text-white text-lg font-light italic">
                                    "The engagement levels spiked by 40% in our first event using Showe. The audience loved the instant access."
                                </p>
                                <p className="text-[#F5A800] mt-3 font-bold">— Festival Director, London</p>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="lg:w-1/2 text-white">
                        <h2 className="text-4xl md:text-6xl font-bold font-museo mb-8 leading-tight">
                            Build <span className="text-[#F5A800]">Connection</span>, Not Just Programs.
                        </h2>
                        <p className="text-xl text-white/80 font-light leading-relaxed mb-10">
                            At the heart of every great event is a human connection. Our platform removes the barriers of paper and static PDF files, allowing your audience to immerse themselves in the experience.
                        </p>

                        <div className="grid grid-cols-2 gap-8 mb-12">
                            <div>
                                <div className="text-4xl font-bold text-[#F5A800] mb-2">98%</div>
                                <div className="text-sm text-white/60 uppercase tracking-widest">User Satisfaction</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-[#F5A800] mb-2">350+</div>
                                <div className="text-sm text-white/60 uppercase tracking-widest">Venues Worldwide</div>
                            </div>
                        </div>

                        <Link href="/organisation-register">
                            <Button className="h-14 px-10 bg-[#F5A800] hover:bg-[#e09900] text-[#014B52] text-lg font-bold rounded-xl transition-all shadow-xl hover:shadow-[#F5A800]/20">
                                Start Your Transformation
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
