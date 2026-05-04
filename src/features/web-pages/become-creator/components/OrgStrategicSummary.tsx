import { TrendingUp, Users, Zap, Database, Leaf } from "lucide-react";

export default function OrgStrategicSummary() {
    const metrics = [
        {
            icon: <TrendingUp className="w-10 h-10 text-[#F5A800]" />,
            title: "Unlock Revenue",
            description: "Directly monetize your programs through ticket sales, sponsorships, and donation integrations."
        },
        {
            icon: <Users className="w-10 h-10 text-[#F5A800]" />,
            title: "Drive Engagement",
            description: "Transform passive readers into active participants with interactive content and real-time updates."
        },
        {
            icon: <Zap className="w-10 h-10 text-[#F5A800]" />,
            title: "Peak Efficiency",
            description: "Update your entire audience instantly. No more reprint costs or outdated physical materials."
        },
        {
            icon: <Database className="w-10 h-10 text-[#F5A800]" />,
            title: "Actionable Data",
            description: "Gain deep insights into audience behavior, preferences, and conversion rates."
        },
        {
            icon: <Leaf className="w-10 h-10 text-[#F5A800]" />,
            title: "Sustainability",
            description: "Eliminate paper waste and reduce your organization's environmental footprint significantly."
        }
    ];

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    <div className="lg:w-1/2">
                        <h2 className="text-4xl md:text-5xl font-bold text-[#014B52] mb-8 font-museo leading-tight">
                            The Strategic Edge Your Organization Needs.
                        </h2>
                        <p className="text-xl text-slate-600 font-light leading-relaxed mb-10">
                            Stop wondering why engagement is low or costs are high. Showe provides a flexible, data-driven platform that solves the core challenges of modern event production.
                        </p>
                        
                        <div className="space-y-4">
                            <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border-l-4 border-[#F5A800]">
                                <div className="font-bold text-[#014B52] text-lg">“Will it make money?”</div>
                                <div className="text-slate-600">— Yes. Through diversified digital revenue streams.</div>
                            </div>
                            <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border-l-4 border-[#F5A800]">
                                <div className="font-bold text-[#014B52] text-lg">“Is it easy to implement?”</div>
                                <div className="text-slate-600">— Minutes. Not days. No coding required.</div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {metrics.map((item, idx) => (
                            <div key={idx} className={`p-8 rounded-2xl transition-all hover:translate-y-[-5px] shadow-sm hover:shadow-xl border border-slate-100 ${idx === 0 ? "md:col-span-2 bg-[#014B52] text-white" : "bg-white"}`}>
                                <div className="mb-4">{item.icon}</div>
                                <h3 className={`text-xl font-bold mb-3 ${idx === 0 ? "text-white" : "text-slate-900"}`}>{item.title}</h3>
                                <p className={idx === 0 ? "text-white/80" : "text-slate-600"}>{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
