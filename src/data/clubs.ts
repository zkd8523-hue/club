import { Club } from '@/types/club';

export const clubs: Club[] = [
    {
        id: 1,
        name: "Club RACE (레이스)",
        category: "EDM / House",
        region: "강남",
        rating: 4.8,
        location: "서울 강남구 강남대로 596",
        contact: "010-1234-5678",
        description: "강남 레이스는 독보적인 사운드와 화려한 조명으로 무장한 강남 최고의 EDM 클럽입니다. 넓은 스테이지와 VIP를 위한 프라이빗 존을 제공합니다.",
        minPrice: 300000,
        images: [
            "https://images.unsplash.com/photo-1574391884720-bbe37400581a?q=80&w=1200",
            "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200"
        ],
        nowPlaying: {
            title: "Titanium (ft. Sia)",
            artist: "David Guetta"
        },
        musicHistory: [
            { title: "Levels", artist: "Avicii" },
            { title: "Animals", artist: "Martin Garrix" },
            { title: "Wake Me Up", artist: "Avicii" }
        ],
        currentDJ: {
            name: "DJ SCV",
            bio: "강남 최고의 프로그레시브 하우스 장인. 10년 경력의 베테랑 디제이입니다.",
            image: "https://images.unsplash.com/photo-1598387181032-a3103a2db5b3?q=80&w=500",
            favoriteArtists: ["Eric Prydz", "Deadmau5", "Cristoph"],
            instagram: "dj_scv_official",
            youtubeSet: {
                title: "[Club bnb LIVE] DJ SCV - Progressive House Mix 2026",
                url: "https://youtube.com/watch?v=dQw4w9WgXcQ"
            }
        },
        tables: [
            { id: 't1', name: '스탠딩 테이블', price: 300000, capacity: 4 },
            { id: 't2', name: 'VIP 부스', price: 1500000, capacity: 6 },
            { id: 't3', name: 'VVIP 룸', price: 3000000, capacity: 12 },
        ],
        menu: [
            { id: 'm1', name: '돔 페리뇽 Luminous', price: 850000, isHotDeal: true },
            { id: 'm2', name: '아르망 드 브리냥', price: 1800000 },
            { id: 'm3', name: '모에 샹동 세트', price: 450000, isHotDeal: true },
        ]
    },
    {
        id: 2,
        name: "Jack Livin (잭리빈)",
        category: "Hip-Hop",
        region: "강남",
        rating: 4.6,
        location: "서울 강남구 도산대로 145",
        contact: "010-8765-4321",
        description: "잭리빈은 힙합과 글로벌 트렌드를 선도하는 신사동 최고의 핫플레이스입니다. 트렌디한 음악과 자유로운 분위기를 즐겨보세요.",
        minPrice: 250000,
        images: [
            "https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=1200",
            "https://images.unsplash.com/photo-1566737236500-c8ac40895481?q=80&w=1200"
        ],
        nowPlaying: {
            title: "Humble",
            artist: "Kendrick Lamar"
        },
        musicHistory: [
            { title: "Sicko Mode", artist: "Travis Scott" },
            { title: "God's Plan", artist: "Drake" },
            { title: "Old Town Road", artist: "Lil Nas X" }
        ],
        currentDJ: {
            name: "DJ SWAG",
            bio: "본토 힙합의 정수를 보여주는 믹싱 실력. 관객을 압도하는 에너지를 가졌습니다.",
            image: "https://images.unsplash.com/photo-1514525253361-b83f85df0f5c?q=80&w=500",
            favoriteArtists: ["Kendrick Lamar", "Travis Scott", "Drake"],
            instagram: "dj_swag_kr",
            youtubeSet: {
                title: "[Club bnb LIVE] DJ SWAG - Real HipHop Midnight Set",
                url: "https://youtube.com/watch?v=dQw4w9WgXcQ"
            }
        },
        tables: [
            { id: 't1', name: '바 테이블', price: 250000, capacity: 2 },
            { id: 't2', name: 'VIP 소파', price: 1000000, capacity: 5 },
            { id: 't3', name: '힙합 존 룸', price: 2000000, capacity: 8 },
        ],
        menu: [
            { id: 'm1', name: '헤네시 VSOP 세트', price: 550000 },
            { id: 'm2', name: '벨베디어 매그넘', price: 450000 },
        ]
    },
    {
        id: 3,
        name: "Club ARTRE (아르떼)",
        category: "Deep House",
        region: "강남",
        rating: 4.9,
        location: "서울 강남구 테헤란로 123",
        contact: "010-5555-5555",
        description: "아르떼는 예술적인 인테리어와 몰입감 넘치는 사운드 시스템을 자랑합니다. 고급스러운 밤을 원하는 당신을 위한 완벽한 선택입니다.",
        minPrice: 200000,
        images: [
            "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200",
            "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200"
        ],
        nowPlaying: {
            title: "Innerbloom",
            artist: "RÜFÜS DU SOL"
        },
        musicHistory: [
            { title: "Afterlight", artist: "ZHU" },
            { title: "Glue", artist: "Bicep" },
            { title: "Breathe", artist: "CamelPhat" }
        ],
        currentDJ: {
            name: "DJ NOIR",
            bio: "딥 미니멀리즘의 극치. 몽환적인 밤을 설계하는 사운드 아티스트입니다.",
            image: "https://images.unsplash.com/photo-1571266028243-e4733b0f0bb1?q=80&w=500",
            favoriteArtists: ["ZHU", "Boris Brejcha", "Maceo Plex"],
            instagram: "noir_sound_design",
            youtubeSet: {
                title: "[Club bnb LIVE] DJ NOIR - Deep & Minimal Journey",
                url: "https://youtube.com/watch?v=dQw4w9WgXcQ"
            }
        },
        tables: [
            { id: 't1', name: '스탠딩', price: 200000, capacity: 3 },
            { id: 't2', name: '라운지 부스', price: 800000, capacity: 6 },
        ],
        menu: [
            { id: 'm1', name: '그레이 구스', price: 350000 },
            { id: 'm2', name: '패트론 실버', price: 400000 },
        ]
    },
    {
        id: 4,
        name: "Club TIMES (타임즈)",
        category: "EDM",
        region: "강남",
        rating: 4.5,
        location: "서울 강남구 도산대로 201",
        contact: "010-4444-4444",
        description: "타임즈는 멈추지 않는 에너지와 압도적인 스케일을 자랑합니다. 최고의 DJ 라인업과 함께 잊지 못할 밤을 선사합니다.",
        minPrice: 180000,
        images: [
            "https://images.unsplash.com/photo-1566737236500-c8ac40895481?q=80&w=1200"
        ],
        nowPlaying: {
            title: "Clarity",
            artist: "Zedd"
        },
        musicHistory: [
            { title: "Stay The Night", artist: "Zedd" },
            { title: "Spectrum", artist: "Zedd" }
        ],
        currentDJ: {
            name: "DJ FLASH",
            bio: "페스티벌 에너지의 화신. 화려한 퍼포먼스로 무대를 장악합니다.",
            image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=500",
            favoriteArtists: ["Zedd", "Alesso", "Hardwell"],
            instagram: "flash_the_dj",
            youtubeSet: {
                title: "[Club bnb LIVE] DJ FLASH - EDM Festival Anthem Mix",
                url: "https://youtube.com/watch?v=dQw4w9WgXcQ"
            }
        },
        tables: [
            { id: 't1', name: '메인 스테이지 부스', price: 1200000, capacity: 8 },
        ],
        menu: [
            { id: 'm1', name: '봄베이 사파이어 세트', price: 280000 },
        ]
    },
    {
        id: 5,
        name: "힙합클럽 5 (Club 5)",
        category: "Hip-Hop",
        region: "홍대",
        rating: 4.7,
        location: "서울 마포구 와우산로 78",
        contact: "010-3333-3333",
        description: "홍대 힙합의 심장. Club 5는 정통 힙합 사운드와 젊은 에너지가 넘치는 곳입니다.",
        minPrice: 150000,
        images: [
            "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=1200"
        ],
        nowPlaying: {
            title: "California Love",
            artist: "2Pac"
        },
        musicHistory: [
            { title: "Gin and Juice", artist: "Snoop Dogg" },
            { title: "Juicy", artist: "The Notorious B.I.G." }
        ],
        currentDJ: {
            name: "DJ B-FREE",
            bio: "언더그라운드 힙합 씬의 절대 강자. 누구보다 묵직한 베이스를 들려줍니다.",
            image: "https://images.unsplash.com/photo-1520127877038-ed23000679f1?q=80&w=500",
            favoriteArtists: ["2Pac", "Snoop Dogg", "The Notorious B.I.G."],
            instagram: "b_free_official",
            youtubeSet: {
                title: "[Club bnb LIVE] DJ B-FREE - Old School Classic Mix",
                url: "https://youtube.com/watch?v=dQw4w9WgXcQ"
            }
        },
        tables: [
            { id: 't1', name: '홀 테이블', price: 150000, capacity: 4 },
        ],
        menu: [
            { id: 'm1', name: '예거마이스터 세트', price: 180000 },
        ]
    },
    {
        id: 6,
        name: "Triple Seven (777)",
        category: "EDM",
        region: "이태원",
        rating: 4.4,
        location: "서울 용산구 이태원동 123",
        contact: "010-2222-2222",
        description: "화려한 퍼포먼스와 함께 즐기는 초대형 일렉트로닉 클럽입니다.",
        minPrice: 110000,
        images: [
            "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200"
        ],
        nowPlaying: {
            title: "Pressure",
            artist: "Alesso"
        },
        musicHistory: [
            { title: "Calling", artist: "Sebastian Ingrosso" },
            { title: "Under Control", artist: "Calvin Harris" }
        ],
        currentDJ: {
            name: "DJ SEVEN",
            bio: "이태원의 밤을 책임지는 EDM 마스터. 감각적인 리믹스로 유명합니다.",
            image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=500",
            favoriteArtists: ["Calvin Harris", "Sebastian Ingrosso", "Axwell"],
            instagram: "dj_seven_itaewon",
            youtubeSet: {
                title: "[Club bnb LIVE] DJ SEVEN - Itaewon Night EDM Mix",
                url: "https://youtube.com/watch?v=dQw4w9WgXcQ"
            }
        },
        tables: [
            { id: 't1', name: '하이엔드 부스', price: 500000, capacity: 6 },
        ],
        menu: [
            { id: 'm1', name: '잭 다니엘 세트', price: 220000 },
        ]
    },
];

export function getClub(id: number | string): Club | undefined {
    return clubs.find(c => c.id === Number(id));
}
