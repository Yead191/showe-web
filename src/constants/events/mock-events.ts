export interface Event {
    id: string
    title: string
    location: string
    price: number
    date: string
    interestedCount: string
    image: string
    category: string
}

export const MOCK_EVENTS: Event[] = [
    {
        id: "1",
        title: "Summer Vibes Music Festival 2025",
        location: "Amsterdam, Netherland",
        price: 120,
        date: "Saturday, Nov 18, 09:30 PM",
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
        interestedCount: "200+",
        image: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=1000",
        category: "music"
    },
    {
        id: "7",
        title: "Champions League Viewing Party",
        location: "Madrid, Spain",
        price: 30,
        date: "Saturday, May 25, 09:00 PM",
        interestedCount: "500+",
        image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=1000",
        category: "sports"
    },
    {
        id: "8",
        title: "Modern Dance Performance",
        location: "Paris, France",
        price: 110,
        date: "Friday, Jun 07, 07:30 PM",
        interestedCount: "180+",
        image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1000",
        category: "theater"
    },
    {
        id: "9",
        title: "Tech Innovation Summit",
        location: "San Francisco, USA",
        price: 250,
        date: "Tuesday, Jul 16, 09:00 AM",
        interestedCount: "1000+",
        image: "/assets/images/events/event2.webp",
        category: "events"
    }
]
