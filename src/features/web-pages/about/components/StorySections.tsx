import { Button } from "@/components/ui/button"
import {
    ChevronRight,
    QrCode,
} from "lucide-react"
export default function StorySections() {
    return (
        <section className="py-10 lg:py-16  relative overflow-hidden">
            <div className="container ">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="lg:w-1/2 relative">
                        <div className="relative aspect-square max-w-[500px] mx-auto">
                            <div className="absolute inset-0 bg-[#F5A800]/20 rounded-[60px] rotate-6 scale-95" />
                            <div className="absolute inset-0 bg-[#014B52] rounded-[60px] flex items-center justify-center overflow-hidden">
                                <div className="p-12 text-white space-y-6">
                                    <QrCode size={80} className="text-[#F5A800] opacity-20 absolute -top-4 -right-4" />
                                    <h5 className="text-3xl font-bold font-museo">It all started with a simple question...</h5>
                                    <p className="text-white/70 italic leading-relaxed">
                                        "Why are we still using paper programs in a digital world?"
                                    </p>
                                    <div className="pt-4 flex items-center gap-4">
                                        <div className="h-1 w-12 bg-[#F5A800]" />
                                        <span className="text-sm font-bold tracking-widest uppercase">The SHOWE Team</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-1/2 space-y-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#014B52] font-museo">Our Story</h2>
                        <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                            <p>
                                Born from a passion for live performances and a drive for technological efficiency,
                                SHOWE was founded to solve a persistent problem: the disconnect between the
                                physical stage and the digital hands of the audience.
                            </p>
                            <p>
                                We started as a small tool for local theatre groups and quickly grew into a robust
                                platform used by international festivals and sports organizations. Our growth is
                                fueled by one goal—making sure that every event, no matter the size, has access
                                to state-of-the-art interaction tools.
                            </p>
                        </div>
                        <Button variant="link" className="text-[#F5A800] font-bold p-0 flex items-center gap-2 group text-lg">
                            Read more about our journey
                            <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
