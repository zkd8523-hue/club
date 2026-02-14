"use client";

import { useState } from 'react';
import Image from 'next/image';
import { clubs } from '@/data/clubs';
import { REGIONS } from '@/constants/regions';
import { useFavorites } from '@/hooks/useFavorites';
import styles from './Clubs.module.css';

const QUICK_FILTERS = ['오늘 이용 가능', 'EDM', '힙합', 'R&B', '즐겨찾기'];

export default function ClubsPage() {
    const [selectedRegion, setSelectedRegion] = useState('전체');
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const [openDjId, setOpenDjId] = useState<number | null>(null);
    const { favorites } = useFavorites();

    const toggleFilter = (filter: string) => {
        setSelectedFilters(prev =>
            prev.includes(filter)
                ? prev.filter(f => f !== filter)
                : [...prev, filter]
        );
    };

    let filteredClubs = selectedRegion === '전체'
        ? clubs
        : clubs.filter(club => club.region === selectedRegion);

    // Apply quick filters
    if (selectedFilters.length > 0) {
        filteredClubs = filteredClubs.filter(club => {
            return selectedFilters.every(filter => {
                if (filter === 'EDM') return club.category === 'EDM';
                if (filter === '힙합') return club.category === '힙합';
                if (filter === 'R&B') return club.category === 'R&B';
                if (filter === '즐겨찾기') return favorites.includes(club.id);
                if (filter === '오늘 이용 가능') return true; // All clubs are available today for now
                return true;
            });
        });
    }

    const toggleDj = (id: number) => {
        setOpenDjId(openDjId === id ? null : id);
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.headline}>
                    오늘 밤, 어느 지역으로 가시나요?
                </h1>
                <p className={styles.subheadline}>
                    먼저 방문하실 지역을 선택해주세요
                </p>

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

                {selectedRegion && (
                    <div className={styles.selectedRegionBadge}>
                        📍 선택된 지역: <strong>{selectedRegion}</strong>
                    </div>
                )}

                <div className={styles.quickFilters}>
                    {QUICK_FILTERS.map(filter => (
                        <button
                            key={filter}
                            className={`${styles.filterChip} ${selectedFilters.includes(filter) ? styles.activeFilter : ''}`}
                            onClick={() => toggleFilter(filter)}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </header>

            <div className={styles.clubGrid}>
                {filteredClubs.map(club => (
                    <article key={club.id} className={styles.clubCard}>
                        <div className={styles.imageWrapper}>
                            <Image src={club.images[0]} alt={club.name} fill className={styles.img} sizes="(max-width: 768px) 100vw, 350px" />
                            <div className={styles.overlay}>
                                <div className={styles.category}>{club.category}</div>
                                <h2 className={styles.name}>{club.name}</h2>
                                <div className={styles.regionInfo}>
                                    {club.region} · ★ {club.rating}
                                </div>
                            </div>
                        </div>

                        <div className={styles.content}>
                            <div className={styles.djSection}>
                                <div className={styles.djBrief}>
                                    <span className={styles.djLabel}>CURRENT DJ</span>
                                    <span className={styles.djName}>{club.currentDJ.name}</span>
                                    <button
                                        className={styles.djDetailBtn}
                                        onClick={() => toggleDj(club.id)}
                                    >
                                        DJ 자세히 {openDjId === club.id ? '▴' : '▾'}
                                    </button>
                                </div>

                                <div className={`${styles.djDetailPanel} ${openDjId === club.id ? styles.showDj : ''}`}>
                                    <div className={styles.djMain}>
                                        <Image src={club.currentDJ.image} alt={club.currentDJ.name} width={80} height={80} className={styles.djProfileImg} />
                                        <div className={styles.djInfo}>
                                            <p className={styles.djBio}>{club.currentDJ.bio}</p>
                                            <a
                                                href={`https://instagram.com/${club.currentDJ.instagram}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={styles.djInstaLink}
                                            >
                                                <span className={styles.instaIcon}>📸</span> @{club.currentDJ.instagram}
                                            </a>
                                            <div className={styles.playlistSection}>
                                                <span className={styles.playlistLabel}>DJ's Favorite</span>
                                                <div className={styles.playlistTags}>
                                                    {club.currentDJ.favoriteArtists.map((artist, i) => (
                                                        <span key={i} className={styles.trackTag}># {artist}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.youtubeSection}>
                                        <span className={styles.youtubeLabel}>디제이 맛보기</span>
                                        <a
                                            href={club.currentDJ.youtubeSet.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.youtubeLink}
                                        >
                                            <div className={styles.playIcon}>▶</div>
                                            <span className={styles.youtubeTitle}>{club.currentDJ.youtubeSet.title}</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            {filteredClubs.length === 0 && (
                <div className={styles.emptyState}>
                    해당 지역에는 아직 등록된 클럽이 없습니다. :(
                </div>
            )}
        </div>
    );
}
