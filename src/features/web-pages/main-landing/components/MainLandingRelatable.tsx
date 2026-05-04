import { Sparkles, ShieldCheck, Globe } from "lucide-react";

export default function MainLandingRelatable() {
    const features = [
        {
            icon: <Sparkles className="w-8 h-8 text-[#F5A800]" />,
            title: "Curated Experiences",
            description: "We bring you hand-picked events, ensuring top-tier quality and unforgettable moments."
        },
        {
            icon: <ShieldCheck className="w-8 h-8 text-[#F5A800]" />,
            title: "Secure & Trusted",
            description: "A reliable ecosystem for both ticket buyers and event organizers to operate with peace of mind."
        },
        {
            icon: <Globe className="w-8 h-8 text-[#F5A800]" />,
            title: "Global Reach",
            description: "Connect with communities and creators across the world seamlessly."
        }
    ];

    return (
        <section className="py-24 bg-white border-t border-slate-100">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-[#014B52] mb-6 font-museo">
                        Why Choose Showe
                    </h2>
                    <p className="text-slate-600 text-lg font-light">
                        Experience an ecosystem built entirely around elevating live events and digital experiences.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {features.map((feature, idx) => (
                        <div key={idx} className="bg-slate-50 rounded-2xl p-8 hover:bg-slate-100 transition-colors border border-slate-100/50">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
                            <p className="text-slate-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
