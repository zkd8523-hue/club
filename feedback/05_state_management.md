# 작업지시서 #05: 상태 관리 도입 (Zustand)

## 🎯 목표
전역 상태 관리 라이브러리(Zustand)를 도입하여 장바구니, 사용자 인증 등 관리

## 📍 프로젝트 경로
`/Users/gimmingi/anti`

---

## 왜 Zustand인가?

### 비교
| 라이브러리 | 번들 크기 | 러닝 커브 | 성능 |
|-----------|----------|----------|------|
| Redux | ~10KB | 높음 | 중간 |
| Context API | 0KB | 중간 | 낮음 |
| **Zustand** | **1KB** | **낮음** | **높음** |

---

## Step 1: Zustand 설치

```bash
cd /Users/gimmingi/anti
npm install zustand
```

---

## Step 2: Store 생성

### 2.1 장바구니 Store (`src/store/cartStore.ts`)

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: string;
  clubId: number;
  clubName: string;
  type: 'table' | 'menu';
  itemId: string;
  itemName: string;
  price: number;
  quantity: number;
  capacity?: number;  // 테이블일 경우
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const id = `${item.clubId}-${item.type}-${item.itemId}-${Date.now()}`;
        set((state) => ({
          items: [...state.items, { ...item, id }]
        }));
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== id)
        }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map(item =>
            item.id === id ? { ...item, quantity } : item
          )
        }));
      },

      clearCart: () => set({ items: [] }),

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      getItemCount: () => {
        return get().items.reduce(
          (count, item) => count + item.quantity,
          0
        );
      },
    }),
    {
      name: 'clubbnb-cart-storage',  // localStorage 키
    }
  )
);
```

### 2.2 사용자 Store (`src/store/userStore.ts`)

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'partner';
  membershipTier?: 'standard' | 'gold' | 'elite';
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateMembership: (tier: User['membershipTier']) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: (user) => set({ user, isAuthenticated: true }),

      logout: () => set({ user: null, isAuthenticated: false }),

      updateMembership: (tier) => set((state) => ({
        user: state.user ? { ...state.user, membershipTier: tier } : null
      })),
    }),
    {
      name: 'clubbnb-user-storage',
    }
  )
);
```

### 2.3 UI Store (`src/store/uiStore.ts`)

```typescript
import { create } from 'zustand';

interface UIState {
  isCartOpen: boolean;
  isLoginModalOpen: boolean;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  openLoginModal: () => void;
  closeLoginModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isCartOpen: false,
  isLoginModalOpen: false,

  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),

  openLoginModal: () => set({ isLoginModalOpen: true }),
  closeLoginModal: () => set({ isLoginModalOpen: false }),
}));
```

---

## Step 3: 컴포넌트에 적용

### 3.1 Navbar에 장바구니 카운트 표시

`src/components/layout/Navbar.tsx` 수정:

```typescript
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { useUserStore } from "@/store/userStore";
import { useUIStore } from "@/store/uiStore";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const cartItemCount = useCartStore(state => state.getItemCount());
  const user = useUserStore(state => state.user);
  const openLoginModal = useUIStore(state => state.openLoginModal);
  const toggleCart = useUIStore(state => state.toggleCart);

  // ... 기존 useEffect

  const handleLogin = () => {
    if (user) {
      // 이미 로그인된 경우
      alert(`안녕하세요, ${user.name}님!`);
    } else {
      openLoginModal();
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
          {/* 장바구니 아이콘 */}
          <button
            className={styles.cartBtn}
            onClick={toggleCart}
          >
            🛒 Cart
            {cartItemCount > 0 && (
              <span className={styles.cartBadge}>{cartItemCount}</span>
            )}
          </button>

          <button
            className={styles.loginBtn}
            onClick={handleLogin}
          >
            {user ? user.name : '로그인 (Sign In)'}
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

`Navbar.module.css`에 추가:
```css
.cartBtn {
  position: relative;
  background: transparent;
  border: 1px solid var(--card-border);
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  color: var(--foreground);
  cursor: pointer;
  transition: all 0.2s;
}

.cartBtn:hover {
  background: var(--card-bg);
  border-color: var(--primary);
}

.cartBadge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: var(--secondary);
  color: white;
  font-size: 0.7rem;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 18px;
  text-align: center;
}
```

---

### 3.2 CheckoutClient에 장바구니 기능 추가

`src/components/features/CheckoutClient.tsx` 수정:

```typescript
'use client';

import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { Club } from '@/types/club';
import styles from './Checkout.module.css';
import Button from '../ui/Button';

interface CheckoutClientProps {
  club: Club;
}

export default function CheckoutClient({ club }: CheckoutClientProps) {
  const [selectedTable, setSelectedTable] = useState(club.tables[0]);
  const [selectedAddons, setSelectedAddons] = useState<typeof club.menu>([]);

  const addItem = useCartStore(state => state.addItem);

  const toggleAddon = (item: typeof club.menu[0]) => {
    if (selectedAddons.find(a => a.id === item.id)) {
      setSelectedAddons(selectedAddons.filter(a => a.id !== item.id));
    } else {
      setSelectedAddons([...selectedAddons, item]);
    }
  };

  const subtotal = selectedTable.price + selectedAddons.reduce((sum, item) => sum + item.price, 0);
  const serviceFee = Math.floor(subtotal * 0.1);
  const total = subtotal + serviceFee;

  const handleAddToCart = () => {
    // 테이블 추가
    addItem({
      clubId: club.id,
      clubName: club.name,
      type: 'table',
      itemId: selectedTable.id,
      itemName: selectedTable.name,
      price: selectedTable.price,
      quantity: 1,
      capacity: selectedTable.capacity,
    });

    // 애드온 추가
    selectedAddons.forEach(addon => {
      addItem({
        clubId: club.id,
        clubName: club.name,
        type: 'menu',
        itemId: addon.id,
        itemName: addon.name,
        price: addon.price,
        quantity: 1,
      });
    });

    alert('장바구니에 추가되었습니다!');
  };

  const handleCheckout = () => {
    handleAddToCart();
    alert('Proceeding to Secure Checkout with PayPal...\nTotal: ₩' + total.toLocaleString());
  };

  return (
    <div className={styles.wrapper}>
      {/* ... 기존 코드 ... */}

      <div className={styles.summarySection}>
        <div className={styles.summaryCard}>
          {/* ... 기존 요약 코드 ... */}

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <Button
              variant="outline"
              fullWidth
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
            <Button
              variant="primary"
              fullWidth
              size="large"
              onClick={handleCheckout}
            >
              Confirm & Pay Now
            </Button>
          </div>

          <p className={styles.secureText}>🔒 Secure SSL Encrypted Connection</p>
        </div>
      </div>
    </div>
  );
}
```

---

### 3.3 장바구니 사이드바 컴포넌트 생성

`src/components/features/CartSidebar.tsx` 생성:

```typescript
'use client';

import { useCartStore } from '@/store/cartStore';
import { useUIStore } from '@/store/uiStore';
import styles from './CartSidebar.module.css';
import Button from '../ui/Button';

export default function CartSidebar() {
  const isOpen = useUIStore(state => state.isCartOpen);
  const closeCart = useUIStore(state => state.closeCart);
  const items = useCartStore(state => state.items);
  const removeItem = useCartStore(state => state.removeItem);
  const getTotalPrice = useCartStore(state => state.getTotalPrice);
  const clearCart = useCartStore(state => state.clearCart);

  if (!isOpen) return null;

  const total = getTotalPrice();

  return (
    <>
      <div className={styles.overlay} onClick={closeCart} />
      <div className={styles.sidebar}>
        <div className={styles.header}>
          <h2>🛒 Cart</h2>
          <button className={styles.closeBtn} onClick={closeCart}>✕</button>
        </div>

        <div className={styles.items}>
          {items.length === 0 ? (
            <div className={styles.empty}>장바구니가 비어있습니다</div>
          ) : (
            items.map(item => (
              <div key={item.id} className={styles.item}>
                <div className={styles.itemInfo}>
                  <div className={styles.clubName}>{item.clubName}</div>
                  <div className={styles.itemName}>{item.itemName}</div>
                  <div className={styles.itemPrice}>₩{item.price.toLocaleString()}</div>
                </div>
                <button
                  className={styles.removeBtn}
                  onClick={() => removeItem(item.id)}
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.total}>
              <span>Total</span>
              <span>₩{total.toLocaleString()}</span>
            </div>
            <Button variant="primary" fullWidth size="large">
              Checkout (₩{total.toLocaleString()})
            </Button>
            <button className={styles.clearBtn} onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
```

`src/components/features/CartSidebar.module.css` 생성:

```css
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 999;
}

.sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  max-width: 90vw;
  height: 100vh;
  background: var(--background);
  border-left: 1px solid var(--card-border);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid var(--card-border);
}

.closeBtn {
  background: transparent;
  border: none;
  color: var(--foreground);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
}

.items {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.empty {
  text-align: center;
  color: #666;
  padding: 2rem;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 8px;
  margin-bottom: 0.5rem;
}

.itemInfo {
  flex: 1;
}

.clubName {
  font-size: 0.8rem;
  color: #888;
  margin-bottom: 0.25rem;
}

.itemName {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.itemPrice {
  color: var(--primary);
  font-size: 0.9rem;
}

.removeBtn {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0.5rem;
}

.footer {
  padding: 1.5rem;
  border-top: 1px solid var(--card-border);
}

.total {
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.clearBtn {
  width: 100%;
  background: transparent;
  border: 1px solid var(--card-border);
  color: #888;
  padding: 0.8rem;
  margin-top: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
}

.clearBtn:hover {
  background: var(--card-bg);
  color: var(--foreground);
}
```

---

### 3.4 Layout에 CartSidebar 추가

`src/app/layout.tsx` 수정:

```typescript
import CartSidebar from "@/components/features/CartSidebar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Navbar />
        <main className={styles.main}>
          {children}
        </main>
        <Footer />
        <CartSidebar />
      </body>
    </html>
  );
}
```

---

## ✅ 체크리스트

- [ ] Zustand 설치 완료
- [ ] `src/store/cartStore.ts` 생성
- [ ] `src/store/userStore.ts` 생성
- [ ] `src/store/uiStore.ts` 생성
- [ ] Navbar에 장바구니 카운트 표시
- [ ] CheckoutClient에 장바구니 추가 기능
- [ ] CartSidebar 컴포넌트 생성
- [ ] Layout에 CartSidebar 추가
- [ ] localStorage 저장 확인 (새로고침 후 유지)
- [ ] `npm run dev` 정상 작동

---

## 🎯 기대 효과
- 전역 상태 관리 통일
- 장바구니 기능 구현
- 사용자 인증 상태 관리 준비
- 번들 크기 최소화 (1KB)

---

## 📝 완료 후 다음 단계
→ `06_api_layer.md`
