'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Checkout.module.css';
import Button from '../common/Button';
import PayPalButton from '../payment/PayPalButton';
import { Club } from '@/types/club';
import { useCartStore } from '@/store/cartStore';

interface CheckoutClientProps {
    club: Club;
}

export default function CheckoutClient({ club }: CheckoutClientProps) {
    const router = useRouter();
    const [selectedTable, setSelectedTable] = useState(club.tables[0]);
    const [selectedAddons, setSelectedAddons] = useState<typeof club.menu>([]);
    const [showPayPal, setShowPayPal] = useState(false);
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

    const handleCheckout = () => {
        setShowPayPal(true);
    };

    const handlePaymentSuccess = (details: Record<string, unknown>) => {
        console.log('Payment completed:', details);
        router.push('/bookings/confirmation');
    };

    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <h1 className="text-gradient">Secure Checkout</h1>
                <p>Complete your VIP reservation for {club.name}</p>
            </header>

            <div className={styles.grid}>
                <div className={styles.formSection}>
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
                                <span className={styles.badge}>Crypto</span>
                            </div>
                        </div>

                        <div className={styles.checkoutActions}>
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

                        {showPayPal && (
                            <div className={styles.paypalSection}>
                                <PayPalButton
                                    amount={total}
                                    items={[
                                        { name: selectedTable.name, price: selectedTable.price },
                                        ...selectedAddons.map(a => ({ name: a.name, price: a.price })),
                                    ]}
                                    onSuccess={handlePaymentSuccess}
                                    onError={(error) => {
                                        console.error('Payment failed:', error);
                                        alert('결제에 실패했습니다. 다시 시도해주세요.');
                                    }}
                                />
                            </div>
                        )}
                        <p className={styles.secureText}>🔒 Secure SSL Encrypted Connection</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
