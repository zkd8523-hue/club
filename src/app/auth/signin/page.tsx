'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './signin.module.css';
import Button from '@/components/common/Button';

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
          <Button type="submit" fullWidth variant="primary">
            {loading ? '로그인 중...' : '로그인'}
          </Button>
        </form>

        <div className={styles.divider}>또는</div>

        <div className={styles.socialButtons}>
          <button className={styles.socialBtn} onClick={() => signIn('google', { callbackUrl: '/' })}>
            Google로 계속하기
          </button>
          <button className={`${styles.socialBtn} ${styles.kakaoBtn}`} onClick={() => signIn('kakao', { callbackUrl: '/' })}>
            Kakao로 계속하기
          </button>
        </div>

        <p className={styles.testInfo}>
          테스트 계정: test@clubbnb.com / password
        </p>
      </div>
    </div>
  );
}
