export interface UserProfile {
    _id: string
    name: string
    role: string
    email: string
    image?: string | null
    status?: string
    contact?: string | null
    location?: string | null
    verified?: boolean
}
