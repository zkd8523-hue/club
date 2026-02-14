"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Auction.module.css';
import { Auction as AuctionType } from '@/types/club';
import CountdownTimer from '@/components/common/CountdownTimer';
import { clubs } from '@/data/clubs';

const INITIAL_AUCTIONS: AuctionType[] = [
    {
        id: 1,
        clubName: 'Club RACE',
        itemName: 'VIP Stage Table (Premium Selection)',
        startPrice: 500000,
        currentBid: 720000,
        increment: 10000,
        bidders: 15,
        expiresIn: 1800, // 30 mins
        image: 'https://images.unsplash.com/photo-1566737236500-c8ac40895481?q=80&w=800&auto=format&fit=crop',
    },
    {
        id: 2,
        clubName: 'Jack Livin',
        itemName: 'DJ Booth Side Bottle Service',
        startPrice: 300000,
        currentBid: 455000,
        increment: 5000,
        bidders: 8,
        expiresIn: 3600, // 1 hour
        image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=800&auto=format&fit=crop',
    }
];

interface AuctionProps {
    selectedRegion?: string;
}

export default function Auction({ selectedRegion = '전체' }: AuctionProps) {
    const [auctions, setAuctions] = useState<AuctionType[]>(INITIAL_AUCTIONS);
    const [filteredAuctions, setFilteredAuctions] = useState<AuctionType[]>(INITIAL_AUCTIONS);

    useEffect(() => {
        if (selectedRegion === '전체') {
            setFilteredAuctions(auctions);
        } else {
            const filtered = auctions.filter(auction => {
                const club = clubs.find(c => c.name === auction.clubName);
                return club?.region === selectedRegion;
            });
            setFilteredAuctions(filtered);
        }
    }, [selectedRegion, auctions]);
    const [animatingId, setAnimatingId] = useState<number | null>(null);

    const handleBid = (id: number) => {
        setAuctions(prev => prev.map(auction => {
            if (auction.id === id) {
                setAnimatingId(id);
                setTimeout(() => setAnimatingId(null), 500);
                return {
                    ...auction,
                    currentBid: auction.currentBid + auction.increment,
                    bidders: auction.bidders + 1
                };
            }
            return auction;
        }));
    };

    return (
        <section className={styles.auctionSection}>
            <div className={styles.header}>
                <div className={styles.titleGroup}>
                    <span className={styles.badge}>LIVE AUCTION</span>
                    <h2 className={styles.title}>
                        {selectedRegion !== '전체' ? `${selectedRegion} ` : ''}실시간 테이블 경매 🔨
                    </h2>
                    <p className={styles.subtitle}>공석 최소화 패키지! 최고의 자리를 최적의 가격에 입찰하세요.</p>
                </div>
            </div>

            {filteredAuctions.length === 0 ? (
                <div className={styles.emptyState}>
                    {selectedRegion} 지역에는 현재 진행 중인 경매가 없습니다
                </div>
            ) : (
                <div className={styles.grid}>
                    {filteredAuctions.map((auction) => (
                    <div key={auction.id} className={styles.auctionCard}>
                        <div className={styles.imageWrapper}>
                            <Image src={auction.image} alt={auction.clubName} fill className={styles.image} sizes="(max-width: 768px) 100vw, 200px" />
                            <div className={styles.timeTag}>
                                <CountdownTimer initialSeconds={auction.expiresIn} className={styles.timer} /> 남음
                            </div>
                            <div className={styles.bidderCount}>
                                {auction.bidders}명 참여 중
                            </div>
                        </div>

                        <div className={styles.content}>
                            <div className={styles.itemInfo}>
                                <span className={styles.clubName}>{auction.clubName}</span>
                                <h3 className={styles.itemName}>{auction.itemName}</h3>
                            </div>

                            <div className={styles.priceSection}>
                                <div className={styles.priceBlock}>
                                    <span className={styles.priceLabel}>현재 최고가</span>
                                    <span className={`${styles.currentBid} ${animatingId === auction.id ? styles.pulse : ''}`}>
                                        ₩{auction.currentBid.toLocaleString()}
                                    </span>
                                </div>
                                <div className={styles.incrementBlock}>
                                    <span className={styles.priceLabel}>최소 입찰 단위</span>
                                    <span className={styles.increment}>+{auction.increment.toLocaleString()}</span>
                                </div>
                            </div>

                            <button
                                className={styles.bidBtn}
                                onClick={() => handleBid(auction.id)}
                            >
                                입찰하기 (Bid Now)
                            </button>
                        </div>
                    </div>
                ))}
                </div>
            )}
        </section>
    );
}
