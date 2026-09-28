"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Clock,
  Sparkles,
  HelpCircle,
} from "lucide-react";

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || "xvzjjqpy";
const FORMSPREE_URL =
  process.env.NEXT_PUBLIC_FORMSPREE_URL ||
  `https://formspree.io/f/${FORMSPREE_ID}`;

type Status = "idle" | "sending" | "sent" | "error";

interface SupportFormProps {
  selectedTopic?: string;
}

const QUICK_SUBJECTS = [
  "Programme Access & QR",
  "Artist Account",
  "Account & Profile",
  "Billing Inquiry",
  "Bug Report",
];

export default function SupportForm({ selectedTopic = "" }: SupportFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (selectedTopic) {
      setSubject(selectedTopic);
    }
  }, [selectedTopic]);

  const handleCopyEmail = () => {
    if (typeof window === "undefined") return;
    navigator.clipboard.writeText("Backstage@showe.biz");
    setCopied(true);
    toast.success("Email address copied to clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });

      if (!res.ok) {
        throw new Error("Formspree submission error");
      }

      form.reset();
      setSubject("");
      setMessage("");
      setStatus("sent");
      toast.success("Message Sent Successfully!", {
        description: "Our support team will get back to you within 24 hours.",
      });
    } catch {
      setStatus("error");
      toast.error("Failed to send message", {
        description: "Please try again or email Backstage@showe.biz directly.",
      });
    }
  };

  return (
    <section id="contact-form" className="py-20 lg:py-28 bg-gray-50/80 overflow-hidden relative">
      {/* Decorative background blurs */}
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-accent-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-primary-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          {/* Left: Direct Contact & Trust Hub */}
          <div className="lg:w-5/12 space-y-8 w-full">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent-400/10 text-accent-400 text-xs font-black uppercase tracking-widest">
                <Sparkles size={13} />
                <span>Direct Support</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-primary-600 font-museo tracking-tight leading-tight">
                Backstage Assistance
              </h2>
              <p className="text-gray-500 text-base leading-relaxed">
                Need immediate help with your account, performer profile, or
                digital event programme? Connect with our dedicated support team.
              </p>
            </div>

            {/* Direct Email Card */}
            <div className="bg-white p-6 rounded-3xl border border-gray-200/70 shadow-sm space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-primary-600 text-white flex items-center justify-center shadow-md shadow-primary-600/20">
                    <Mail size={22} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                      Official Support
                    </p>
                    <a
                      href="mailto:Backstage@showe.biz"
                      className="text-primary-600 font-bold text-base hover:text-accent-400 transition-colors"
                    >
                      Backstage@showe.biz
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="p-2.5 rounded-xl border border-gray-200 text-gray-600 hover:text-primary-600 hover:bg-gray-50 transition-all cursor-pointer"
                    title="Copy email address"
                  >
                    {copied ? (
                      <Check size={16} className="text-green-600" />
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>
                  <a
                    href="mailto:Backstage@showe.biz"
                    className="p-2.5 rounded-xl border border-gray-200 text-gray-600 hover:text-primary-600 hover:bg-gray-50 transition-all"
                    title="Open mail client"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>

              {/* Status & Response Indicator */}
              <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-gray-600 font-medium">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                  <span>Active Desk Support</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-400 font-medium">
                  <Clock size={13} />
                  <span>Avg reply: &lt; 24h</span>
                </div>
              </div>
            </div>

            {/* What we assist with */}
            <div className="bg-white/60 backdrop-blur-xs p-6 rounded-3xl border border-gray-200/50 space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-primary-600 flex items-center gap-2">
                <HelpCircle size={15} className="text-accent-400" />
                Priority Support Coverage
              </h3>
              <ul className="space-y-2.5 text-sm text-gray-600">
                {[
                  "Digital programme reader & QR scanner troubleshooting",
                  "Artist & Organisation profile onboarding",
                  "Event schedule, setlists & ticketing link setup",
                  "Platform suggestions, partnerships & security",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-accent-400/10 text-accent-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Privacy notice */}
            <div className="flex items-center gap-3 px-2 text-xs text-gray-400 font-medium">
              <ShieldCheck size={18} className="text-accent-400 shrink-0" />
              <span>
                Enterprise-grade security. Inquiries are kept strictly
                confidential.
              </span>
            </div>
          </div>

          {/* Right: The Form Hub */}
          <div className="lg:w-7/12 w-full">
            <div className="bg-white p-8 md:p-12 rounded-[36px] md:rounded-[44px] shadow-sm border border-gray-100 relative">
              <div className="absolute -top-3 -right-3 w-28 h-28 bg-accent-400/10 rounded-full blur-2xl pointer-events-none" />

              {status === "sent" ? (
                <div className="py-12 flex flex-col items-center text-center space-y-6 animate-in fade-in zoom-in-95 duration-500">
                  <div className="w-20 h-20 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/10 border border-emerald-100">
                    <CheckCircle2 size={44} strokeWidth={2.2} />
                  </div>
                  <div className="space-y-3 max-w-md">
                    <h3 className="text-3xl font-bold text-primary-600 font-museo">
                      Inquiry Dispatched!
                    </h3>
                    <p className="text-gray-500 leading-relaxed text-sm md:text-base">
                      Thank you for contacting SHOWE. Your inquiry has been
                      securely forwarded to our backstage operations desk.
                      We will review and respond to you via email shortly.
                    </p>
                  </div>
                  <Button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-2 h-12 px-7 rounded-2xl bg-primary-600 hover:bg-[#01383e] text-white font-bold cursor-pointer transition-all shadow-md active:scale-95"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Honeypot & subject for Formspree */}
                  <input
                    type="text"
                    name="_gotcha"
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden="true"
                  />
                  <input
                    type="hidden"
                    name="_subject"
                    value={subject || "SHOWE Support Inquiry"}
                  />

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold text-primary-600 font-museo tracking-tight">
                        Send an Inquiry
                      </h3>
                      <span className="text-xs text-gray-400 font-medium">
                        * Required fields
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm">
                      Please supply accurate details so our team can assist you
                      efficiently.
                    </p>
                  </div>

                  {/* Quick Topic Chips */}
                  <div className="space-y-2 pt-1">
                    <Label className="text-xs font-black uppercase tracking-wider text-gray-400">
                      Quick Topic Select
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {QUICK_SUBJECTS.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setSubject(t)}
                          className={`text-xs px-3 py-1.5 rounded-full border transition-all cursor-pointer active:scale-95 ${
                            subject === t
                              ? "bg-accent-400 text-white border-accent-400 shadow-sm"
                              : "bg-gray-50 text-gray-600 border-gray-200 hover:border-accent-400/50 hover:bg-white"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5 pt-1">
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="text-primary-600 font-semibold text-sm"
                      >
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        required
                        autoComplete="name"
                        placeholder="e.g. Jane Doe"
                        className="h-12 border-gray-200 focus:border-accent-400 focus:ring-4 focus:ring-accent-400/10 rounded-xl transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-primary-600 font-semibold text-sm"
                      >
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="e.g. jane@example.com"
                        className="h-12 border-gray-200 focus:border-accent-400 focus:ring-4 focus:ring-accent-400/10 rounded-xl transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="subject"
                      className="text-primary-600 font-semibold text-sm"
                    >
                      Inquiry Subject *
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                      placeholder="e.g. Cannot access digital programme at venue"
                      className="h-12 border-gray-200 focus:border-accent-400 focus:ring-4 focus:ring-accent-400/10 rounded-xl transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="message"
                        className="text-primary-600 font-semibold text-sm"
                      >
                        Detailed Message *
                      </Label>
                      <span className="text-xs text-gray-400">
                        {message.length} / 1000
                      </span>
                    </div>
                    <Textarea
                      id="message"
                      name="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value.slice(0, 1000))}
                      required
                      rows={5}
                      placeholder="Please provide event dates, programme links, or any error messages you encountered..."
                      className="min-h-36 border-gray-200 focus:border-accent-400 focus:ring-4 focus:ring-accent-400/10 rounded-xl resize-y py-3.5 transition-all text-sm leading-relaxed"
                    />
                  </div>

                  {status === "error" && (
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm animate-in fade-in duration-300">
                      <AlertCircle className="h-5 w-5 shrink-0 text-red-500" />
                      <p>
                        Couldn’t send message right now. Please try again or
                        email us directly at{" "}
                        <a
                          href="mailto:Backstage@showe.biz"
                          className="underline font-bold hover:text-red-900"
                        >
                          Backstage@showe.biz
                        </a>
                        .
                      </p>
                    </div>
                  )}

                  <Button
                    disabled={status === "sending"}
                    type="submit"
                    className="w-full h-14 bg-accent-400 hover:bg-[#e09900] text-white font-bold text-base md:text-lg rounded-2xl shadow-lg shadow-accent-400/25 transition-all active:scale-[0.98] cursor-pointer disabled:opacity-60"
                  >
                    {status === "sending" ? (
                      <span className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Transmitting Inquiry...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send size={18} />
                        Transmit Inquiry
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
