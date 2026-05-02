
import { Target, Compass } from "lucide-react"

export default function MissionVission() {
    return (
        <section className="py-24 bg-gray-50 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#F5A800]/5 rounded-full blur-3xl -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#014B52]/5 rounded-full blur-3xl -ml-48 -mb-48" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-sm font-bold text-[#F5A800] uppercase tracking-[0.3em] mb-3">Our Purpose</h2>
                            <h3 className="text-3xl md:text-4xl font-bold text-[#014B52] font-museo">
                                Empowering Engagement Through Innovation
                            </h3>
                        </div>
                        <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                            <p>
                                At SHOWE, we believe that an event program is more than just a list of times and names.
                                It's a gateway to discovery, a tool for connection, and a canvas for artists to tell their stories.
                            </p>
                            <p>
                                Our platform replaces static paper with dynamic digital ecosystems. Whether it's a
                                local theatre performance, a global music festival, or a community ceremony,
                                we make it interactive, accessible, and unforgettable.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="w-14 h-14 bg-[#F5A800]/10 rounded-2xl flex items-center justify-center mb-6">
                                <Target className="text-[#F5A800] h-7 w-7" />
                            </div>
                            <h4 className="text-xl font-bold text-[#014B52] mb-3">Our Mission</h4>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                To democratize high-end event technology, making interactive experiences accessible to every organizer and attendee.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 sm:mt-12">
                            <div className="w-14 h-14 bg-[#014B52]/10 rounded-2xl flex items-center justify-center mb-6">
                                <Compass className="text-[#014B52] h-7 w-7" />
                            </div>
                            <h4 className="text-xl font-bold text-[#014B52] mb-3">Our Vision</h4>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                To become the global standard for event interaction, where every live moment is enhanced by digital discovery.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
