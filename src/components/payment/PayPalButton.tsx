'use client';

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useState } from 'react';
import styles from './PayPalButton.module.css';

interface PayPalButtonProps {
  amount: number;
  items: { name: string; price: number }[];
  onSuccess: (details: Record<string, unknown>) => void;
  onError?: (error: unknown) => void;
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
        body: JSON.stringify({ items, totalAmount: amount }),
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

  const onApprove = async (data: { orderID: string }) => {
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
