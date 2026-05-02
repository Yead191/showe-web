"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const FAQS = [
    {
        question: "How do I scan a QR code to access a program?",
        answer: "Simply open your phone's camera and point it at the SHOWE QR code displayed at the event venue. A link will appear—tap it to instantly load the interactive program in your browser. No app download required!"
    },
    {
        question: "Can I get a refund for a digital ticket?",
        answer: "Refund policies vary by event organizer. Generally, you can request a refund through your 'My Tickets' dashboard up to 24 hours before the event starts. If the button is not available, please contact the organizer directly."
    },
    {
        question: "How do I list my event or artist profile on SHOWE?",
        answer: "Visit our 'Get Started' page and choose the 'Organize' or 'Artist' path. You'll be guided through a simple setup process to verify your identity and start creating interactive experiences."
    },
    {
        question: "Is my payment information secure?",
        answer: "Yes, we use industry-standard encryption and partner with trusted payment processors like Stripe to ensure your financial data is always protected. We never store your full credit card details on our servers."
    },
    {
        question: "What if the interactive program isn't loading?",
        answer: "First, check your internet connection. If the issue persists, try refreshing the page or clearing your browser cache. You can also ask event staff for a physical backup or help with the connection."
    }
]

export default function SupportFaq() {
    return (
        <section className="py-10 lg:py-16">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-sm font-bold text-[#F5A800] uppercase tracking-[0.3em] mb-3">Questions?</h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-[#014B52] font-museo">Frequently Asked Questions</h3>
                </div>

                <Accordion type="single" collapsible className="w-full space-y-4">
                    {FAQS.map((faq, i) => (
                        <AccordionItem
                            key={i}
                            value={`item-${i}`}
                            className="border border-gray-100 rounded-2xl px-6 py-2 transition-all hover:bg-gray-50/50 data-[state=open]:bg-gray-50 data-[state=open]:border-[#F5A800]/20"
                        >
                            <AccordionTrigger className="text-left font-bold text-[#014B52] hover:no-underline text-lg">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-500 leading-relaxed text-base pt-2 pb-6">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    )
}
