import { CheckCircle2, Clock, BarChart3, Wallet } from "lucide-react";

export default function OrgBenefits() {
    const benefits = [
        {
            icon: <Clock className="w-6 h-6 text-[#F5A800]" />,
            title: "Distribute in Minutes",
            text: "Go from concept to live program in record time. Our intuitive workshop tools handle the heavy lifting."
        },
        {
            icon: <CheckCircle2 className="w-6 h-6 text-[#F5A800]" />,
            title: "Interactive Content",
            text: "Engage users with videos, links, bios, and schedules that they can interact with, not just read."
        },
        {
            icon: <Wallet className="w-6 h-6 text-[#F5A800]" />,
            title: "Revenue Generation",
            text: "Integrate ticketing, merchandise, and donation buttons directly into your digital experience."
        },
        {
            icon: <BarChart3 className="w-6 h-6 text-[#F5A800]" />,
            title: "Real-time Insights",
            text: "Monitor engagement levels as they happen. Know exactly what your audience cares about most."
        }
    ];

    return (
        <section className="py-24 bg-slate-50">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#014B52] mb-6 font-museo">
                            Tools Designed for Growth.
                        </h2>
                        <p className="text-lg text-slate-600">
                            We've built Showe around the four pillars of successful event management.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {benefits.map((benefit, idx) => (
                            <div key={idx} className="flex gap-6 p-8 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                                <div className="shrink-0 w-12 h-12 bg-[#014B52]/5 rounded-full flex items-center justify-center">
                                    {benefit.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">{benefit.title}</h3>
                                    <p className="text-slate-600 leading-relaxed">{benefit.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
