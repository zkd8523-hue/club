export interface Club {
    id: number;
    name: string;
    category: string;
    region: string;
    rating: number;
    location: string;
    contact: string;
    description: string;
    minPrice: number;
    images: string[];
    nowPlaying: {
        title: string;
        artist: string;
    };
    musicHistory: Array<{
        title: string;
        artist: string;
    }>;
    currentDJ: {
        name: string;
        bio: string;
        image: string;
        favoriteArtists: string[];
        instagram: string;
        youtubeSet: {
            title: string;
            url: string;
        };
    };
    tables: Array<{
        id: string;
        name: string;
        price: number;
        capacity: number;
    }>;
    menu: Array<{
        id: string;
        name: string;
        price: number;
        isHotDeal?: boolean;
    }>;
}

export interface HotDeal {
    id: number;
    clubName: string;
    image: string;
    price: string;
    time: string;
    expiresIn: number;
}

export interface Auction {
    id: number;
    clubName: string;
    itemName: string;
    startPrice: number;
    currentBid: number;
    increment: number;
    bidders: number;
    expiresIn: number;
    image: string;
}

export interface Party {
    id: number;
    clubName: string;
    date: Date;
    tableType: string;
    bottles: string[];
    currentMembers: number;
    maxMembers: number;
    perPersonPrice: number;
}
