"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Mail, Send, MessageSquare, Phone } from "lucide-react"

export default function SupportForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))

        toast.success("Message Sent Successfully!", {
            description: "Our support team will get back to you within 24 hours.",
        })

        setIsSubmitting(false)
        const form = e.target as HTMLFormElement
        form.reset()
    }

    return (
        <section className="py-24 bg-gray-50 overflow-hidden">
            <div className="container ">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Left: Contact Info */}
                    <div className="lg:w-1/3 space-y-12">
                        <div className="space-y-4">
                            <h2 className="text-3xl md:text-4xl font-bold text-[#014B52] font-museo">Get in touch</h2>
                            <p className="text-gray-500 leading-relaxed">
                                Prefer direct contact? Reach out through any of these channels or fill out the form.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {[
                                { icon: Mail, label: "Email Support", value: "support@showe.app" },
                                { icon: Phone, label: "Phone", value: "+1 (555) 000-SHOWE" },
                                { icon: MessageSquare, label: "Live Chat", value: "Available 9am - 6pm EST" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-[#F5A800] group-hover:text-white transition-all duration-300">
                                        <item.icon size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{item.label}</p>
                                        <p className="text-[#014B52] font-semibold">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: The Form */}
                    <div className="lg:w-2/3">
                        <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-sm border border-gray-100 relative">
                            {/* Decorative element */}
                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#F5A800]/10 rounded-full blur-2xl" />

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-[#014B52] font-semibold">Full Name</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            required
                                            placeholder="John Doe"
                                            className="h-12 border-gray-200 focus:border-[#F5A800] focus:ring-[#F5A800]/10 rounded-xl"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-[#014B52] font-semibold">Email Address</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            placeholder="john@example.com"
                                            className="h-12 border-gray-200 focus:border-[#F5A800] focus:ring-[#F5A800]/10 rounded-xl"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="subject" className="text-[#014B52] font-semibold">Subject</Label>
                                    <Input
                                        id="subject"
                                        name="subject"
                                        required
                                        placeholder="How can we help?"
                                        className="h-12 border-gray-200 focus:border-[#F5A800] focus:ring-[#F5A800]/10 rounded-xl"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message" className="text-[#014B52] font-semibold">Message</Label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        required
                                        placeholder="Tell us more about your issue..."
                                        className="min-h-[150px] border-gray-200 focus:border-[#F5A800] focus:ring-[#F5A800]/10 rounded-xl resize-none py-4"
                                    />
                                </div>

                                <Button
                                    disabled={isSubmitting}
                                    type="submit"
                                    className="w-full h-14 bg-[#F5A800] hover:bg-[#e09900] text-white font-bold text-lg rounded-2xl shadow-lg shadow-[#F5A800]/20 transition-all active:scale-[0.98]"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center gap-2">
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Sending...
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            <Send size={20} />
                                            Send Message
                                        </span>
                                    )}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
