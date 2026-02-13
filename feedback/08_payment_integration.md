# 작업지시서 #08: 결제 시스템 (PayPal)

## 🎯 목표
PayPal을 사용한 실제 결제 시스템 구축

## 📍 프로젝트 경로
`/Users/gimmingi/anti`

---

## Step 1: PayPal SDK 설치

```bash
cd /Users/gimmingi/anti
npm install @paypal/react-paypal-js
```

---

## Step 2: 환경 변수 설정

### 2.1 `.env.local` 추가

```bash
# PayPal
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your-paypal-client-id
PAYPAL_CLIENT_SECRET=your-paypal-client-secret
PAYPAL_MODE=sandbox  # 테스트용, production으로 변경 시 실제 결제
```

### 2.2 PayPal Developer 설정
1. https://developer.paypal.com 접속
2. 로그인 후 "Dashboard" → "Apps & Credentials"
3. "Create App" → Sandbox 또는 Live 선택
4. Client ID 복사 → `.env.local`에 추가

---

## Step 3: PayPal Provider 설정

### 3.1 `src/app/layout.tsx` 수정

```typescript
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import SessionProvider from '@/components/providers/SessionProvider';
// ... 기존 imports

const paypalOptions = {
  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '',
  currency: 'KRW',
  intent: 'capture',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SessionProvider>
          <PayPalScriptProvider options={paypalOptions}>
            <Navbar />
            <main className={styles.main}>
              {children}
            </main>
            <Footer />
            <CartSidebar />
          </PayPalScriptProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
```

---

## Step 4: 결제 API 엔드포인트 생성

### 4.1 `src/app/api/payment/create-order/route.ts` 생성

```typescript
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { items, totalAmount } = await request.json();

  // PayPal API 호출하여 주문 생성
  const PAYPAL_API = process.env.PAYPAL_MODE === 'sandbox'
    ? 'https://api-m.sandbox.paypal.com'
    : 'https://api-m.paypal.com';

  const auth = Buffer.from(
    `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString('base64');

  try {
    const response = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'KRW',
              value: totalAmount.toString(),
            },
            description: `Clubbnb 예약 - ${items.length}개 아이템`,
          },
        ],
      }),
    });

    const order = await response.json();
    return NextResponse.json({ orderId: order.id });
  } catch (error) {
    console.error('PayPal order creation failed:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
```

### 4.2 `src/app/api/payment/capture-order/route.ts` 생성

```typescript
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { orderId } = await request.json();

  const PAYPAL_API = process.env.PAYPAL_MODE === 'sandbox'
    ? 'https://api-m.sandbox.paypal.com'
    : 'https://api-m.paypal.com';

  const auth = Buffer.from(
    `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString('base64');

  try {
    const response = await fetch(`${PAYPAL_API}/v2/checkout/orders/${orderId}/capture`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${auth}`,
      },
    });

    const captureData = await response.json();

    // 여기서 DB에 결제 정보 저장
    // 예: savePaymentToDB(captureData)

    return NextResponse.json({
      success: true,
      captureId: captureData.id,
      status: captureData.status,
    });
  } catch (error) {
    console.error('PayPal capture failed:', error);
    return NextResponse.json(
      { error: 'Failed to capture payment' },
      { status: 500 }
    );
  }
}
```

---

## Step 5: PayPal 버튼 컴포넌트 생성

### 5.1 `src/components/payment/PayPalButton.tsx` 생성

```typescript
'use client';

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useState } from 'react';
import styles from './PayPalButton.module.css';

interface PayPalButtonProps {
  amount: number;
  items: any[];
  onSuccess: (details: any) => void;
  onError?: (error: any) => void;
}

export default function PayPalButton({
  amount,
  items,
  onSuccess,
  onError,
}: PayPalButtonProps) {
  const [{ isPending }] = usePayPalScriptReducer();
  const [loading, setLoading] = useState(false);

  const createOrder = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          totalAmount: amount,
        }),
      });

      const data = await response.json();
      return data.orderId;
    } catch (error) {
      console.error('Order creation failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const onApprove = async (data: any) => {
    setLoading(true);
    try {
      const response = await fetch('/api/payment/capture-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: data.orderID }),
      });

      const details = await response.json();
      onSuccess(details);
    } catch (error) {
      console.error('Payment capture failed:', error);
      onError?.(error);
    } finally {
      setLoading(false);
    }
  };

  if (isPending || loading) {
    return <div className={styles.loading}>결제 준비 중...</div>;
  }

  return (
    <PayPalButtons
      style={{ layout: 'vertical', color: 'gold', shape: 'pill' }}
      createOrder={createOrder}
      onApprove={onApprove}
      onError={(error) => {
        console.error('PayPal error:', error);
        onError?.(error);
      }}
    />
  );
}
```

### 5.2 `src/components/payment/PayPalButton.module.css` 생성

```css
.loading {
  text-align: center;
  padding: 2rem;
  color: #888;
  font-size: 0.9rem;
}
```

---

## Step 6: Checkout 페이지에 PayPal 통합

### 6.1 `src/components/features/CheckoutClient.tsx` 수정

```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { Club } from '@/types/club';
import PayPalButton from '@/components/payment/PayPalButton';
import styles from './Checkout.module.css';
import Button from '../ui/Button';

interface CheckoutClientProps {
  club: Club;
}

export default function CheckoutClient({ club }: CheckoutClientProps) {
  const router = useRouter();
  const [selectedTable, setSelectedTable] = useState(club.tables[0]);
  const [selectedAddons, setSelectedAddons] = useState<typeof club.menu>([]);
  const [showPayPal, setShowPayPal] = useState(false);

  const addItem = useCartStore(state => state.addItem);
  const clearCart = useCartStore(state => state.clearCart);

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

  const handlePaymentSuccess = (details: any) => {
    console.log('Payment successful:', details);
    clearCart();
    alert('결제가 완료되었습니다! 예약 확인 이메일을 확인하세요.');
    router.push('/bookings/confirmation');
  };

  const handlePaymentError = (error: any) => {
    console.error('Payment error:', error);
    alert('결제 중 오류가 발생했습니다. 다시 시도해주세요.');
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1 className="text-gradient">Secure Checkout</h1>
        <p>Complete your VIP reservation for {club.name}</p>
      </header>

      <div className={styles.grid}>
        <div className={styles.formSection}>
          {/* 기존 테이블 선택 UI */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>1. Select Your Table</h2>
            <div className={styles.tableGrid}>
              {club.tables.map(table => (
                <div
                  key={table.id}
                  className={`${styles.tableCard} ${selectedTable.id === table.id ? styles.active : ''}`}
                  onClick={() => setSelectedTable(table)}
                >
                  <div className={styles.tableInfo}>
                    <h3>{table.name}</h3>
                    <p>Capacity: {table.capacity} pax</p>
                  </div>
                  <div className={styles.tablePrice}>₩{table.price.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </section>

          {/* 기존 애드온 선택 UI */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>2. Enhance Your Experience</h2>
            <div className={styles.addonList}>
              {club.menu.map(item => (
                <div key={item.id} className={styles.addonItem}>
                  <div className={styles.addonInfo}>
                    <input
                      type="checkbox"
                      id={item.id}
                      checked={selectedAddons.some(a => a.id === item.id)}
                      onChange={() => toggleAddon(item)}
                    />
                    <label htmlFor={item.id}>{item.name}</label>
                  </div>
                  <div className={styles.addonPrice}>+ ₩{item.price.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className={styles.summarySection}>
          <div className={styles.summaryCard}>
            <h2>Order Summary</h2>
            <div className={styles.summaryRow}>
              <span>{selectedTable.name}</span>
              <span>₩{selectedTable.price.toLocaleString()}</span>
            </div>
            {selectedAddons.map(addon => (
              <div key={addon.id} className={styles.summaryRow}>
                <span>{addon.name}</span>
                <span>₩{addon.price.toLocaleString()}</span>
              </div>
            ))}
            <hr />
            <div className={styles.summaryRow}>
              <span>Service Fee (10%)</span>
              <span>₩{serviceFee.toLocaleString()}</span>
            </div>
            <div className={`${styles.summaryRow} ${styles.total}`}>
              <span>Total</span>
              <span>₩{total.toLocaleString()}</span>
            </div>

            <div className={styles.paymentMethods}>
              <p>Pay safely with:</p>
              <div className={styles.badgeGroup}>
                <span className={styles.badge}>PayPal</span>
                <span className={styles.badge}>Credit Card</span>
              </div>
            </div>

            {!showPayPal ? (
              <>
                <Button
                  variant="outline"
                  fullWidth
                  onClick={handleAddToCart}
                  style={{ marginBottom: '0.5rem' }}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="primary"
                  fullWidth
                  size="large"
                  onClick={() => setShowPayPal(true)}
                >
                  Proceed to Payment
                </Button>
              </>
            ) : (
              <div className={styles.paypalContainer}>
                <PayPalButton
                  amount={total}
                  items={[
                    { name: selectedTable.name, price: selectedTable.price },
                    ...selectedAddons,
                  ]}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                />
                <button
                  className={styles.backBtn}
                  onClick={() => setShowPayPal(false)}
                >
                  ← 뒤로 가기
                </button>
              </div>
            )}

            <p className={styles.secureText}>🔒 Secure SSL Encrypted Connection</p>
          </div>
        </div>
      </div>
    </div>
  );
}
```

`Checkout.module.css`에 추가:
```css
.paypalContainer {
  margin-top: 1rem;
}

.backBtn {
  width: 100%;
  background: transparent;
  border: 1px solid var(--card-border);
  color: #888;
  padding: 0.8rem;
  margin-top: 1rem;
  border-radius: 8px;
  cursor: pointer;
}

.backBtn:hover {
  background: var(--card-bg);
  color: var(--foreground);
}
```

---

## Step 7: 결제 확인 페이지 생성

### 7.1 `src/app/bookings/confirmation/page.tsx` 생성

```typescript
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './confirmation.module.css';
import Button from '@/components/ui/Button';

export default function ConfirmationPage() {
  const router = useRouter();

  useEffect(() => {
    // 결제 완료 애니메이션 또는 이메일 발송 트리거
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.icon}>✅</div>
        <h1 className="text-gradient">예약 완료!</h1>
        <p className={styles.message}>
          Clubbnb 예약이 성공적으로 완료되었습니다.<br />
          확인 이메일을 확인해주세요.
        </p>

        <div className={styles.details}>
          <h3>다음 단계:</h3>
          <ul>
            <li>📧 예약 확인 이메일 수신</li>
            <li>📱 클럽 입장 시 QR 코드 제시</li>
            <li>🎉 즐거운 시간 되세요!</li>
          </ul>
        </div>

        <div className={styles.actions}>
          <Button variant="primary" onClick={() => router.push('/')}>
            홈으로 돌아가기
          </Button>
          <Button variant="outline" onClick={() => router.push('/bookings')}>
            예약 내역 보기
          </Button>
        </div>
      </div>
    </div>
  );
}
```

### 7.2 `src/app/bookings/confirmation/confirmation.module.css` 생성

```css
.container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.card {
  text-align: center;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 16px;
  padding: 3rem;
  max-width: 500px;
}

.icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: bounce 0.6s ease-in-out;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.message {
  color: #aaa;
  margin: 1rem 0 2rem;
  line-height: 1.6;
}

.details {
  background: var(--background);
  border: 1px solid var(--card-border);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 2rem 0;
  text-align: left;
}

.details h3 {
  margin-bottom: 1rem;
}

.details ul {
  list-style: none;
  padding: 0;
}

.details li {
  padding: 0.5rem 0;
  color: #ccc;
}

.actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}
```

---

## ✅ 체크리스트

- [ ] PayPal SDK 설치 완료
- [ ] `.env.local`에 PayPal 설정
- [ ] PayPal Developer에서 Client ID 발급
- [ ] PayPalScriptProvider 추가
- [ ] `src/app/api/payment/create-order/route.ts` 생성
- [ ] `src/app/api/payment/capture-order/route.ts` 생성
- [ ] PayPalButton 컴포넌트 생성
- [ ] CheckoutClient에 PayPal 통합
- [ ] 결제 확인 페이지 생성
- [ ] Sandbox 환경에서 테스트 결제 성공

---

## 🧪 테스트 방법

### Sandbox 테스트 계정
1. https://developer.paypal.com/dashboard/accounts
2. "Sandbox" → "Accounts" → Personal/Business 계정 확인
3. 테스트 카드 정보:
   - Email: sb-xxx@personal.example.com (자동 생성)
   - Password: (자동 생성, 비밀번호 표시 가능)

### 테스트 플로우
1. 클럽 선택 → 체크아웃
2. "Proceed to Payment" 클릭
3. PayPal 버튼 클릭
4. Sandbox 계정으로 로그인
5. 결제 승인
6. 확인 페이지로 리다이렉트

---

## 📝 Production 배포 시 주의사항

1. `.env.production` 설정
```bash
PAYPAL_MODE=production
NEXT_PUBLIC_PAYPAL_CLIENT_ID=live-client-id
PAYPAL_CLIENT_SECRET=live-client-secret
```

2. PayPal Developer에서 **Live** 앱 생성
3. 실제 결제 테스트 필수!
4. 환불 정책 명시

---

## 🎯 완료!
모든 작업지시서가 완성되었습니다. 순서대로 진행하세요!
