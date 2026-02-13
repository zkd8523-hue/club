"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Login.module.css';
import Link from 'next/link';

export default function UserLogin() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate authentication
        setTimeout(() => {
            setIsLoading(false);
            router.push('/');
        }, 1500);
    };

    return (
        <div className={styles.container}>
            <div className={styles.loginCard}>
                <div className={styles.header}>
                    <Link href="/" className={styles.logo}>
                        Club<span>bnb</span>
                    </Link>
                    <h1 className={styles.title}>Welcome Back!</h1>
                    <p className={styles.subtitle}>클럽 예약의 새로운 기준, Clubbnb</p>
                </div>

                <form className={styles.form} onSubmit={handleLogin}>
                    <div className={styles.inputGroup}>
                        <label>이메일 주소</label>
                        <input
                            type="email"
                            placeholder="user@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>비밀번호</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className={styles.loginBtn} disabled={isLoading}>
                        {isLoading ? '로그인 중...' : '로그인 (Login)'}
                    </button>
                </form>

                <div className={styles.divider}>
                    <span>또는</span>
                </div>

                <div className={styles.socialLogin}>
                    <button
                        className={styles.googleBtn}
                        onClick={() => alert('구글 로그인은 곧 지원 예정입니다.')}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Google로 계속하기
                    </button>
                    <button
                        className={styles.kakaoBtn}
                        onClick={() => alert('카카오 로그인은 곧 지원 예정입니다.')}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 3C6.477 3 2 6.477 2 10.75c0 2.834 1.887 5.32 4.688 6.75l-1.125 4.125c-.094.344.25.625.563.437l5.156-3.5c.563.063 1.125.125 1.688.125 5.523 0 10-3.477 10-7.75S17.523 3 12 3z"/>
                        </svg>
                        카카오로 계속하기
                    </button>
                    <button
                        className={styles.naverBtn}
                        onClick={() => alert('네이버 로그인은 곧 지원 예정입니다.')}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M16.273 12.845L7.376 0H0v24h7.726V11.156L16.624 24H24V0h-7.727v12.845z"/>
                        </svg>
                        네이버로 계속하기
                    </button>
                </div>

                <div className={styles.footer}>
                    <p>계정이 없으신가요? <Link href="/signup">회원가입하기</Link></p>
                    <Link href="/" className={styles.backHome}>← 홈으로 돌아가기</Link>
                </div>
            </div>
        </div>
    );
}
