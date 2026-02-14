'use client';

import { useRouter } from 'next/navigation';
import styles from './confirmation.module.css';
import Button from '@/components/common/Button';

export default function ConfirmationPage() {
  const router = useRouter();

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
            <li>예약 확인 이메일 수신</li>
            <li>클럽 입장 시 QR 코드 제시</li>
            <li>즐거운 시간 되세요!</li>
          </ul>
        </div>

        <div className={styles.actions}>
          <Button variant="primary" onClick={() => router.push('/')}>
            홈으로 돌아가기
          </Button>
        </div>
      </div>
    </div>
  );
}
