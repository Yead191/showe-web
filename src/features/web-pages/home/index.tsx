import PageBanner from '@/components/shared/PageBanner'
import HomeSearch from './components/HomeSearch'
import PopularEvents from './components/PopularEvents'
import ExploreByDate from './components/ExploreByDate'
import ExploreByVenue from './components/ExploreByVenue'
import ExploreByArtist from './components/ExploreByArtist'
import HomeFAQ from './components/HomeFAQ'
import LandingCTA from '../landing/components/LandingCTA'

export default function Home({
    events,
    artists,
    venues
}: {
    events: any[],
    artists: any[],
    venues: any[]
}) {
    return (
        <main>
            <PageBanner
                title='Discover Exciting Events Near You'
                bgImage="/assets/bg/programmes/music.png"
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
            <PopularEvents events={events} />
            <ExploreByDate />
            <ExploreByVenue venues={venues} />
            <ExploreByArtist artists={artists} />
            <HomeFAQ />
            <LandingCTA />
        </main>
    )
}
