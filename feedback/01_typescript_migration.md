# 작업지시서 #01: TypeScript 마이그레이션

## 🎯 목표
JavaScript 프로젝트를 TypeScript로 전환하여 타입 안정성 확보

## 📍 프로젝트 경로
`/Users/gimmingi/anti`

---

## Step 1: TypeScript 설정

### 1.1 패키지 설치
```bash
cd /Users/gimmingi/anti
npm install --save-dev typescript @types/react @types/node
```

### 1.2 tsconfig.json 생성
다음 내용으로 `tsconfig.json` 파일을 프로젝트 루트에 생성:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

## Step 2: 타입 정의 파일 생성

### 2.1 `src/types/club.ts` 생성
```typescript
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
```

### 2.2 `src/types/button.ts` 생성
```typescript
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'secondary';
  fullWidth?: boolean;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}
```

---

## Step 3: 파일 변환 (우선순위 순)

### 3.1 데이터 파일
- `src/data/clubs.js` → `src/data/clubs.ts`
  ```typescript
  import { Club } from '@/types/club';

  export const clubs: Club[] = [
    // 기존 데이터 유지
  ];

  export function getClub(id: number | string): Club | undefined {
    return clubs.find(c => c.id === Number(id));
  }
  ```

### 3.2 UI 컴포넌트
- `src/components/ui/Button.js` → `src/components/ui/Button.tsx`
  ```typescript
  import { ButtonProps } from '@/types/button';
  import styles from "./Button.module.css";

  export default function Button({
    children,
    variant = "primary",
    fullWidth = false,
    size = "medium",
    className = "",
    ...props
  }: ButtonProps) {
    // 기존 로직 유지
  }
  ```

### 3.3 Feature 컴포넌트
다음 순서대로 변환:
1. `src/components/features/ClubCard.js` → `.tsx`
2. `src/components/features/Hero.js` → `.tsx`
3. `src/components/features/HotDeals.js` → `.tsx`
4. `src/components/features/Auction.js` → `.tsx`
5. `src/components/features/CheckoutClient.js` → `.tsx`

**변환 예시 (ClubCard.tsx):**
```typescript
import { Club } from '@/types/club';
import styles from "./ClubCard.module.css";
import Button from "../ui/Button";
import Link from "next/link";

interface ClubCardProps {
  club: Club;
}

export default function ClubCard({ club }: ClubCardProps) {
  // 기존 로직 유지
}
```

### 3.4 Layout 컴포넌트
1. `src/components/layout/Navbar.js` → `.tsx`
2. `src/components/layout/Footer.js` → `.tsx`

### 3.5 Page 컴포넌트
1. `src/app/layout.js` → `.tsx`
2. `src/app/page.js` → `.tsx`
3. `src/app/clubs/page.js` → `.tsx`
4. `src/app/membership/page.js` → `.tsx`
5. `src/app/checkout/[id]/page.js` → `.tsx`

**변환 예시 (checkout/[id]/page.tsx):**
```typescript
import { getClub } from "@/data/clubs";
import CheckoutClient from "@/components/features/CheckoutClient";
import { notFound } from "next/navigation";

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
    <div className="container" style={{ padding: '2rem 1.5rem' }}>
      <CheckoutClient club={club} />
    </div>
  );
}
```

---

## Step 4: 빌드 확인

```bash
npm run build
```

오류 발생 시 타입 에러를 수정하고 다시 빌드

---

## ✅ 체크리스트

- [ ] TypeScript 패키지 설치 완료
- [ ] tsconfig.json 생성
- [ ] src/types/club.ts 생성
- [ ] src/types/button.ts 생성
- [ ] src/data/clubs.ts 변환
- [ ] src/components/ui/Button.tsx 변환
- [ ] 모든 Feature 컴포넌트 변환 (5개)
- [ ] 모든 Layout 컴포넌트 변환 (2개)
- [ ] 모든 Page 컴포넌트 변환 (5개)
- [ ] `npm run build` 성공
- [ ] `npm run dev` 정상 실행 확인

---

## 🚨 주의사항

1. **한 번에 1-2개 파일씩** 변환 (한꺼번에 하면 에러 추적 어려움)
2. 변환 후 즉시 `npm run dev`로 확인
3. CSS Module 파일은 변환 불필요 (.css 그대로 유지)
4. `'use client'` 디렉티브 유지 필수

---

## 📝 완료 후 다음 단계
→ `02_code_deduplication.md`
