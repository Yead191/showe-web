import { Search, Smartphone, Ticket, Users } from "lucide-react"

export default function FourPillars() {
    return (
        <section className="py-10 lg:py-16">
            <div className="container">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#014B52] font-museo mb-6">What Makes SHOWE Different</h2>
                    <p className="text-gray-500 text-lg">
                        We've built an all-in-one ecosystem designed to serve everyone—from fans and attendees to artists and event organizers.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        {
                            icon: Search,
                            title: "Discovery",
                            desc: "Find nearby events, festivals, and ceremonies with ease through our intuitive discovery engine.",
                            color: "#F5A800"
                        },
                        {
                            icon: Smartphone,
                            title: "Interactivity",
                            desc: "Scan a QR code and instantly access dynamic programs, schedules, and live updates.",
                            color: "#014B52"
                        },
                        {
                            icon: Ticket,
                            title: "Selling & Access",
                            desc: "Integrated ticketing and program selling features that streamline revenue for organizers.",
                            color: "#F5A800"
                        },
                        {
                            icon: Users,
                            title: "Connection",
                            desc: "A direct bridge between artists and fans, fostering community and long-term engagement.",
                            color: "#014B52"
                        }
                    ].map((pillar, i) => (
                        <div key={i} className="group p-8 rounded-[40px] border border-gray-100 hover:border-transparent hover:bg-gray-50 transition-all duration-300">
                            <div
                                className="w-16 h-16 rounded-[20px] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300"
                                style={{ backgroundColor: pillar.color + "15", color: pillar.color }}
                            >
                                <pillar.icon size={32} strokeWidth={1.5} />
                            </div>
                            <h4 className="text-2xl font-bold text-[#014B52] mb-4 tracking-tight">{pillar.title}</h4>
                            <p className="text-gray-500 leading-relaxed text-sm">
                                {pillar.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
