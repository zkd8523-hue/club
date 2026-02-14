"use client";

import { useState } from 'react';
import Hero from "@/components/features/Hero";
import HotDeals from "@/components/features/HotDeals";
import Auction from "@/components/features/Auction";
import ClubCard from "@/components/features/ClubCard";
import { clubs } from "@/data/clubs";
import { REGIONS } from '@/constants/regions';
import styles from './page.module.css';

export default function Home() {
  const [selectedRegion, setSelectedRegion] = useState('전체');

  // Filter clubs by region
  const filteredClubs = selectedRegion === '전체'
    ? clubs.slice(0, 4)
    : clubs.filter(club => club.region === selectedRegion).slice(0, 4);

  return (
    <div id="home">
      <Hero />

      {/* Region Selector */}
      <section className={styles.regionSection}>
        <div className="container">
          <div className={styles.regionSelector}>
            {REGIONS.map(region => (
              <button
                key={region}
                className={`${styles.regionBtn} ${selectedRegion === region ? styles.activeRegion : ''}`}
                onClick={() => setSelectedRegion(region)}
              >
                {region}
              </button>
            ))}
          </div>

          {selectedRegion !== '전체' && (
            <div className={styles.selectedRegionBadge}>
              📍 선택된 지역: <strong>{selectedRegion}</strong>
            </div>
          )}
        </div>
      </section>

      <HotDeals selectedRegion={selectedRegion} />
      <div id="auction">
        <Auction selectedRegion={selectedRegion} />
      </div>

      <section className={`container ${styles.clubSection}`}>
        <h2 className={styles.clubSectionTitle}>
          {selectedRegion !== '전체' ? `${selectedRegion} 지역 ` : ''}오늘의 추천 클럽 (Trending) <span className={styles.fireEmoji}>🔥</span>
        </h2>

        <div className={styles.clubGrid}>
          {filteredClubs.length > 0 ? (
            filteredClubs.map(club => (
              <ClubCard key={club.id} club={club} />
            ))
          ) : (
            <div className={styles.emptyState}>
              {selectedRegion} 지역에는 현재 추천 클럽이 없습니다
            </div>
          )}
        </div>
      </section>

      <section id="party-section" className={styles.partySection}>
        <div className="container">
          <div className={styles.partyContent}>
            <div className={styles.partyText}>
              <h2 className={`text-gradient ${styles.partyTitle}`}>
                함께하면 더 즐거운 파티.<br />조각(N-Pay)으로 부담없이.
              </h2>
              <p className={styles.partyDescription}>
                혼자 가기 망설여지거나 가격이 부담되시나요? <br />
                '파티 조각' 기능을 통해 마음 맞는 사람들과 테이블을 공유하고 비용을 나눠보세요.
              </p>
              <button className={styles.findPartyBtn}>파티 찾기 (Find Party)</button>
            </div>
            <div className={styles.partyVisual}>
              Feature Visual (Party Mode)
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
