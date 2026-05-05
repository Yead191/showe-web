"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Building2, User, Mail, Phone, MapPin, Lock, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function OrganisationRegister() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            toast.info("Registration request received!", {
                description: "Note: The Dashboard is currently under development. Our team will contact you soon."
            });
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="h-screen bg-slate-50 flex flex-col lg:flex-row overflow-hidden">
            {/* Left Side: Branding & Info (Hidden on small screens) */}
            <div className="hidden lg:flex lg:w-1/2 bg-[#014B52] relative overflow-hidden flex-col justify-between p-12 text-white h-full">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#F5A800]/10 rounded-full blur-3xl -mr-20 -mt-20" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F5A800]/5 rounded-full blur-3xl -ml-20 -mb-20" />

                <Button onClick={() => router.back()} className="relative z-10 flex items-center gap-2 text-white/80 hover:text-white transition-colors w-fit bg-transparent">
                    <ArrowLeft size={20} />
                    <span>Back to Home</span>
                </Button>

                <div className="relative z-10 max-w-lg">
                    <Image src="/logo.png" width={200} height={60} alt="Showe Logo" className="mb-12" />
                    <h1 className="text-5xl font-bold font-museo leading-tight mb-6">
                        Empower Your <span className="text-[#F5A800]">Organization</span> With Digital Intelligence.
                    </h1>
                    <p className="text-xl text-white/80 font-light leading-relaxed">
                        Join hundreds of world-class venues and event producers who have replaced print with our dynamic, interactive platform.
                    </p>
                </div>

                <div className="relative z-10">
                    <p className="text-sm text-white/40">© 2024 Showe Platform. All rights reserved.</p>
                </div>
            </div>

            {/* Right Side: Form */}
            <div className="flex-1 overflow-y-auto h-full">
                <div className="min-h-full flex items-start lg:items-center justify-center p-6 md:p-12">
                    <Card className="w-full max-w-2xl border-none shadow-2xl overflow-hidden rounded-2xl my-auto">
                        <CardContent className="p-0">
                            <div className="p-8 md:p-12 bg-white">
                                <div className="mb-10">
                                    <h2 className="text-3xl font-bold text-slate-900 mb-2">Create Organization Account</h2>
                                    <p className="text-slate-500">Please fill in the details below to start your digital journey.</p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-8 ">
                                    {/* Basic Info Section */}
                                    <div className="space-y-6">
                                        <h3 className="text-lg font-semibold text-[#014B52] flex items-center gap-2 border-b border-slate-100 pb-2">
                                            <Building2 size={20} /> General Information
                                        </h3>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="orgName">Organization Name</Label>
                                                <div className="relative">
                                                    <Building2 className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                                    <Input id="orgName" placeholder="e.g. Grand Theatre" className="pl-10 h-11" required />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="contactName">Contact Person</Label>
                                                <div className="relative">
                                                    <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                                    <Input id="contactName" placeholder="e.g. John Doe" className="pl-10 h-11" required />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email">Business Email</Label>
                                                <div className="relative">
                                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                                    <Input id="email" type="email" placeholder="john@theater.com" className="pl-10 h-11" required />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="phone">Phone Number</Label>
                                                <div className="relative">
                                                    <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                                    <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" className="pl-10 h-11" required />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Location Section */}
                                    <div className="space-y-6">
                                        <h3 className="text-lg font-semibold text-[#014B52] flex items-center gap-2 border-b border-slate-100 pb-2">
                                            <MapPin size={20} /> Hosting Location
                                        </h3>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="md:col-span-2 space-y-2">
                                                <Label htmlFor="address">Venue Address</Label>
                                                <div className="relative">
                                                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                                    <Input id="address" placeholder="123 Main Street" className="pl-10 h-11" required />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="city">City</Label>
                                                <Input id="city" placeholder="New York" className="h-11" required />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="zipCode">Zip / Postal Code</Label>
                                                <Input id="zipCode" placeholder="10001" className="h-11" required />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Security Section */}
                                    <div className="space-y-6">
                                        <h3 className="text-lg font-semibold text-[#014B52] flex items-center gap-2 border-b border-slate-100 pb-2">
                                            <Lock size={20} /> Security
                                        </h3>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="password">Password</Label>
                                                <div className="relative">
                                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                                    <Input id="password" type="password" className="pl-10 h-11" required />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                                <div className="relative">
                                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                                    <Input id="confirmPassword" type="password" className="pl-10 h-11" required />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-4 flex flex-col gap-4">
                                        <Button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full h-14 bg-[#F5A800] hover:bg-[#e09900] text-white lg:text-lg lg:font-bold rounded-xl transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
                                        >
                                            {isLoading ? "Creating Account..." : "Create Account & Get Started"}
                                        </Button>

                                        <div className="text-center text-slate-600 mt-4">
                                            Already have an account?{" "}
                                            <a
                                                onClick={() => toast.warning('Dashboard is under development. Try again later.')}
                                                // href="https://dashboard.showe.com/login"
                                                // target="_blank"
                                                // rel="noopener noreferrer"
                                                className="text-[#014B52] font-bold hover:underline cursor-pointer"
                                            >
                                                Login here
                                            </a>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <div className="bg-slate-50 p-6 text-center border-t border-slate-100">
                                <p className="text-sm text-slate-500">
                                    Need help? <Link href="/support" className="text-[#014B52] hover:underline">Contact our support team</Link>
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
