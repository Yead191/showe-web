import Link from "next/link";
import { ArrowRight, Ticket, Tent } from "lucide-react";

export default function MainLandingSplit() {
    return (
        <section className="bg-slate-50 py-12 md:py-24">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-6 md:gap-12 max-w-6xl mx-auto">

                    {/* User Card */}
                    <Link href="/for-users" className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col h-full min-h-[400px]">
                        <div className="absolute inset-0 bg-linear-to-br from-[#014B52]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="p-10 flex flex-col items-center text-center grow justify-center relative z-10">
                            <div className="w-20 h-20 bg-[#014B52]/10 text-[#014B52] rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                                <Ticket size={40} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-3xl font-bold text-slate-900 mb-4">Attending an <span className="font-museo">Event?</span></h3>
                            <p className="text-slate-600 mb-8 max-w-sm">
                                Discover concerts, workshops, and exclusive gatherings, and be seamlessly directed to official venue ticketing.
                            </p>
                            <div className="mt-auto inline-flex items-center gap-2 text-[#014B52] font-semibold group-hover:gap-4 transition-all">
                                Explore Showe <ArrowRight size={20} />
                            </div>
                        </div>
                        {/* Decorative element */}
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#014B52]/5 rounded-full blur-3xl" />
                    </Link>

                    {/* Organization Card */}
                    <Link href="/become-creator" className="group relative overflow-hidden rounded-2xl bg-[#014B52] text-white shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col h-full min-h-[400px]">
                        <div className="absolute inset-0 bg-linear-to-br from-[#F5A800]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="p-10 flex flex-col items-center text-center grow justify-center relative z-10">
                            <div className="w-20 h-20 bg-white/10 text-[#F5A800] rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                                <Tent size={40} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-4">Running an<span className="font-museo"> Event?</span></h3>
                            <p className="text-white/80 mb-8 max-w-sm">
                                Create interactive digital programmes, engage your audience, and streamline your event experience.
                            </p>
                            <div className="mt-auto inline-flex items-center gap-2 text-[#F5A800] font-semibold group-hover:gap-4 transition-all">
                                Become a Creator <ArrowRight size={20} />
                            </div>
                        </div>
                        {/* Decorative element */}
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#F5A800]/20 rounded-full blur-3xl" />
                    </Link>

                </div>
            </div>
        </section>
    );
}
