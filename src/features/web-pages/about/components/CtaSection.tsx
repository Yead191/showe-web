import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function CtaSection() {
    return (
        <section className="pb-24 pt-10 lg:pt-16">
            <div className="container ">
                <div className="bg-[#F5A800] rounded-[48px] p-12 md:p-20 text-center relative overflow-hidden group">
                    {/* Decorative circles */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mt-32 blur-2xl group-hover:bg-white/20 transition-all duration-700" />
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mb-32 blur-2xl group-hover:bg-white/20 transition-all duration-700" />

                    <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                        <Sparkles className="text-white h-12 w-12 mx-auto" />
                        <h2 className="text-3xl md:text-5xl font-bold text-white font-museo">
                            Ready to transform your event?
                        </h2>
                        <p className="text-white/80 text-lg font-medium">
                            Join thousands of organizers and artists who are already using SHOWE to build better experiences.
                        </p>
                        <div className="pt-4">
                            <Link href="/organisation-register">
                                <Button className="bg-white text-[#F5A800] hover:bg-gray-100 px-12 h-14 text-lg font-black rounded-2xl shadow-xl transition-all active:scale-95">
                                    Get Started Now
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
