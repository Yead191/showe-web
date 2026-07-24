"use client"

import React, { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Camera, Loader2, Save } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { getImageUrl } from "@/lib/getImageUrl"
import { updateUserProfile } from "@/helpers/next-fetch/profileActions"
import type { UserProfile } from "../types"

function getInitials(name?: string) {
    if (!name?.trim()) return "?"
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? "")
        .join("")
}

export function AccountSettings({ user }: { user: UserProfile }) {
    const router = useRouter()
    const fileInputRef = useRef<HTMLInputElement>(null)

    const [name, setName] = useState(user.name ?? "")
    const [contact, setContact] = useState(user.contact ?? "")
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setName(user.name ?? "")
        setContact(user.contact ?? "")
        setImageFile(null)
        setPreviewUrl(null)
    }, [user])

    const displayImage = previewUrl || (user.image ? getImageUrl(user.image) : null)

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        if (!file.type.startsWith("image/")) {
            toast.error("Please select a valid image file")
            return
        }

        setImageFile(file)
        setPreviewUrl(URL.createObjectURL(file))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!name.trim()) {
            toast.error("Name is required")
            return
        }

        setIsLoading(true)
        try {
            const formData = new FormData()
            formData.append("name", name.trim())
            formData.append("contact", contact.trim())
            if (imageFile) formData.append("image", imageFile)

            const response = await updateUserProfile(formData)

            if (response.success) {
                toast.success(response.message || "Profile updated successfully")
                setImageFile(null)
                router.refresh()
            } else if (response.error && Array.isArray(response.error)) {
                response.error.forEach((err: { message: string }) => {
                    toast.error(err.message)
                })
            } else {
                toast.error(response.message || "Failed to update profile")
            }
        } catch {
            toast.error("Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-8 md:gap-12">
            {/* Avatar Upload */}
            <div className="flex flex-col items-center gap-4 shrink-0">
                <div className="relative group">
                    <div className="relative h-28 w-28 md:h-32 md:w-32 rounded-[32px] md:rounded-[40px] bg-gray-100 flex items-center justify-center text-3xl md:text-4xl font-black text-[#014B52] overflow-hidden border-4 border-white shadow-xl">
                        {displayImage ? (
                            <Image
                                src={displayImage}
                                alt={user.name}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            getInitials(name || user.name)
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute bottom-0 right-0 p-2 bg-[#014B52] text-white rounded-2xl shadow-lg hover:scale-110 active:scale-95 transition-all"
                    >
                        <Camera size={16} />
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                    />
                </div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Profile Picture</p>
            </div>

            {/* Form Fields */}
            <div className="flex-1 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="space-y-2">
                        <Label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Full Name</Label>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your full name"
                            className="h-11 md:h-12 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all font-medium"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</Label>
                        <Input
                            value={user.email ?? ""}
                            disabled
                            className="h-11 md:h-12 rounded-2xl border-gray-100 bg-gray-50/50 font-medium opacity-60"
                        />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <Label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Phone Number</Label>
                        <Input
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            placeholder="Your contact number"
                            className="h-11 md:h-12 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all font-medium"
                        />
                    </div>
                </div>
                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full md:w-auto h-12 px-8 bg-[#014B52] hover:bg-[#023a40] rounded-2xl font-black text-xs uppercase tracking-widest gap-2 shadow-lg shadow-[#014B52]/20"
                >
                    {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                    {isLoading ? "Saving..." : "Save Changes"}
                </Button>
            </div>
        </form>
    )
}
