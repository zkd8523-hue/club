# 작업지시서 #06: API 레이어 분리

## 🎯 목표
하드코딩된 데이터를 API 레이어로 분리하여 실제 백엔드 연동 준비

## 📍 프로젝트 경로
`/Users/gimmingi/anti`

---

## Step 1: API 라우트 생성 (Next.js API Routes)

### 1.1 클럽 API (`src/app/api/clubs/route.ts`)

```typescript
import { NextResponse } from 'next/server';
import { clubs } from '@/data/clubs';

export async function GET() {
  // 실제 DB 연동 시 여기서 데이터 fetch
  return NextResponse.json(clubs);
}
```

### 1.2 클럽 상세 API (`src/app/api/clubs/[id]/route.ts`)

```typescript
import { NextResponse } from 'next/server';
import { getClub } from '@/data/clubs';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const club = getClub(params.id);

  if (!club) {
    return NextResponse.json(
      { error: 'Club not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(club);
}
```

### 1.3 Hot Deals API (`src/app/api/hot-deals/route.ts`)

```typescript
import { NextResponse } from 'next/server';

const HOT_DEALS_DATA = [
  {
    id: 1,
    clubName: 'Club RACE (레이스)',
    image: 'https://images.unsplash.com/photo-1574391884720-bbe37400581a?q=80&w=800&auto=format&fit=crop',
    price: '₩150,000',
    time: '22:00 - 08:00',
    expiresIn: 3600 * 2 + 450,
  },
  // ... 나머지 데이터
];

export async function GET() {
  return NextResponse.json(HOT_DEALS_DATA);
}
```

### 1.4 Auction API (`src/app/api/auctions/route.ts`)

```typescript
import { NextResponse } from 'next/server';

const AUCTIONS_DATA = [
  {
    id: 1,
    clubName: 'Club RACE',
    itemName: 'VIP Stage Table (Premium Selection)',
    startPrice: 500000,
    currentBid: 720000,
    increment: 10000,
    bidders: 15,
    expiresIn: 1800,
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac40895481?q=80&w=800',
  },
  // ... 나머지 데이터
];

export async function GET() {
  return NextResponse.json(AUCTIONS_DATA);
}

export async function POST(request: Request) {
  const { auctionId, bidAmount } = await request.json();

  // 실제로는 DB에 저장
  // 여기서는 시뮬레이션
  return NextResponse.json({
    success: true,
    newBid: bidAmount,
    message: '입찰이 완료되었습니다.',
  });
}
```

---

## Step 2: API 클라이언트 함수 생성

### 2.1 `src/lib/api/clubs.ts` 생성

```typescript
import { Club } from '@/types/club';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export async function getClubs(): Promise<Club[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/clubs`, {
      cache: 'no-store', // 또는 'force-cache', revalidate 설정
    });

    if (!res.ok) {
      throw new Error('Failed to fetch clubs');
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching clubs:', error);
    return [];
  }
}

export async function getClubById(id: string | number): Promise<Club | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/clubs/${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching club:', error);
    return null;
  }
}

export async function searchClubs(query: string): Promise<Club[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/clubs?search=${encodeURIComponent(query)}`);

    if (!res.ok) {
      throw new Error('Failed to search clubs');
    }

    return res.json();
  } catch (error) {
    console.error('Error searching clubs:', error);
    return [];
  }
}
```

### 2.2 `src/lib/api/deals.ts` 생성

```typescript
import { HotDeal } from '@/types/club';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export async function getHotDeals(): Promise<HotDeal[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/hot-deals`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch hot deals');
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching hot deals:', error);
    return [];
  }
}
```

### 2.3 `src/lib/api/auctions.ts` 생성

```typescript
import { Auction } from '@/types/club';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export async function getAuctions(): Promise<Auction[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/auctions`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch auctions');
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching auctions:', error);
    return [];
  }
}

export async function placeBid(auctionId: number, bidAmount: number): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/auctions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ auctionId, bidAmount }),
    });

    if (!res.ok) {
      throw new Error('Failed to place bid');
    }

    return res.json();
  } catch (error) {
    console.error('Error placing bid:', error);
    return { success: false, message: '입찰에 실패했습니다.' };
  }
}
```

---

## Step 3: 컴포넌트 수정 (Server Components 활용)

### 3.1 Clubs 페이지를 Server Component로 변환

`src/app/clubs/page.tsx`:

```typescript
import { getClubs } from '@/lib/api/clubs';
import ClubsClient from './ClubsClient';

export default async function ClubsPage() {
  const clubs = await getClubs();

  return <ClubsClient initialClubs={clubs} />;
}
```

`src/app/clubs/ClubsClient.tsx` 생성:

```typescript
'use client';

import { useState } from 'react';
import { Club } from '@/types/club';
import styles from './Clubs.module.css';
import Image from 'next/image';

interface ClubsClientProps {
  initialClubs: Club[];
}

export default function ClubsClient({ initialClubs }: ClubsClientProps) {
  const [selectedRegion, setSelectedRegion] = useState('전체');
  const [openMusicId, setOpenMusicId] = useState<number | null>(null);
  const [openDjId, setOpenDjId] = useState<number | null>(null);

  const regions = ['전체', '강남', '홍대', '이태원', '부산', '대구'];

  const filteredClubs = selectedRegion === '전체'
    ? initialClubs
    : initialClubs.filter(club => club.region === selectedRegion);

  const toggleMusic = (id: number) => {
    setOpenMusicId(openMusicId === id ? null : id);
    if (openDjId === id) setOpenDjId(null);
  };

  const toggleDj = (id: number) => {
    setOpenDjId(openDjId === id ? null : id);
  };

  return (
    <div className={styles.container}>
      {/* 기존 UI 코드 그대로, clubs → filteredClubs */}
    </div>
  );
}
```

---

### 3.2 HotDeals를 Client Component로 유지하며 API 사용

`src/components/features/HotDeals.tsx`:

```typescript
'use client';

import { useState, useEffect, useRef } from 'react';
import { getHotDeals } from '@/lib/api/deals';
import { HotDeal } from '@/types/club';
import styles from './HotDeals.module.css';
import Image from 'next/image';
import Link from 'next/link';
import CountdownTimer from '@/components/ui/CountdownTimer';

export default function HotDeals() {
  const [deals, setDeals] = useState<HotDeal[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchDeals() {
      const data = await getHotDeals();
      setDeals(data);
      setLoading(false);
    }
    fetchDeals();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading hot deals...</div>;
  }

  return (
    <section className={styles.hotDealsSection}>
      {/* 기존 UI 코드, HOT_DEALS_DATA → deals */}
    </section>
  );
}
```

---

### 3.3 Checkout 페이지 수정

`src/app/checkout/[id]/page.tsx`:

```typescript
import { getClubById } from "@/lib/api/clubs";
import CheckoutClient from "@/components/features/CheckoutClient";
import { notFound } from "next/navigation";
import styles from "./checkout.module.css";

interface CheckoutPageProps {
  params: {
    id: string;
  };
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  const club = await getClubById(params.id);

  if (!club) {
    notFound();
  }

  return (
    <div className={`container ${styles.container}`}>
      <CheckoutClient club={club} />
    </div>
  );
}
```

---

## Step 4: 환경 변수 설정

### 4.1 `.env.local` 생성

```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 4.2 `.env.example` 생성 (git에 추가)

```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
# Production: https://your-domain.com
```

---

## Step 5: 에러 처리 개선

### 5.1 `src/components/ui/ErrorBoundary.tsx` 생성

```typescript
'use client';

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>문제가 발생했습니다.</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            다시 시도
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

---

## ✅ 체크리스트

- [ ] `src/app/api/clubs/route.ts` 생성
- [ ] `src/app/api/clubs/[id]/route.ts` 생성
- [ ] `src/app/api/hot-deals/route.ts` 생성
- [ ] `src/app/api/auctions/route.ts` 생성
- [ ] `src/lib/api/clubs.ts` 생성
- [ ] `src/lib/api/deals.ts` 생성
- [ ] `src/lib/api/auctions.ts` 생성
- [ ] Clubs 페이지 Server Component 분리
- [ ] HotDeals API 연동
- [ ] Checkout 페이지 API 연동
- [ ] `.env.local` 설정
- [ ] ErrorBoundary 적용
- [ ] `npm run dev` 정상 작동
- [ ] API 엔드포인트 테스트 (http://localhost:3000/api/clubs)

---

## 🎯 기대 효과
- 백엔드 연동 준비 완료
- Server Components로 초기 로딩 속성 향상
- API 변경 시 컴포넌트 수정 불필요
- 에러 처리 일관성 확보

---

## 📝 다음 단계
→ `07_authentication.md` (선택 사항)
→ `08_payment_integration.md` (선택 사항)
