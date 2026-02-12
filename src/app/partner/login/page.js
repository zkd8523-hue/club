"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Login.module.css';
import Link from 'next/link';

export default function PartnerLogin() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate authentication
        setTimeout(() => {
            setIsLoading(false);
            router.push('/partner');
        }, 1500);
    };

    return (
        <div className={styles.container}>
            <div className={styles.loginCard}>
                <div className={styles.header}>
                    <Link href="/" className={styles.logo}>
                        Club<span>bnb</span>
                    </Link>
                    <h1 className={styles.title}>Partner Access</h1>
                    <p className={styles.subtitle}>파트너 전용 관리 시스템 로그인</p>
                </div>

                <form className={styles.form} onSubmit={handleLogin}>
                    <div className={styles.inputGroup}>
                        <label>이메일 주소</label>
                        <input
                            type="email"
                            placeholder="partner@example.com"
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
                        {isLoading ? '인증 중...' : '로그인 (Login)'}
                    </button>
                </form>

                <div className={styles.footer}>
                    <p>계정이 없으신가요? <Link href="/partner/apply">입점 문의하기</Link></p>
                    <Link href="/" className={styles.backHome}>← 홈으로 돌아가기</Link>
                </div>
            </div>
        </div>
    );
}
