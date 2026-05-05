import { Zap, Smartphone, Leaf, QrCode } from "lucide-react";

export default function AboutShowe() {
    const features = [
        {
            icon: <Smartphone className="w-10 h-10 text-[#F5A800]" />,
            title: "Mobile-First",
            description: "Beautifully designed programs formatted perfectly for your phone screen."
        },
        {
            icon: <Zap className="w-10 h-10 text-[#F5A800]" />,
            title: "Real-Time Updates",
            description: "Never miss a beat. Get instant updates on schedule changes or announcements."
        },
        {
            icon: <Leaf className="w-10 h-10 text-[#F5A800]" />,
            title: "Eco-Friendly",
            description: "Enjoy the show while helping the planet by reducing paper waste."
        }
    ];

    return (
        <section className="py-24 bg-[#F7F4EF] overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    {/* Left Side */}
                    <div className="lg:w-1/2">
                        <h2 className="text-4xl md:text-5xl font-bold text-[#014B52] mb-8 font-museo leading-tight tracking-tight">
                            The Future of <br className="hidden md:block" /> Event Programmes.
                        </h2>
                        <p className="text-xl text-slate-600 font-light leading-relaxed mb-10">
                            Showe replaces traditional printed booklets with an interactive, digital experience. Everything you need to know about the performance is right in your pocket.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-start gap-4 p-5 rounded-2xl bg-white shadow-sm border-l-4 border-[#F5A800]">
                                <div className="font-bold text-[#014B52] text-lg shrink-0">“What is this?”</div>
                                <div className="text-slate-600 pt-[2px]">Your interactive, digital companion for live events and shows.</div>
                            </div>
                            <div className="flex items-start gap-4 p-5 rounded-2xl bg-white shadow-sm border-l-4 border-[#F5A800]">
                                <div className="font-bold text-[#014B52] text-lg shrink-0">“Is it easy?”</div>
                                <div className="text-slate-600 pt-[2px]">Just scan the QR code at the venue. </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2 bg-[#014B52] text-white p-8 md:p-10 rounded-[2rem] shadow-xl transition-all hover:translate-y-[-5px]">
                            <div className="mb-6"><QrCode className="w-12 h-12 text-[#F5A800]" /></div>
                            <h3 className="text-2xl font-bold mb-3 text-white font-museo">Instant Access</h3>
                            <p className="text-white/80 text-lg leading-relaxed">
                                Point your camera, tap the link, and you're in. We believe technology should get out of the way so you can focus on the performance.
                            </p>
                        </div>
                        {features.map((item, idx) => (
                            <div key={idx} className={`p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all hover:translate-y-[-5px] border border-slate-100 ${idx === 2 ? 'md:col-span-2 bg-white' : 'bg-white'}`}>
                                <div className="mb-6">{item.icon}</div>
                                <h3 className="text-xl font-bold mb-3 text-slate-900">{item.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
