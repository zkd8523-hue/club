"use client";

import Link from 'next/link';
import styles from './Host.module.css';
import { useState } from 'react';

// Mock data for the host's clubs
const MY_CLUBS = [
    { id: 1, name: "Club RACE (레이스)", activeDeals: 1 },
    { id: 2, name: "Jack Livin (잭리빈)", activeDeals: 0 }
];

export default function HostDashboard() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Partner Dashboard</h1>
                <p className={styles.subtitle}>클럽 점주 전용 관리 페이지</p>
            </header>

            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>내 클럽</span>
                    <span className={styles.statValue}>2</span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>진행 중인 핫딜</span>
                    <span className={styles.statValue}>1</span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>오늘의 예약</span>
                    <span className={styles.statValue}>12</span>
                </div>
            </div>

            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>내 클럽 관리</h2>
                    <Link href="/partner/registration" className={styles.addBtn}>
                        + 핫딜 등록하기
                    </Link>
                </div>

                <div className={styles.clubList}>
                    {MY_CLUBS.map(club => (
                        <div key={club.id} className={styles.clubCard}>
                            <div className={styles.clubInfo}>
                                <h3 className={styles.clubName}>{club.name}</h3>
                                <p className={styles.clubMeta}>활성 핫딜: {club.activeDeals}개</p>
                            </div>
                            <div className={styles.clubActions}>
                                <button className={styles.manageBtn}>정보 수정</button>
                                <button className={styles.manageBtn}>통계 보기</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
