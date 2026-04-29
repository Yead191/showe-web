"use client"

import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { User, Lock, Save, Camera } from "lucide-react"

export default function ProfilePage() {
    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* ── Header ── */}
            <div className="space-y-1">
                <h1 className="text-4xl font-black text-gray-900 tracking-tight">Profile Settings</h1>
                <p className="text-gray-500 font-medium">Manage your account information and security</p>
            </div>

            <Tabs defaultValue="account" className="w-full">
                <TabsList className="bg-gray-100/50 p-1 rounded-2xl mb-8 flex overflow-x-auto no-scrollbar whitespace-nowrap">
                    <TabsTrigger
                        value="account"
                        className="flex-1 rounded-xl px-4 md:px-8 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#014B52] font-black text-[10px] md:text-xs uppercase tracking-widest transition-all"
                    >
                        <User className="w-3.5 h-3.5 md:w-4 md:h-4 mr-2 shrink-0" />
                        <span className="hidden md:block">
                            Account Settings
                        </span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="password"
                        className="flex-1 rounded-xl px-4 md:px-8 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#014B52] font-black text-[10px] md:text-xs uppercase tracking-widest transition-all"
                    >
                        <Lock className="w-3.5 h-3.5 md:w-4 md:h-4 mr-2 shrink-0" />
                        <span className="hidden md:block">
                            Change Password
                        </span>
                    </TabsTrigger>
                </TabsList>

                {/* ── Account Settings Tab ── */}
                <TabsContent value="account" className="space-y-8 animate-in fade-in zoom-in-95 duration-500 outline-none">
                    <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                        {/* Avatar Upload */}
                        <div className="flex flex-col items-center gap-4 shrink-0">
                            <div className="relative group">
                                <div className="h-28 w-28 md:h-32 md:w-32 rounded-[32px] md:rounded-[40px] bg-gray-100 flex items-center justify-center text-3xl md:text-4xl font-black text-[#014B52] overflow-hidden border-4 border-white shadow-xl">
                                    JD
                                </div>
                                <button className="absolute bottom-0 right-0 p-2 bg-[#014B52] text-white rounded-2xl shadow-lg hover:scale-110 active:scale-95 transition-all">
                                    <Camera size={16} />
                                </button>
                            </div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Profile Picture</p>
                        </div>

                        {/* Form Fields */}
                        <div className="flex-1 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                <div className="space-y-2">
                                    <Label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Full Name</Label>
                                    <Input defaultValue="John Doe" className="h-11 md:h-12 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all font-medium" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</Label>
                                    <Input defaultValue="john@example.com" disabled className="h-11 md:h-12 rounded-2xl border-gray-100 bg-gray-50/50 font-medium opacity-60" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Phone Number</Label>
                                    <Input defaultValue="+880 1234 567890" className="h-11 md:h-12 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all font-medium" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Date of Birth</Label>
                                    <Input type="date" defaultValue="1995-01-01" className="h-11 md:h-12 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all font-medium" />
                                </div>
                            </div>
                            <Button className="w-full md:w-auto h-12 px-8 bg-[#014B52] hover:bg-[#023a40] rounded-2xl font-black text-xs uppercase tracking-widest gap-2 shadow-lg shadow-[#014B52]/20">
                                <Save size={16} />
                                Save Changes
                            </Button>
                        </div>
                    </div>
                </TabsContent>

                {/* ── Change Password Tab ── */}
                <TabsContent value="password" className="space-y-8 animate-in fade-in zoom-in-95 duration-500 outline-none">
                    <div className="max-w-md space-y-6">
                        <div className="space-y-2">
                            <Label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Current Password</Label>
                            <Input type="password" placeholder="••••••••" className="h-11 md:h-12 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all font-medium" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">New Password</Label>
                            <Input type="password" placeholder="••••••••" className="h-11 md:h-12 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all font-medium" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Confirm New Password</Label>
                            <Input type="password" placeholder="••••••••" className="h-11 md:h-12 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all font-medium" />
                        </div>
                        <Button className="w-full md:w-auto h-12 px-8 bg-[#014B52] hover:bg-[#023a40] rounded-2xl font-black text-xs uppercase tracking-widest gap-2 shadow-lg shadow-[#014B52]/20">
                            <Lock size={16} />
                            Update Password
                        </Button>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
