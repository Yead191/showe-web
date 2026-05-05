import Image from 'next/image';
import { QrCode, Search, Save } from 'lucide-react';

export default function WhatYouCanDo() {
    const features = [
        {
            icon: <QrCode className="w-8 h-8 text-[#F2A900]" />,
            title: "Instant Access",
            description: "Scan a QR code to access your programme instantly. No downloads, no waiting."
        },
        {
            icon: <Search className="w-8 h-8 text-[#F2A900]" />,
            title: "Discover More",
            description: "Explore the cast, dive into rich stories, and uncover exclusive behind-the-scenes content."
        },
        {
            icon: <Save className="w-8 h-8 text-[#F2A900]" />,
            title: "Interact & Revisit",
            description: "Interact with the event live, save your favorite moments, and revisit the programme anytime."
        }
    ];

    return (
        <section className="py-24 bg-[#0C0C0C] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F2A900]/10 rounded-full blur-[120px] -mr-64 -mt-64" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#014B52]/10 rounded-full blur-[100px] -ml-48 -mb-48" />

            <div className="container relative z-10 ">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Side: Features */}
                    <div className="text-white space-y-12">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold font-museo text-white mb-4">
                                Experience More.
                            </h2>
                            <p className="text-xl text-white/70 font-light">
                                Elevate your event experience with interactive digital programmes that bring you closer to the action.
                            </p>
                        </div>

                        <div className="space-y-8">
                            {features.map((feature, idx) => (
                                <div key={idx} className="flex gap-6 group">
                                    <div className="shrink-0 w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#F2A900]/10 transition-colors duration-500">
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
                                        <p className="text-white/70 text-lg leading-relaxed">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Audience Imagery */}
                    <div className="relative h-[500px] md:h-[700px] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl group">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />

                        {/* High emotion audience image */}
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" />

                        <div className="absolute bottom-8 left-8 right-8 z-20">
                            <div className="backdrop-blur-md bg-white/10 border border-white/20 p-6 rounded-2xl">
                                <p className="text-white text-lg font-light italic">
                                    "It felt like I was part of the show before it even started. The digital programme is a game-changer."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
