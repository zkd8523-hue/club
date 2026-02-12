export const clubs = [
    {
        id: 1,
        name: "Club RACE (레이스)",
        category: "EDM / House",
        rating: 4.8,
        location: "서울 강남구 강남대로 596",
        contact: "010-1234-5678",
        description: "강남 레이스는 독보적인 사운드와 화려한 조명으로 무장한 강남 최고의 EDM 클럽입니다. 넓은 스테이지와 VIP를 위한 프라이빗 존을 제공합니다.",
        minPrice: 300000,
        images: [
            "https://images.unsplash.com/photo-1574391884720-bbe37400581a?q=80&w=1200",
            "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200"
        ],
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
        category: "Hip-Hop / Global",
        rating: 4.6,
        location: "서울 강남구 도산대로 145",
        contact: "010-8765-4321",
        description: "잭리빈은 힙합과 글로벌 트렌드를 선도하는 신사동 최고의 핫플레이스입니다. 트렌디한 음악과 자유로운 분위기를 즐겨보세요.",
        minPrice: 250000,
        images: [
            "https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=1200",
            "https://images.unsplash.com/photo-1566737236500-c8ac40895481?q=80&w=1200"
        ],
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
        category: "Deep House / Techno",
        rating: 4.9,
        location: "서울 강남구 테헤란로 123",
        contact: "010-5555-5555",
        description: "아르떼는 예술적인 인테리어와 몰입감 넘치는 사운드 시스템을 자랑합니다. 고급스러운 밤을 원하는 당신을 위한 완벽한 선택입니다.",
        minPrice: 200000,
        images: [
            "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200",
            "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200"
        ],
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
        rating: 4.5,
        location: "서울 강남구 도산대로 201",
        contact: "010-4444-4444",
        description: "타임즈는 멈추지 않는 에너지와 압도적인 스케일을 자랑합니다. 최고의 DJ 라인업과 함께 잊지 못할 밤을 선사합니다.",
        minPrice: 180000,
        images: [
            "https://images.unsplash.com/photo-1566737236500-c8ac40895481?q=80&w=1200"
        ],
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
        rating: 4.7,
        location: "서울 마포구 와우산로 78",
        contact: "010-3333-3333",
        description: "홍대 힙합의 심장. Club 5는 정통 힙합 사운드와 젊은 에너지가 넘치는 곳입니다.",
        minPrice: 150000,
        images: [
            "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=1200"
        ],
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
        category: "EDM / Remix",
        rating: 4.4,
        location: "서울 서초구 서초대로 355",
        contact: "010-2222-2222",
        description: "화려한 퍼포먼스와 함께 즐기는 초대형 일렉트로닉 클럽입니다.",
        minPrice: 110000,
        images: [
            "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200"
        ],
        tables: [
            { id: 't1', name: '하이엔드 부스', price: 500000, capacity: 6 },
        ],
        menu: [
            { id: 'm1', name: '잭 다니엘 세트', price: 220000 },
        ]
    },
];

export function getClub(id) {
    return clubs.find(c => c.id === Number(id));
}
