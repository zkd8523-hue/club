# 작업지시서 #03: 이미지 최적화 (next/image)

## 🎯 목표
일반 `<img>` 태그를 Next.js `<Image>` 컴포넌트로 교체하여 성능 향상

## 📍 프로젝트 경로
`/Users/gimmingi/anti`

---

## 왜 next/image를 사용해야 하는가?

### 문제점 (현재)
```javascript
// HotDeals.js
<img src={deal.image} alt={deal.clubName} className={styles.image} />
```
- ❌ 자동 최적화 없음
- ❌ 레이아웃 시프트 발생 가능
- ❌ Lazy loading 없음
- ❌ WebP 자동 변환 없음

### 해결 (next/image)
```typescript
import Image from 'next/image';
<Image
  src={deal.image}
  alt={deal.clubName}
  width={800}
  height={600}
  className={styles.image}
/>
```
- ✅ 자동 이미지 최적화
- ✅ CLS(Cumulative Layout Shift) 방지
- ✅ 자동 Lazy loading
- ✅ 자동 WebP 변환

---

## Step 1: 외부 이미지 도메인 설정

### 1.1 `next.config.js` 수정
프로젝트 루트에 `next.config.js` 파일 생성 또는 수정:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
```

---

## Step 2: 컴포넌트별 적용

### 2.1 HotDeals.tsx 수정

```typescript
'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import styles from './HotDeals.module.css';
import Link from 'next/link';
import CountdownTimer from '@/components/ui/CountdownTimer';

// ... HOT_DEALS_DATA

export default function HotDeals() {
  const scrollRef = useRef(null);

  const scroll = (direction: 'left' | 'right') => {
    // ...
  };

  return (
    <section className={styles.hotDealsSection}>
      {/* ... */}

      <div className={styles.carouselContainer} ref={scrollRef}>
        {HOT_DEALS_DATA.map((deal) => (
          <div key={deal.id} className={styles.dealCard}>
            <Link href={`/clubs/${deal.id}`} className={styles.imageLink}>
              <div className={styles.imageWrapper}>
                <Image
                  src={deal.image}
                  alt={deal.clubName}
                  width={800}
                  height={600}
                  className={styles.image}
                  priority={deal.id <= 2}  // 첫 2개는 우선 로딩
                />
                <div className={styles.overlay}>
                  <span className={styles.clubName}>{deal.clubName}</span>
                </div>
              </div>
            </Link>
            {/* ... */}
          </div>
        ))}
      </div>
    </section>
  );
}
```

**CSS 수정** (`HotDeals.module.css`):
```css
.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.imageWrapper {
  position: relative;
  width: 100%;
  height: 250px;  /* 명시적 높이 */
  overflow: hidden;
  border-radius: 12px;
}
```

---

### 2.2 Auction.tsx 수정

```typescript
'use client';

import Image from 'next/image';
import { useState } from 'react';
import styles from './Auction.module.css';
import Link from 'next/link';
import CountdownTimer from '@/components/ui/CountdownTimer';

// ... INITIAL_AUCTIONS

export default function Auction() {
  const [auctions, setAuctions] = useState(INITIAL_AUCTIONS);
  const [animatingId, setAnimatingId] = useState<number | null>(null);

  // ...

  return (
    <section className={styles.auctionSection}>
      {/* ... */}

      <div className={styles.grid}>
        {auctions.map((auction) => (
          <div key={auction.id} className={styles.auctionCard}>
            <div className={styles.imageWrapper}>
              <Image
                src={auction.image}
                alt={auction.clubName}
                width={800}
                height={600}
                className={styles.image}
                priority
              />
              <div className={styles.timeTag}>
                <CountdownTimer initialSeconds={auction.expiresIn} format="short" /> 남음
              </div>
              {/* ... */}
            </div>
            {/* ... */}
          </div>
        ))}
      </div>
    </section>
  );
}
```

---

### 2.3 ClubCard.tsx 수정

**BEFORE:**
```typescript
<div className={styles.imagePlaceholder}>
  {/* In real app, next/image here */}
  IMG
</div>
```

**AFTER:**
```typescript
import Image from 'next/image';
import styles from "./ClubCard.module.css";
import Button from "../ui/Button";
import Link from "next/link";
import { Club } from '@/types/club';

interface ClubCardProps {
  club: Club;
}

export default function ClubCard({ club }: ClubCardProps) {
  // clubs.js의 첫 번째 이미지 사용
  const imageUrl = club.images?.[0] || 'https://images.unsplash.com/photo-1574391884720-bbe37400581a?q=80&w=800';

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <div className={styles.imageWrapper}>
          <Image
            src={imageUrl}
            alt={club.name}
            width={400}
            height={300}
            className={styles.clubImage}
          />
        </div>
        <div className={styles.badge}>{club.category || "EDM"}</div>
      </div>
      {/* ... 나머지 코드 */}
    </div>
  );
}
```

**CSS 추가** (`ClubCard.module.css`):
```css
.imageWrapper {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: 12px 12px 0 0;
}

.clubImage {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.card:hover .clubImage {
  transform: scale(1.05);
}

/* 기존 imagePlaceholder 삭제 */
```

---

### 2.4 Clubs 페이지 수정 (`src/app/clubs/page.tsx`)

```typescript
import Image from 'next/image';

export default function ClubsPage() {
  // ...

  return (
    <div className={styles.container}>
      {/* ... */}

      <div className={styles.clubGrid}>
        {filteredClubs.map(club => (
          <article key={club.id} className={styles.clubCard}>
            <div
              className={styles.imageWrapper}
              onClick={() => toggleMusic(club.id)}
            >
              <Image
                src={club.images[0]}
                alt={club.name}
                width={800}
                height={600}
                className={styles.img}
              />
              {/* ... */}
            </div>

            {/* DJ 프로필 이미지 */}
            <div className={`${styles.djDetailPanel} ${openDjId === club.id ? styles.showDj : ''}`}>
              <div className={styles.djMain}>
                <Image
                  src={club.currentDJ.image}
                  alt={club.currentDJ.name}
                  width={120}
                  height={120}
                  className={styles.djProfileImg}
                />
                {/* ... */}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
```

---

### 2.5 데이터 파일 수정 (`src/data/clubs.ts`)

page.js의 featuredClubs에도 images 추가:

```typescript
// src/app/page.tsx
export default function Home() {
  const featuredClubs = [
    {
      id: 1,
      name: "Club RACE (레이스)",
      category: "EDM / House",
      rating: 4.8,
      location: "서울 강남",
      minPrice: "₩300,000",
      images: ["https://images.unsplash.com/photo-1574391884720-bbe37400581a?q=80&w=800"]
    },
    // ... 나머지도 images 속성 추가
  ];
}
```

---

## Step 3: 빌드 및 테스트

### 3.1 개발 서버 실행
```bash
npm run dev
```

### 3.2 확인 사항
- [ ] 모든 이미지가 정상 표시되는지
- [ ] 이미지 로딩 시 레이아웃 시프트가 없는지
- [ ] 스크롤 시 lazy loading이 작동하는지
- [ ] hover 효과가 정상 작동하는지

### 3.3 프로덕션 빌드
```bash
npm run build
npm run start
```

---

## ✅ 체크리스트

- [ ] `next.config.js` 설정 완료
- [ ] `HotDeals.tsx` Image 적용
- [ ] `Auction.tsx` Image 적용
- [ ] `ClubCard.tsx` Image 적용 (imagePlaceholder 제거)
- [ ] `Clubs 페이지` Image 적용 (클럽 & DJ 이미지)
- [ ] 모든 이미지 CSS 스타일 조정
- [ ] `npm run dev` 정상 작동
- [ ] `npm run build` 성공
- [ ] 이미지 로딩 성능 향상 확인

---

## 🎯 기대 효과
- 이미지 로딩 속도 **30-50% 향상**
- 자동 WebP 변환으로 **용량 20-30% 감소**
- CLS 점수 개선
- Lighthouse 성능 점수 상승

---

## 📝 완료 후 다음 단계
→ `04_inline_styles_cleanup.md`
