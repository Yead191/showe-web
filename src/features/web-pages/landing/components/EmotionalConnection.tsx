import Image from 'next/image';
import { Heart, Sparkles, Share2 } from 'lucide-react';

export default function EmotionalConnection() {
    return (
        <section className="relative py-24 md:py-32 bg-slate-50 overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#F2A900]/5 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#014B52]/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Left Side: Emotional Collage */}
                    <div className="relative h-[600px] hidden md:block">
                        {/* Main Image */}
                        <div className="absolute left-0 top-1/2 -translate-y-3/5 w-[70%] h-[80%] rounded-[2rem] overflow-hidden border border-slate-200 shadow-2xl z-10 group">
                            <div className="absolute inset-0 bg-[#014B52]/10 group-hover:bg-transparent transition-colors duration-700 z-10" />
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540039155732-6761b3362248?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" />
                        </div>

                        {/* Secondary Image Top Right */}
                        <div className="absolute right-0 top-[10%] w-[55%] h-[40%] rounded-3xl overflow-hidden border border-slate-200 shadow-2xl z-20 group">
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=600')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" />
                        </div>

                        {/* Secondary Image Bottom Right */}
                        <div className="absolute right-[5%] bottom-[10%] w-[45%] h-[35%] rounded-3xl overflow-hidden border border-slate-200 shadow-[0_0_40px_rgba(0,0,0,0.08)] z-20 group bg-white flex items-center justify-center p-6">
                            <div className="text-center">
                                <Heart className="w-10 h-10 text-[#F2A900] mx-auto mb-3 animate-pulse" />
                                <p className="text-slate-800 font-medium italic">"The memory lives on."</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Copy */}
                    <div className="space-y-10">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#014B52]/5 border border-[#014B52]/10 text-[#F2A900] text-sm font-bold tracking-wider uppercase">
                                <Sparkles size={16} /> More Than a Programme
                            </div>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-museo text-[#014B52] leading-[1.1]">
                                Keep the Magic <span className="text-[#F2A900]">Alive.</span>
                            </h2>
                            <p className="text-xl text-slate-600 font-light leading-relaxed">
                                Every show, every concert, every match is a story. Showe lets you take that story home. Don't let the memories fade when the lights come up.
                            </p>
                        </div>

                        <div className="space-y-8 pt-4">
                            <div className="flex gap-4 items-start">
                                <div className="mt-1 bg-[#014B52]/10 p-3 rounded-full text-[#014B52] border border-[#014B52]/20">
                                    <Heart size={24} className="text-[#014B52]" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Feel the Connection</h3>
                                    <p className="text-slate-600 leading-relaxed">Dive deep into the lives of the performers. Understand their journey and feel a deeper connection to the art you love.</p>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start">
                                <div className="mt-1 bg-[#F2A900]/10 p-3 rounded-full text-[#F2A900] border border-[#F2A900]/20">
                                    <Share2 size={24} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Share the Experience</h3>
                                    <p className="text-slate-600 leading-relaxed">Loved a specific moment or a cast member's background? Save your favorite profiles and share them with fellow fans instantly.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
