# 작업지시서 #02: 중복 코드 제거

## 🎯 목표
중복된 코드를 공통 컴포넌트/유틸로 추출하여 유지보수성 향상

## 📍 프로젝트 경로
`/Users/gimmingi/anti`

---

## 문제 현황

### 중복 #1: CountdownTimer 컴포넌트
- **위치**: `HotDeals.js` (58-77줄), `Auction.js` (32-50줄)
- **문제**: 동일한 CountdownTimer 컴포넌트가 두 파일에 중복 정의됨

### 중복 #2: 스크롤 로직
- **위치**: `Navbar.js` (scrollToSection 함수)
- **문제**: 스크롤 계산 로직이 반복됨

---

## Step 1: CountdownTimer 공통화

### 1.1 공통 컴포넌트 생성
`src/components/ui/CountdownTimer.tsx` 파일 생성:

```typescript
'use client';

import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  initialSeconds: number;
  className?: string;
  format?: 'full' | 'short';  // full: HH:MM:SS, short: MM:SS
}

export default function CountdownTimer({
  initialSeconds,
  className = '',
  format = 'full'
}: CountdownTimerProps) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds <= 0) return;
    const interval = setInterval(() => {
      setSeconds(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  const formatTime = (totalSeconds: number): string => {
    if (format === 'short') {
      const m = Math.floor(totalSeconds / 60);
      const s = totalSeconds % 60;
      return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }

    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return <span className={className}>{formatTime(seconds)}</span>;
}
```

### 1.2 HotDeals.tsx 수정
기존 CountdownTimer 정의 **삭제**하고 import 추가:

```typescript
import CountdownTimer from '@/components/ui/CountdownTimer';
import styles from './HotDeals.module.css';
// ... 기타 imports

// 58-77줄의 CountdownTimer 정의 삭제

export default function HotDeals() {
  // ...

  // 127줄 사용 부분:
  <CountdownTimer initialSeconds={deal.expiresIn} className={styles.timer} />
}
```

### 1.3 Auction.tsx 수정
기존 CountdownTimer 정의 **삭제**하고 import 추가:

```typescript
import CountdownTimer from '@/components/ui/CountdownTimer';
import styles from './Auction.module.css';
// ... 기타 imports

// 32-50줄의 CountdownTimer 정의 삭제

export default function Auction() {
  // ...

  // 87줄 사용 부분:
  <CountdownTimer initialSeconds={auction.expiresIn} format="short" className={styles.timer} />
}
```

---

## Step 2: 스크롤 유틸 함수 생성

### 2.1 `src/utils/scroll.ts` 생성

```typescript
export function scrollToElement(elementId: string, offset: number = 80) {
  const element = document.getElementById(elementId);
  if (!element) return;

  const bodyRect = document.body.getBoundingClientRect().top;
  const elementRect = element.getBoundingClientRect().top;
  const elementPosition = elementRect - bodyRect;
  const offsetPosition = elementPosition - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
}

export function isHomePage(pathname: string): boolean {
  return pathname === '/';
}
```

### 2.2 Navbar.tsx 수정

```typescript
import { scrollToElement, isHomePage } from '@/utils/scroll';

export default function Navbar() {
  const pathname = usePathname();

  // ...

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (isHomePage(pathname)) {
      e.preventDefault();
      scrollToElement(id, 80);
    }
    // else: 자연스러운 Link 동작
  };

  // useEffect에서도 활용:
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    if (isHomePage(pathname) && window.location.hash) {
      const id = window.location.hash.replace('#', '');
      setTimeout(() => scrollToElement(id, 80), 100);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);
}
```

---

## Step 3: 기타 중복 제거

### 3.1 공통 상수 정의
`src/constants/regions.ts` 생성:

```typescript
export const REGIONS = ['전체', '강남', '홍대', '이태원', '부산', '대구'] as const;
export type Region = typeof REGIONS[number];
```

`src/app/clubs/page.tsx` 수정:
```typescript
import { REGIONS } from '@/constants/regions';

export default function ClubsPage() {
  const regions = REGIONS;
  // ...
}
```

### 3.2 가격 포맷팅 유틸
`src/utils/format.ts` 생성:

```typescript
export function formatPrice(price: number, currency: string = '₩'): string {
  return `${currency}${price.toLocaleString()}`;
}

export function formatTime(time: string): string {
  return time; // 필요시 변환 로직 추가
}
```

---

## ✅ 체크리스트

- [ ] `src/components/ui/CountdownTimer.tsx` 생성
- [ ] `HotDeals.tsx`에서 중복 제거 및 import
- [ ] `Auction.tsx`에서 중복 제거 및 import
- [ ] `src/utils/scroll.ts` 생성
- [ ] `Navbar.tsx`에서 스크롤 유틸 적용
- [ ] `src/constants/regions.ts` 생성
- [ ] `src/utils/format.ts` 생성
- [ ] `npm run dev` 정상 작동 확인
- [ ] 타이머가 두 페이지에서 모두 정상 작동
- [ ] 내비게이션 스크롤 정상 작동

---

## 🎯 기대 효과
- 코드 중복 **60%** 감소
- CountdownTimer 수정 시 **한 곳만** 수정
- 유틸 함수 재사용성 증가

---

## 📝 완료 후 다음 단계
→ `03_image_optimization.md`
