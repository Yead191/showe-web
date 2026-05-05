import { Ticket, ScanLine, Sparkles } from "lucide-react";

export default function HowItWorksProcess() {
    const steps = [
        {
            icon: Ticket,
            title: "Attend",
            description: "Head to your favorite concert, theatre, or sporting event and spot the Showe QR code."
        },
        {
            icon: ScanLine,
            title: "Scan",
            description: "Simply point your phone camera at the code. No app downloads or sign-ups needed to start."
        },
        {
            icon: Sparkles,
            title: "Immerse",
            description: "Dive straight into the digital programme. Explore stories, cast details, and interactive content."
        }
    ];

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 text-center">
                <div className="max-w-2xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#014B52] font-museo mb-4">
                        Three steps to magic.
                    </h2>
                    <p className="text-xl text-slate-500 font-light">
                        Is it easy? Absolutely. Here is how you connect with the show in seconds.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 relative max-w-5xl mx-auto">
                    {/* Connecting line for desktop */}
                    <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-linear-to-r from-transparent via-[#F5A800]/50 to-transparent" />

                    {steps.map((step, idx) => (
                        <div key={idx} className="relative flex flex-col items-center group">
                            <div className="w-24 h-24 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-200/50 flex items-center justify-center mb-8 relative z-10 group-hover:-translate-y-2 transition-transform duration-300">
                                <div className="absolute inset-0 bg-[#014B52]/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <step.icon className="w-10 h-10 text-[#014B52]" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3">{step.title}</h3>
                            <p className="text-slate-500 leading-relaxed max-w-xs">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
