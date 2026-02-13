# 작업지시서 #04: 인라인 스타일 정리

## 🎯 목표
인라인 `style={{...}}` 속성을 CSS Module로 이동하여 유지보수성 및 성능 향상

## 📍 프로젝트 경로
`/Users/gimmingi/anti`

---

## 문제 현황

### 주요 문제 파일
1. `src/app/page.tsx` - **60줄 이상** 인라인 스타일
2. `src/app/membership/page.tsx` - 일부 인라인 스타일
3. `src/app/checkout/[id]/page.tsx` - padding 인라인 스타일

### 왜 문제인가?
```typescript
// ❌ 나쁜 예
<div style={{ padding: '4rem 1.5rem', marginTop: '-50px' }}>
```
- 재사용 불가
- 타입 체크 없음
- 테마 변경 어려움
- 성능 저하 (매 렌더링마다 새 객체 생성)

```css
/* ✅ 좋은 예 */
.section {
  padding: 4rem 1.5rem;
  margin-top: -50px;
}
```

---

## Step 1: Home 페이지 정리

### 1.1 `src/app/page.module.css` 생성

```css
.home {
  /* 기본 컨테이너 */
}

.clubSection {
  padding: 4rem 1.5rem;
  margin-top: -50px;
  position: relative;
  z-index: 1;
}

.clubSectionTitle {
  font-size: 2rem;
  margin-bottom: 2rem;
  font-weight: 700;
}

.fireEmoji {
  color: var(--primary);
  font-size: 0.6em;
  vertical-align: middle;
  margin-left: 0.5rem;
}

.clubGrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.partySection {
  background: var(--card-bg);
  padding: 4rem 0;
  border-top: 1px solid var(--card-border);
  border-bottom: 1px solid var(--card-border);
}

.partyContent {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 2rem;
}

.partyText {
  flex: 1;
  min-width: 300px;
}

.partyTitle {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.partyDescription {
  color: #aaa;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.findPartyBtn {
  background: var(--foreground);
  color: var(--background);
  padding: 1rem 2rem;
  border-radius: 99px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: transform 0.2s;
}

.findPartyBtn:hover {
  transform: scale(1.05);
}

.partyVisual {
  flex: 1;
  min-width: 300px;
  height: 300px;
  background: linear-gradient(135deg, rgba(157,0,255,0.2), rgba(255,0,85,0.2));
  border-radius: 24px;
  border: 1px solid rgba(255,255,255,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255,255,255,0.5);
}
```

### 1.2 `src/app/page.tsx` 수정

```typescript
import Hero from "@/components/features/Hero";
import HotDeals from "@/components/features/HotDeals";
import Auction from "@/components/features/Auction";
import ClubCard from "@/components/features/ClubCard";
import styles from "./page.module.css";

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
    {
      id: 2,
      name: "Jack Livin (잭리빈)",
      category: "Hip-Hop",
      rating: 4.6,
      location: "서울 신사",
      minPrice: "₩250,000",
      images: ["https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=800"]
    },
    {
      id: 3,
      name: "힙합클럽 5 (Club 5)",
      category: "Hip-Hop",
      rating: 4.9,
      location: "서울 홍대",
      minPrice: "₩200,000",
      images: ["https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=800"]
    },
    {
      id: 4,
      name: "Club Aura (아우라)",
      category: "EDM",
      rating: 4.7,
      location: "서울 홍대",
      minPrice: "₩150,000",
      images: ["https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800"]
    },
  ];

  return (
    <div id="home" className={styles.home}>
      <Hero />
      <HotDeals />

      <div id="auction">
        <Auction />
      </div>

      <section className={`container ${styles.clubSection}`}>
        <h2 className={styles.clubSectionTitle}>
          오늘의 추천 클럽 (Trending)
          <span className={styles.fireEmoji}>🔥</span>
        </h2>

        <div className={styles.clubGrid}>
          {featuredClubs.map(club => (
            <ClubCard key={club.id} club={club} />
          ))}
        </div>
      </section>

      <section id="party-section" className={styles.partySection}>
        <div className="container">
          <div className={styles.partyContent}>
            <div className={styles.partyText}>
              <h2 className={`text-gradient ${styles.partyTitle}`}>
                함께하면 더 즐거운 파티.<br />조각(N-Pay)으로 부담없이.
              </h2>
              <p className={styles.partyDescription}>
                혼자 가기 망설여지거나 가격이 부담되시나요? <br />
                '파티 조각' 기능을 통해 마음 맞는 사람들과 테이블을 공유하고 비용을 나눠보세요.
              </p>
              <button className={styles.findPartyBtn}>
                파티 찾기 (Find Party)
              </button>
            </div>

            <div className={styles.partyVisual}>
              Feature Visual (Party Mode)
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
```

---

## Step 2: Membership 페이지 정리

### 2.1 `src/app/membership/Membership.module.css` 확인 및 수정

기존 파일이 있다면 다음 스타일 추가:

```css
.container {
  padding: 4rem 1.5rem;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
}

.header h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.header p {
  color: #aaa;
  font-size: 1.1rem;
}

/* 나머지 스타일은 기존 유지 */
```

### 2.2 `src/app/membership/page.tsx` 수정

```typescript
import Button from "@/components/ui/Button";
import styles from "./Membership.module.css";

export default function MembershipPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className="text-gradient">Clubbnb Gold Membership</h1>
        <p>Unlock the most exclusive nightlife experiences in Korea.</p>
      </div>

      <div className={styles.pricingGrid}>
        {/* 나머지 코드 유지 */}
      </div>
    </div>
  );
}
```

---

## Step 3: Checkout 페이지 정리

### 3.1 `src/components/features/Checkout.module.css` 확인 및 추가

```css
.container {
  padding: 2rem 1.5rem;
}

/* 기존 wrapper 클래스가 있다면 그대로 사용 */
```

### 3.2 `src/app/checkout/[id]/page.tsx` 수정

```typescript
import { getClub } from "@/data/clubs";
import CheckoutClient from "@/components/features/CheckoutClient";
import { notFound } from "next/navigation";
import styles from "./checkout.module.css";

interface CheckoutPageProps {
  params: {
    id: string;
  };
}

export default function CheckoutPage({ params }: CheckoutPageProps) {
  const club = getClub(params.id);

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

`src/app/checkout/[id]/checkout.module.css` 생성:
```css
.container {
  padding: 2rem 1.5rem;
}
```

---

## Step 4: Layout 파일 정리

### 4.1 `src/app/layout.tsx` 수정

```typescript
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import styles from "./layout.module.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Clubbnb | Premium Nightlife Booking",
  description: "Book tables, bottles, and find party groups for the best clubs.",
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Navbar />
        <main className={styles.main}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
```

`src/app/layout.module.css` 생성:
```css
.main {
  min-height: 100vh;
  padding-top: 80px;
}
```

---

## Step 5: Clubs 페이지 정리

### 5.1 `src/app/clubs/page.tsx` 확인

이미 CSS Module을 사용 중이므로 인라인 스타일 확인:

```typescript
// 59줄 - 인라인 스타일 제거
<div className={styles.regionInfo}>
  {club.region} · ★ {club.rating}
</div>
```

`Clubs.module.css`에 추가:
```css
.regionInfo {
  color: #aaa;
  font-size: 0.9rem;
  margin-top: 5px;
}
```

---

## ✅ 체크리스트

- [ ] `src/app/page.module.css` 생성
- [ ] `src/app/page.tsx` 모든 인라인 스타일 제거
- [ ] `src/app/membership/page.tsx` 인라인 스타일 제거
- [ ] `src/app/checkout/[id]/checkout.module.css` 생성
- [ ] `src/app/checkout/[id]/page.tsx` 인라인 스타일 제거
- [ ] `src/app/layout.module.css` 생성
- [ ] `src/app/layout.tsx` 인라인 스타일 제거
- [ ] `src/app/clubs/page.tsx` 인라인 스타일 제거
- [ ] 모든 페이지 UI 정상 확인
- [ ] `npm run dev` 정상 작동
- [ ] `npm run build` 성공

---

## 🎯 기대 효과
- 렌더링 성능 향상 (객체 재생성 제거)
- 스타일 재사용성 증가
- 타입 안정성 (CSS Module)
- 유지보수 용이성 향상

---

## 📝 완료 후 다음 단계
→ `05_state_management.md`
