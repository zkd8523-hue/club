"use client";

import { useRef } from 'react';
import styles from './HotDeals.module.css';
import Link from 'next/link';
import { HotDeal } from '@/types/club';
import CountdownTimer from '@/components/common/CountdownTimer';

const HOT_DEALS_DATA: HotDeal[] = [
    {
        id: 1,
        clubName: 'Club RACE (레이스)',
        image: 'https://images.unsplash.com/photo-1574391884720-bbe37400581a?q=80&w=800&auto=format&fit=crop',
        price: '₩150,000',
        time: '22:00 - 08:00',
        expiresIn: 3600 * 2 + 450,
    },
    {
        id: 2,
        clubName: 'Jack Livin (잭리빈)',
        image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=800&auto=format&fit=crop',
        price: '₩120,000',
        time: '23:00 - 08:00',
        expiresIn: 3600 * 1 + 1200,
    },
    {
        id: 3,
        clubName: 'Club ARTRE (아르떼)',
        image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop',
        price: '₩99,000',
        time: '22:00 - 05:00',
        expiresIn: 3600 * 0 + 2400,
    },
    {
        id: 4,
        clubName: 'Club TIMES (타임즈)',
        image: 'https://images.unsplash.com/photo-1566737236500-c8ac40895481?q=80&w=800&auto=format&fit=crop',
        price: '₩180,000',
        time: '22:30 - 07:00',
        expiresIn: 3600 * 3 + 150,
    },
    {
        id: 5,
        clubName: 'Club 5 (힙합클럽 5)',
        image: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=800&auto=format&fit=crop',
        price: '₩140,000',
        time: '22:00 - 06:00',
        expiresIn: 3600 * 1 + 600,
    },
    {
        id: 6,
        clubName: 'Triple Seven (777)',
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop',
        price: '₩110,000',
        time: '21:00 - 05:00',
        expiresIn: 3600 * 0 + 1200,
    }
];

export default function HotDeals() {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    return (
        <section className={styles.hotDealsSection}>
            <div className={styles.header}>
                <div className={styles.titleGroup}>
                    <span className={styles.badge}>🔥 HOT DEALS</span>
                </div>
                <div className={styles.controls}>
                    <button onClick={() => scroll('left')} className={styles.scrollBtn}>&larr;</button>
                    <button onClick={() => scroll('right')} className={styles.scrollBtn}>&rarr;</button>
                </div>
            </div>

            <div className={styles.carouselContainer} ref={scrollRef}>
                {HOT_DEALS_DATA.map((deal) => (
                    <div key={deal.id} className={styles.dealCard}>
                        <Link href={`/clubs/${deal.id}`} className={styles.imageLink}>
                            <div className={styles.imageWrapper}>
                                <img src={deal.image} alt={deal.clubName} className={styles.image} />
                                <div className={styles.overlay}>
                                    <span className={styles.clubName}>{deal.clubName}</span>
                                </div>
                            </div>
                        </Link>

                        <div className={styles.content}>
                            <div className={styles.infoRow}>
                                <span className={styles.label}>주류 시작가</span>
                                <span className={styles.price}>{deal.price}</span>
                            </div>
                            <div className={styles.infoRow}>
                                <span className={styles.label}>이용 시간</span>
                                <span className={styles.time}>{deal.time}</span>
                            </div>

                            <div className={styles.footer}>
                                <div className={styles.fomo}>
                                    <span className={styles.fomoLabel}>남은 시간</span>
                                    <CountdownTimer initialSeconds={deal.expiresIn} className={styles.timer} />
                                </div>
                            </div>
                            <Link href={`/clubs/${deal.id}`} className={styles.bookBtn}>
                                GO!
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
