export interface EventDetails {
    event: Event
}

export interface Event {
    id: string
    title: string
    slug: string
    category: string
    tags: string[]
    status: string
    is_featured: boolean
    cover_image: string
    gallery: string[]
    schedule: Schedule
    location: Location
    transport_options: TransportOption[]
    about: About
    tickets: Tickets
    host: Host
    interested_audience: InterestedAudience
    social: Social
    downloads: Downloads
    related_events: RelatedEvent[]
}

export interface Schedule {
    date: string
    day: string
    start_time: string
    end_time: string
    timezone: string
    display_date: string
    add_to_calendar_links: AddToCalendarLinks
}

export interface AddToCalendarLinks {
    google: string
    apple: string
    outlook: string
}

export interface Location {
    venue_name: string
    address_line1: string
    address_line2: string | null
    city: string
    state: string
    country: string
    zip_code: string
    full_address: string
    coordinates: Coordinates
    map_url: string
    is_online: boolean
    online_link: string | null
}

export interface Coordinates {
    latitude: number
    longitude: number
}

export interface TransportOption {
    mode: string
    label: string
    icon: string
    available: boolean
}

export interface About {
    description_html: string
    highlights: string[]
}

export interface Tickets {
    currency: string
    starting_price: number
    display_price: string
    purchase_url: string
    tiers: Tier[]
    is_free: boolean
    max_per_order: number
}

export interface Tier {
    id: string
    name: string
    price: number
    quantity_total: number
    quantity_remaining: number
    sold_out: boolean
    perks: string[]
}

export interface Host {
    id: string
    name: string
    username: string
    avatar_url: string
    bio: string
    follower_count: number
    is_following: boolean
    is_verified: boolean
    profile_url: string
}

export interface InterestedAudience {
    total_count: number
    current_user_interested: boolean
    preview_users: PreviewUser[]
    mutual_friends_count: number
}

export interface PreviewUser {
    id: string
    name: string
    avatar_url: string
}

export interface Social {
    share_url: string
    share_text: string
    is_saved: boolean
    views_count: number
}

export interface Downloads {
    brochure_url: string
    schedule_url: string
}

export interface RelatedEvent {
    id: string
    title: string
    cover_image: string
    date: string
    price: number
}

export const mockEventDetails: EventDetails = {
    event: {
        id: "evt_92b3f1c7d8e4",
        title: "Summer Vibes Music Festival, 2025",
        slug: "summer-vibes-music-festival-2025",
        category: "Music",
        tags: ["festival", "live music", "summer", "outdoor"],
        status: "published",
        is_featured: true,
        cover_image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2000",
        gallery: [
            "https://images.unsplash.com/photo-1459749411177-042180ce673c?q=80&w=1000",
            "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000",
            "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000",
        ],
        schedule: {
            date: "2025-11-30",
            day: "Saturday",
            start_time: "09:30 PM",
            end_time: "11:59 PM",
            timezone: "Asia/Dhaka",
            display_date: "Saturday, Nov 30, 09:30 PM",
            add_to_calendar_links: {
                google: "https://calendar.google.com/...",
                apple: "https://calendar.apple.com/...",
                outlook: "https://outlook.live.com/...",
            },
        },

        location: {
            venue_name: "Abc Convention Hall",
            address_line1: "123 Convention Road",
            address_line2: null,
            city: "Dhaka",
            state: "Dhaka Division",
            country: "Bangladesh",
            zip_code: "1207",
            full_address: "43 Mohakhali C/A, Dhaka 1212",
            coordinates: {
                latitude: 23.780762261550453,
                longitude: 90.40761635630028,
            },
            map_url: "https://maps.google.com/?q=23.8103,90.4125",
            is_online: false,
            online_link: null,
        },

        transport_options: [
            { mode: "driving", label: "Driving", icon: "car", available: true },
            { mode: "public_transport", label: "Public Transport", icon: "bus", available: true },
            { mode: "cycling", label: "Cycling", icon: "bicycle", available: true },
            { mode: "walking", label: "Walking", icon: "walk", available: true },
        ],

        about: {
            description_html:
                "<p>This is a short description of the event. The Summer Vibes Music Festival brings together artists from across the country for a night of incredible live performances.</p>",
            highlights: [
                "Live performances by 20+ artists",
                "Food and beverage stalls",
                "VIP lounge access",
            ],
        },
        tickets: {
            currency: "USD",
            starting_price: 120.0,
            display_price: "$120.00",
            purchase_url: "https://tickets.example.com/summer-vibes-2025",
            tiers: [
                {
                    id: "tier_general",
                    name: "General Admission",
                    price: 120.0,
                    quantity_total: 500,
                    quantity_remaining: 143,
                    sold_out: false,
                    perks: ["Festival entry", "Welcome kit"],
                },
                {
                    id: "tier_vip",
                    name: "VIP",
                    price: 250.0,
                    quantity_total: 100,
                    quantity_remaining: 12,
                    sold_out: false,
                    perks: ["VIP lounge", "Meet & greet", "Backstage pass"],
                },
            ],
            is_free: false,
            max_per_order: 10,
        },

        host: {
            id: "usr_sh4nt0_1sl4m",
            name: "Shanto Islam",
            username: "shantoislam",
            avatar_url: "https://i.pravatar.cc/300?u=shanto",
            bio: "Event organizer and music lover based in Dhaka.",
            follower_count: 3200,
            is_following: false,
            is_verified: true,
            profile_url: "https://example.com/u/shantoislam",
        },

        interested_audience: {
            total_count: 248,
            current_user_interested: false,
            preview_users: [
                {
                    id: "usr_001",
                    name: "Rafi Ahmed",
                    avatar_url: "https://i.pravatar.cc/100?u=rafi",
                },
                {
                    id: "usr_002",
                    name: "Nadia Karim",
                    avatar_url: "https://i.pravatar.cc/100?u=nadia",
                },
            ],
            mutual_friends_count: 5,
        },

        social: {
            share_url: "https://example.com/events/summer-vibes-music-festival-2025",
            share_text: "Join me at Summer Vibes Music Festival 2025!",
            is_saved: false,
            views_count: 12450,
        },

        downloads: {
            brochure_url: "https://cdn.example.com/events/summer-vibes-2025/brochure.pdf",
            schedule_url: "https://cdn.example.com/events/summer-vibes-2025/schedule.pdf",
        },

        related_events: [
            {
                id: "evt_rel_001",
                title: "Summer Vibes Music Festival 2025",
                cover_image: "/assets/images/events/event1.jpg",
                date: "Saturday, Nov 15, 08:00 AM",
                price: 120.0,
            },
            {
                id: "evt_rel_002",
                title: "Summer Vibes Music Festival 2025",
                cover_image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000",
                date: "Monday, Nov 18, 06:00 PM",
                price: 120.0,
            },
            {
                id: "evt_rel_003",
                title: "Summer Vibes Music Festival 2025",
                cover_image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000",
                date: "Wednesday, Nov 20, 07:00 PM",
                price: 120.0,
            },
            {
                id: "evt_rel_004",
                title: "Summer Vibes Music Festival 2025",
                cover_image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1000",
                date: "Saturday, Nov 23, 09:00 PM",
                price: 120.0,
            },
        ],


    },
}