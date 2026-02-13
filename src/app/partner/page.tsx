"use client";

import styles from "./Partner.module.css";
import Link from "next/link";
import { useState } from "react";

export default function PartnerDashboard() {
    const [stats] = useState({
        bookings: 154,
        revenue: 42500000,
        parties: 28,
        rating: 4.8
    });

    return (
        <div className={styles.container}>
            <aside className={styles.sidebar}>
                <div className={styles.logo}>Club<span>bnb</span> Partner</div>
                <nav className={styles.nav}>
                    <a href="#" className={styles.active}>대시보드</a>
                    <a href="#">예약 관리</a>
                    <a href="#">테이블/메뉴 설정</a>
                    <a href="#">정산 내역</a>
                    <a href="#">파트너 정보</a>
                </nav>
            </aside>

            <main className={styles.content}>
                <header className={styles.header}>
                    <h1>대시보드 (Dashboard)</h1>
                    <div className={styles.user}>
                        <span>Admin RACE</span>
                        <div className={styles.avatar}></div>
                    </div>
                </header>

                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <span className={styles.statLabel}>이번 달 예약</span>
                        <div className={styles.statValue}>{stats.bookings}건</div>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statLabel}>이번 달 매출</span>
                        <div className={styles.statValue}>₩{(stats.revenue / 10000).toLocaleString()}만</div>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statLabel}>활성 파티 조각</span>
                        <div className={styles.statValue}>{stats.parties}개</div>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statLabel}>평균 평점</span>
                        <div className={styles.statValue}>★ {stats.rating}</div>
                    </div>
                </div>

                <section className={styles.section}>
                    <h2>최근 예약 현황</h2>
                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>상태</th>
                                    <th>예약자</th>
                                    <th>테이블</th>
                                    <th>인원</th>
                                    <th>날짜</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><span className={styles.statusConfirm}>확정</span></td>
                                    <td>김민기</td>
                                    <td>VIP 부스 A1</td>
                                    <td>6명</td>
                                    <td>2026-02-14</td>
                                </tr>
                                <tr>
                                    <td><span className={styles.statusPending}>대기</span></td>
                                    <td>이서연</td>
                                    <td>스탠딩 T5</td>
                                    <td>4명</td>
                                    <td>2026-02-14</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    );
}
