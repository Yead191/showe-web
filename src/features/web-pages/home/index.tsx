import PageBanner from '@/components/shared/PageBanner'
import HomeSearch from './components/HomeSearch'
import PopularEvents from './components/PopularEvents'
import ExploreByDate from './components/ExploreByDate'
import ExploreByVenue from './components/ExploreByVenue'
import ExploreByArtist from './components/ExploreByArtist'

export default function Home() {
    return (
        <main>
            <PageBanner 
                title='Discover Exciting Events Near You' 
                bgImage="/assets/bg/banner/home-bg.jpg" 
                description="Browse thousands of events, book tickets instantly, and never miss out on what’s happening around you." 
                buttons={[
                    {
                        label: "Explore Events",
                        href: "/events",
                        variant: "default",
                    },
                ]} 
            />
            <HomeSearch />
            <PopularEvents />
            <ExploreByDate />
            <ExploreByVenue />
            <ExploreByArtist />
        </main>
    )
}
