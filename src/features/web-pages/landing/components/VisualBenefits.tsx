import Image from 'next/image';
import { Layers, MousePointerClick, Bookmark } from 'lucide-react';

export default function VisualBenefits() {
    const benefits = [
        {
            icon: Layers,
            title: "Everything in one place",
            description: "No more juggling papers. Access schedules, interactive maps, cast bios, and exclusive director notes beautifully organized on your screen."
        },
        {
            icon: MousePointerClick,
            title: "Interactive experience",
            description: "Click through performer profiles, discover hidden stories, and engage with the event in real-time as the performance unfolds."
        },
        {
            icon: Bookmark,
            title: "Save and revisit anytime",
            description: "Build your personal event archive. Save your favorite programmes and relive the magic long after the curtain falls."
        }
    ];

    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                    {/* Left Side: Copy & Benefits */}
                    <div className="lg:w-1/2 space-y-12 order-2 lg:order-1">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold text-[#014B52] font-museo mb-6 leading-tight">
                                More than a <br />piece of paper.
                            </h2>
                            <p className="text-xl text-slate-600 font-light leading-relaxed">
                                Why settle for static text when you can explore the entire universe of the show? Experience events the modern way.
                            </p>
                        </div>

                        <div className="space-y-8">
                            {benefits.map((benefit, idx) => (
                                <div key={idx} className="flex gap-6 group">
                                    <div className="shrink-0 mt-1">
                                        <div className="w-12 h-12 rounded-xl bg-[#F5A800]/10 flex items-center justify-center text-[#F5A800] group-hover:bg-[#F5A800] group-hover:text-white transition-colors duration-300">
                                            <benefit.icon size={24} />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-slate-900 mb-2">{benefit.title}</h3>
                                        <p className="text-slate-600 leading-relaxed text-lg">{benefit.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Visual Mockup */}
                    <div className="lg:w-1/2 order-1 lg:order-2 w-full flex justify-center">
                        <div className="relative w-full max-w-[400px]">
                            {/* Decorative background shapes */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#014B52]/5 rounded-full blur-[80px] -z-10" />

                            {/* Phone Mockup */}
                            <div className="relative aspect-9/19 bg-white rounded-[3rem] border-8 border-slate-900 shadow-2xl shadow-[#014B52]/20 overflow-hidden">
                                {/* Top Notch */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-slate-900 rounded-b-xl z-20" />

                                {/* Placeholder for actual programme UI */}
                                <div className="absolute inset-0 bg-[#014B52]">
                                    <Image
                                        src="https://images.unsplash.com/photo-1540039155732-6761b3362248?auto=format&fit=crop&q=80&w=800"
                                        alt="Programme Visual"
                                        fill
                                        className="object-cover opacity-60"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-[#014B52] via-[#014B52]/80 to-transparent" />

                                    {/* Mock UI Elements */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6 space-y-4">
                                        <div className="w-16 h-1 bg-white/30 rounded-full mb-6" />
                                        <h4 className="text-white font-museo text-2xl font-bold">Romeo & Juliet</h4>
                                        <div className="flex gap-2">
                                            <div className="px-3 py-1 bg-white/20 rounded-full text-white text-xs font-medium backdrop-blur-md">Cast & Crew</div>
                                            <div className="px-3 py-1 bg-white/20 rounded-full text-white text-xs font-medium backdrop-blur-md">Schedule</div>
                                        </div>
                                        <div className="w-full h-24 bg-white/10 rounded-xl backdrop-blur-md mt-4 border border-white/20 p-4">
                                            <div className="w-1/2 h-3 bg-white/40 rounded-full mb-3" />
                                            <div className="w-3/4 h-2 bg-white/20 rounded-full mb-2" />
                                            <div className="w-2/3 h-2 bg-white/20 rounded-full" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating UI Elements */}
                            <div className="absolute top-20 -right-8 bg-white p-4 rounded-2xl shadow-xl shadow-black/5 animate-bounce" style={{ animationDuration: '3s' }}>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#F5A800]/20 flex items-center justify-center text-[#F5A800]">
                                        <Bookmark size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900">Saved!</p>
                                        <p className="text-xs text-slate-500">To your archive</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
