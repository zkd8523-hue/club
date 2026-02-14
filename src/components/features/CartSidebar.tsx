'use client';

import { useCartStore } from '@/store/cartStore';
import { useUIStore } from '@/store/uiStore';
import styles from './CartSidebar.module.css';
import Button from '../common/Button';

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
          <h2>Cart</h2>
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
                  ✕
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
