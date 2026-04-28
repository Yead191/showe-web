export const mockArtistDetails = {

    id: "art_7f3c2d9e1b84",
    name: "Shawn Mendis",
    type: "Solo Artist", // Solo Artist | Band | DJ | Orchestra | Comedian | Speaker

    // ── Media ──────────────────────────────────────────────
    profile_image: "/assets/images/artists/dp.webp",
    cover_image: "/assets/images/artists/cp.png",
    gallery: [
        "https://cdn.example.com/artists/shawn-mendis/gallery1.jpg",
        "https://cdn.example.com/artists/shawn-mendis/gallery2.jpg",
        "https://cdn.example.com/artists/shawn-mendis/gallery3.jpg",
        "https://cdn.example.com/artists/shawn-mendis/gallery4.jpg",
    ],

    // ── About ──────────────────────────────────────────────
    about: {
        bio_html:
            "<p>Dive into an electrifying evening of music, lights, and energy at the Summer Beats Festival 2025...</p>",
        genres: ["Pop", "Indie", "Acoustic", "Folk"],
        instruments: ["Guitar", "Piano", "Vocals"],
        languages: ["English", "Spanish"],
        career_start_year: 2015,
        origin_country: "Australia",
        origin_city: "Melbourne",
        based_in: "Amsterdam, Netherlands",
    },

    // ── Stats ──────────────────────────────────────────────
    stats: {
        total_events: 148,
        upcoming_events: 6,
        past_events: 142,
        total_followers: 52400,
        monthly_listeners: 980000,
        profile_views: 230500,
    },

    // ── Events ─────────────────────────────────────────────
    events: [
        {
            id: "1",
            title: "Summer Vibes Music Festival 2025",
            location: "Amsterdam, Netherland",
            price: 120,
            date: "Saturday, Nov 18, 09:30 PM",
            isoDate: "2025-11-18",
            interestedCount: "240+",
            image: "/assets/images/events/event1.jpg",
            category: "music"
        },
        {
            id: "2",
            title: "Thinking, Fast and Slow - Book Launch",
            location: "London, UK",
            price: 45,
            date: "Monday, Dec 05, 06:00 PM",
            isoDate: "2025-12-05",
            interestedCount: "150+",
            image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1000",
            category: "community"
        },
        {
            id: "3",
            title: "Wabi Sabi Art Workshop",
            location: "Kyoto, Japan",
            price: 85,
            date: "Friday, Jan 12, 10:00 AM",
            isoDate: "2026-01-12",
            interestedCount: "80+",
            image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1000",
            category: "theater"
        },
        {
            id: "4",
            title: "The Kinfolk Table Community Dinner",
            location: "Portland, USA",
            price: 150,
            date: "Sunday, Feb 20, 07:00 PM",
            isoDate: "2026-02-20",
            interestedCount: "300+",
            image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000",
            category: "ceremonies"
        },
        {
            id: "5",
            title: "Goal Planner 2025 Seminar",
            location: "Berlin, Germany",
            price: 60,
            date: "Thursday, Mar 15, 02:00 PM",
            isoDate: "2026-03-15",
            interestedCount: "120+",
            image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1000",
            category: "events"
        },
        {
            id: "6",
            title: "Psalms of the Forest Music Night",
            location: "Oslo, Norway",
            price: 95,
            date: "Wednesday, Apr 10, 08:30 PM",
            isoDate: "2026-04-10",
            interestedCount: "200+",
            image: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=1000",
            category: "music"
        },
    ],

}