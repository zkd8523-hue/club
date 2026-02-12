"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Registration.module.css';
import Link from 'next/link';

export default function HotDealRegistration() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        clubId: '1',
        itemName: '',
        originalPrice: '',
        dealPrice: '',
        expiresIn: '7200', // Default 2 hours
        image: 'https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?q=80&w=800'
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);

            // Redirect after success
            setTimeout(() => {
                router.push('/partner');
            }, 2000);
        }, 1500);
    };

    if (isSuccess) {
        return (
            <div className={styles.successContainer}>
                <div className={styles.successCard}>
                    <div className={styles.successIcon}>✓</div>
                    <h2>핫딜 등록 완료!</h2>
                    <p>등록하신 핫딜이 즉시 메인 화면에 노출됩니다.</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.backNav}>
                <Link href="/partner" className={styles.backLink}>&larr; 대시보드로 돌아가기</Link>
            </div>

            <header className={styles.header}>
                <h1 className={styles.title}>새 핫딜 등록</h1>
                <p className={styles.subtitle}>오늘 밤, 가장 강력한 혜택을 등록하세요.</p>
            </header>

            <div className={styles.layout}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label>클럽 선택</label>
                        <select
                            value={formData.clubId}
                            onChange={(e) => setFormData({ ...formData, clubId: e.target.value })}
                        >
                            <option value="1">Club RACE (레이스)</option>
                            <option value="2">Jack Livin (잭리빈)</option>
                        </select>
                    </div>

                    <div className={styles.inputGroup}>
                        <label>상품명 (Item Name)</label>
                        <input
                            type="text"
                            placeholder="예: 돔 페리뇽 Luminous + 과일 안주"
                            value={formData.itemName}
                            onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                            required
                        />
                    </div>

                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label>정상가 (Original)</label>
                            <input
                                type="number"
                                placeholder="850000"
                                value={formData.originalPrice}
                                onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                                required
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>핫딜가 (Deal Price)</label>
                            <input
                                type="number"
                                placeholder="490000"
                                value={formData.dealPrice}
                                onChange={(e) => setFormData({ ...formData, dealPrice: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <label>노출 시간 (제한 시간)</label>
                        <select
                            value={formData.expiresIn}
                            onChange={(e) => setFormData({ ...formData, expiresIn: e.target.value })}
                        >
                            <option value="3600">1시간</option>
                            <option value="7200">2시간 (추천)</option>
                            <option value="10800">3시간</option>
                            <option value="21600">6시간</option>
                        </select>
                    </div>

                    <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                        {isSubmitting ? '등록 중...' : '핫딜 게시하기'}
                    </button>
                </form>

                <aside className={styles.preview}>
                    <h3>미리보기 (Live Preview)</h3>
                    <div className={styles.cardPreview}>
                        <div className={styles.mockCard}>
                            <div className={styles.mockImg} style={{ backgroundImage: `url(${formData.image})` }}>
                                <div className={styles.mockBadge}>HOT DEAL</div>
                            </div>
                            <div className={styles.mockContent}>
                                <div className={styles.mockTitle}>{formData.itemName || '상품명을 입력하세요'}</div>
                                <div className={styles.mockPrices}>
                                    <span className={styles.mockOriginal}>₩{Number(formData.originalPrice).toLocaleString() || '0'}</span>
                                    <span className={styles.mockDeal}>₩{Number(formData.dealPrice).toLocaleString() || '0'}</span>
                                </div>
                                <div className={styles.mockTimer}>남은 시간 02:00:00</div>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
