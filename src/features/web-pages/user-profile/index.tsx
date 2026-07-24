"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Lock } from "lucide-react"
import { AccountSettings } from "./components/AccountSettings"
import { ChangePasswordForm } from "./components/ChangePasswordForm"
import type { UserProfile } from "./types"

export default function UserProfilePage({ user }: { user: UserProfile }) {
    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
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
                        <span className="hidden md:block">Account Settings</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="password"
                        className="flex-1 rounded-xl px-4 md:px-8 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#014B52] font-black text-[10px] md:text-xs uppercase tracking-widest transition-all"
                    >
                        <Lock className="w-3.5 h-3.5 md:w-4 md:h-4 mr-2 shrink-0" />
                        <span className="hidden md:block">Change Password</span>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="account" className="space-y-8 animate-in fade-in zoom-in-95 duration-500 outline-none">
                    <AccountSettings user={user} />
                </TabsContent>

                <TabsContent value="password" className="space-y-8 animate-in fade-in zoom-in-95 duration-500 outline-none">
                    <ChangePasswordForm />
                </TabsContent>
            </Tabs>
        </div>
    )
}
