"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { FAQ_ITEMS } from "@/constants/home/FAQ_ITEMS"
import { MessageCircle } from "lucide-react"



export default function HomeFAQ() {
    return (
        <section className="container mx-auto px-4 py-12 lg:py-16">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
                {/* Left Side: Header & CTA */}
                <div className="lg:w-1/3 space-y-12">
                    <div className="space-y-6">
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight">
                            Frequently Asked <br />
                            <span className="text-[#F5A800]">Question</span>
                        </h2>
                        <div className="h-1.5 w-20 bg-[#F5A800] rounded-full" />
                    </div>

                    <div className="space-y-8">
                        <p className="text-gray-500 text-lg font-medium leading-relaxed">
                            Can't find the answers you're looking for? <br />
                            Don't worry, our support team is here to help you 24/7.
                        </p>

                        <Button className="h-12 px-8 bg-[#F5A800] hover:bg-[#e09900] text-white font-black text-sm rounded-none tracking-widest uppercase flex items-center gap-3 transition-all shadow-xl shadow-[#F5A800]/20">
                            Get in touch
                            <MessageCircle className="h-5 w-5" />
                        </Button>
                    </div>
                </div>

                {/* Right Side: Accordion */}
                <div className="lg:w-2/3">
                    <Accordion type="single" collapsible className="space-y-4">
                        {FAQ_ITEMS?.map((item, index) => (
                            <AccordionItem
                                key={index}
                                value={`item-${index}`}
                                className="border border-gray-100 bg-white rounded-none px-6 md:px-8 py-2 transition-all hover:border-gray-200 hover:shadow-md data-[state=open]:border-[#F5A800]/30 data-[state=open]:shadow-xl data-[state=open]:shadow-black/5"
                            >
                                <AccordionTrigger className="text-left text-lg font-bold text-gray-900 hover:no-underline py-2">
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-500 text-base leading-relaxed pb-4">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    )
}
