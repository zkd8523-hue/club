# 작업지시서 #07: 인증 시스템 (NextAuth.js)

## 🎯 목표
NextAuth.js를 사용하여 소셜 로그인 및 회원 인증 시스템 구축

## 📍 프로젝트 경로
`/Users/gimmingi/anti`

---

## Step 1: NextAuth 설치

```bash
cd /Users/gimmingi/anti
npm install next-auth
npm install @auth/core
```

---

## Step 2: 환경 변수 설정

### 2.1 `.env.local` 추가

```bash
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-change-this-in-production

# Google OAuth (선택)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth (선택)
GITHUB_ID=your-github-id
GITHUB_SECRET=your-github-secret

# Kakao OAuth (추천 - 한국 사용자용)
KAKAO_CLIENT_ID=your-kakao-rest-api-key
KAKAO_CLIENT_SECRET=your-kakao-client-secret
```

### 2.2 NEXTAUTH_SECRET 생성

```bash
openssl rand -base64 32
```

생성된 값을 `NEXTAUTH_SECRET`에 입력

---

## Step 3: NextAuth 설정

### 3.1 `src/app/api/auth/[...nextauth]/route.ts` 생성

```typescript
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import KakaoProvider from "next-auth/providers/kakao";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    // 이메일/비밀번호 로그인
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // 실제로는 DB에서 확인
        // 지금은 테스트용
        if (credentials?.email === "test@clubbnb.com" && credentials?.password === "password") {
          return {
            id: "1",
            name: "Test User",
            email: "test@clubbnb.com",
            role: "user",
          };
        }
        return null;
      }
    }),

    // Google 로그인
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),

    // GitHub 로그인
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),

    // Kakao 로그인
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || "",
      clientSecret: process.env.KAKAO_CLIENT_SECRET || "",
    }),
  ],

  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },

  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.role = (user as any).role || 'user';
        token.membershipTier = (user as any).membershipTier || 'standard';
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).membershipTier = token.membershipTier;
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
```

---

## Step 4: 타입 정의

### 4.1 `src/types/next-auth.d.ts` 생성

```typescript
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: 'user' | 'partner' | 'admin';
      membershipTier?: 'standard' | 'gold' | 'elite';
    } & DefaultSession["user"];
  }

  interface User {
    role: 'user' | 'partner' | 'admin';
    membershipTier?: 'standard' | 'gold' | 'elite';
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: 'user' | 'partner' | 'admin';
    membershipTier?: 'standard' | 'gold' | 'elite';
  }
}
```

---

## Step 5: 로그인 페이지 생성

### 5.1 `src/app/auth/signin/page.tsx` 생성

```typescript
'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './signin.module.css';
import Button from '@/components/ui/Button';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.ok) {
      router.push('/');
    } else {
      alert('로그인 실패: 이메일 또는 비밀번호를 확인하세요.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className="text-gradient">Clubbnb 로그인</h1>
        <p className={styles.subtitle}>최고의 나이트라이프를 경험하세요</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
          <Button type="submit" fullWidth loading={loading}>
            로그인
          </Button>
        </form>

        <div className={styles.divider}>또는</div>

        <div className={styles.socialButtons}>
          <button
            onClick={() => signIn('google', { callbackUrl: '/' })}
            className={styles.socialBtn}
          >
            <span>🔍</span> Google로 계속하기
          </button>

          <button
            onClick={() => signIn('github', { callbackUrl: '/' })}
            className={styles.socialBtn}
          >
            <span>🐱</span> GitHub로 계속하기
          </button>

          <button
            onClick={() => signIn('kakao', { callbackUrl: '/' })}
            className={styles.socialBtn}
            style={{ background: '#FEE500', color: '#000' }}
          >
            <span>💬</span> Kakao로 계속하기
          </button>
        </div>

        <p className={styles.signup}>
          계정이 없으신가요? <a href="/auth/signup">회원가입</a>
        </p>
      </div>
    </div>
  );
}
```

### 5.2 `src/app/auth/signin/signin.module.css` 생성

```css
.container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 16px;
  padding: 3rem;
  max-width: 450px;
  width: 100%;
  backdrop-filter: blur(10px);
}

.card h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  text-align: center;
}

.subtitle {
  text-align: center;
  color: #aaa;
  margin-bottom: 2rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.input {
  padding: 1rem;
  background: var(--background);
  border: 1px solid var(--card-border);
  border-radius: 8px;
  color: var(--foreground);
  font-size: 1rem;
}

.input:focus {
  outline: none;
  border-color: var(--primary);
}

.divider {
  text-align: center;
  color: #666;
  margin: 2rem 0;
  position: relative;
}

.divider::before,
.divider::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 40%;
  height: 1px;
  background: var(--card-border);
}

.divider::before {
  left: 0;
}

.divider::after {
  right: 0;
}

.socialButtons {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.socialBtn {
  padding: 1rem;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 8px;
  color: var(--foreground);
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s;
}

.socialBtn:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: var(--primary);
}

.signup {
  text-align: center;
  margin-top: 2rem;
  color: #888;
}

.signup a {
  color: var(--primary);
  text-decoration: none;
}

.signup a:hover {
  text-decoration: underline;
}
```

---

## Step 6: SessionProvider 추가

### 6.1 `src/components/providers/SessionProvider.tsx` 생성

```typescript
'use client';

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

export default function SessionProvider({ children }: { children: ReactNode }) {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
}
```

### 6.2 `src/app/layout.tsx` 수정

```typescript
import SessionProvider from '@/components/providers/SessionProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SessionProvider>
          <Navbar />
          <main className={styles.main}>
            {children}
          </main>
          <Footer />
          <CartSidebar />
        </SessionProvider>
      </body>
    </html>
  );
}
```

---

## Step 7: Navbar에 인증 상태 반영

### 7.1 `src/components/layout/Navbar.tsx` 수정

```typescript
'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { useUIStore } from "@/store/uiStore";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const cartItemCount = useCartStore(state => state.getItemCount());
  const toggleCart = useUIStore(state => state.toggleCart);

  // ... 기존 useEffect

  const handleAuthClick = () => {
    if (session) {
      // 로그인 상태 - 드롭다운 메뉴 표시 또는 로그아웃
      if (confirm(`${session.user?.name}님, 로그아웃 하시겠습니까?`)) {
        signOut({ callbackUrl: '/' });
      }
    } else {
      // 비로그인 상태 - 로그인 페이지로 이동
      window.location.href = '/auth/signin';
    }
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <Link href="/#home" className={styles.logo}>
          Club<span>bnb</span>
        </Link>

        <div className={styles.navLinks}>
          {/* 기존 링크들 */}
        </div>

        <div className={styles.actions}>
          <button className={styles.cartBtn} onClick={toggleCart}>
            🛒 Cart
            {cartItemCount > 0 && (
              <span className={styles.cartBadge}>{cartItemCount}</span>
            )}
          </button>

          <button className={styles.loginBtn} onClick={handleAuthClick}>
            {status === 'loading'
              ? '...'
              : session
                ? `👤 ${session.user?.name}`
                : '로그인'}
          </button>

          <Link href="/partner/login" className={styles.partnerBtn}>
            PARTNER
          </Link>
        </div>
      </div>
    </nav>
  );
}
```

---

## Step 8: 보호된 라우트 생성

### 8.1 `src/middleware.ts` 생성 (프로젝트 루트)

```typescript
export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    '/checkout/:path*',
    '/membership',
    '/profile/:path*',
  ]
};
```

이제 `/checkout`, `/membership` 등은 로그인 필수!

---

## ✅ 체크리스트

- [ ] NextAuth 설치 완료
- [ ] `.env.local`에 NEXTAUTH_SECRET 설정
- [ ] `src/app/api/auth/[...nextauth]/route.ts` 생성
- [ ] `src/types/next-auth.d.ts` 생성
- [ ] `src/app/auth/signin/page.tsx` 생성
- [ ] SessionProvider 추가
- [ ] Navbar 인증 상태 반영
- [ ] middleware.ts 보호 라우트 설정
- [ ] 로그인/로그아웃 테스트
- [ ] 소셜 로그인 테스트 (OAuth 설정 필요)

---

## 🔐 OAuth 설정 가이드

### Google OAuth
1. https://console.cloud.google.com
2. 프로젝트 생성 → OAuth 동의 화면 설정
3. Credentials → OAuth 2.0 클라이언트 ID 생성
4. 승인된 리디렉션 URI: `http://localhost:3000/api/auth/callback/google`

### Kakao OAuth
1. https://developers.kakao.com
2. 애플리케이션 추가
3. REST API 키 복사 → `KAKAO_CLIENT_ID`
4. Redirect URI: `http://localhost:3000/api/auth/callback/kakao`

---

## 📝 완료 후 다음 단계
→ `08_payment_integration.md`
