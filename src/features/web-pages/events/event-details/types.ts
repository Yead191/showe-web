// Shape of the event details returned by GET /event/:id
// Some fields from the API are intentionally kept here even if the UI does not
// consume them yet, so they are ready to be wired up later.

export interface EventAuthor {
  _id: string;
  name: string;
  email: string;
  image: string;
  followers_count: number;
  following: boolean;
}

export interface EventPerformance {
  _id: string;
  date: string;
  start_time: string;
  end_time: string;
  type: string;
}

export interface EventHostInfo {
  name: string;
  is_verified: boolean;
}

export interface EventVenue {
  _id: string;
  name: string;
  address_line1: string;
}

export interface EventSocial {
  share_url: string;
  share_text: string;
  views_count: number;
}

export interface NearbyPlace {
  _id: string;
  name: string;
  image: string;
  category: string;
  rating: number;
  distance: string;
  price: string;
  location: string;
  description: string;
  website?: string;
}

export interface InterestPerson {
  _id: string;
  name: string;
  email?: string;
  image: string;
}

// GeoJSON point: coordinates are [longitude, latitude]
export interface EventGeoLocation {
  type: string;
  coordinates: [number, number];
}

export interface EventProgramme {
  _id: string;
  title: string;
  cover_image: string;
  price_pence?: number;
}

export interface EventArtist {
  _id: string;
  name: string;
  image: string;
  type: string;
}

export interface EventDetail {
  _id: string;
  title: string;
  category: string;
  is_featured: boolean;
  tags: string[];
  author: EventAuthor;
  cover_image: string;
  gallery: string[];
  description_html: string;
  highlights: string[];
  get_tickets_url: string;
  performances: EventPerformance[];
  host: EventHostInfo;
  price: number;
  event_date: string;
  vanue: EventVenue;
  programme: EventProgramme;
  social: EventSocial;
  nearby_restaurants: NearbyPlace[];
  nearby_hotels: NearbyPlace[];
  nearby_bars: NearbyPlace[];
  status: string;
  location: EventGeoLocation;
  qr_scan_count: number;
  interest_count: number;
  downloads_count: number;
  revinge_count: number;
  artist: EventArtist;
  address: string;
  isFavorited: boolean;
  someInterestPeopsle: InterestPerson[];
  is_already_programme_purchased?: boolean;
}
