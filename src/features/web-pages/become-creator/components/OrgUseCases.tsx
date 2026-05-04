import { Music, Landmark, Presentation, Star } from "lucide-react";

export default function OrgUseCases() {
    const cases = [
        {
            icon: <Music className="w-8 h-8" />,
            title: "Music Festivals",
            desc: "Live lineup updates, interactive site maps, and instant artist discovery for thousands of fans."
        },
        {
            icon: <Landmark className="w-8 h-8" />,
            title: "Theatres & Venues",
            desc: "Replace physical programs, enable digital concessions, and collect audience feedback in real-time."
        },
        {
            icon: <Presentation className="w-8 h-8" />,
            title: "Conferences",
            desc: "Streamlined speaker bios, live session scheduling, and networking tools for corporate attendees."
        },
        {
            icon: <Star className="w-8 h-8" />,
            title: "Exclusive Galas",
            desc: "Premium, bespoke digital experiences for high-profile guests with integrated donation flows."
        }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-[#014B52] mb-6 font-museo">
                        Versatility at Scale.
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        From intimate gallery openings to massive multi-day festivals, Showe adapts to your organization's specific needs.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {cases.map((useCase, idx) => (
                        <div key={idx} className="group p-8 rounded-2xl bg-slate-50 hover:bg-[#014B52] transition-all duration-500 border border-slate-100">
                            <div className="w-16 h-16 bg-[#014B52] text-[#F5A800] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#F5A800] group-hover:text-[#014B52] transition-colors duration-500">
                                {useCase.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 group-hover:text-white mb-4 transition-colors">
                                {useCase.title}
                            </h3>
                            <p className="text-slate-600 group-hover:text-white/80 transition-colors">
                                {useCase.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
