"use client";

import { useState } from 'react';
import { clubs } from '@/data/clubs';
import { REGIONS } from '@/constants/regions';
import styles from './Clubs.module.css';

const QUICK_FILTERS = ['오늘 이용 가능', 'EDM', '힙합', 'R&B', '즐겨찾기'];

export default function ClubsPage() {
    const [selectedRegion, setSelectedRegion] = useState('전체');
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const [openMusicId, setOpenMusicId] = useState<number | null>(null);
    const [openDjId, setOpenDjId] = useState<number | null>(null);

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
                return true; // 오늘 이용 가능, 즐겨찾기는 나중에 구현
            });
        });
    }

    const toggleMusic = (id: number) => {
        setOpenMusicId(openMusicId === id ? null : id);
        if (openDjId === id) setOpenDjId(null);
    };

    const toggleDj = (id: number) => {
        setOpenDjId(openDjId === id ? null : id);
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.headline}>
                    핫플레이스의 NOW PLAYING
                </h1>

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
                        <div
                            className={styles.imageWrapper}
                            onClick={() => toggleMusic(club.id)}
                        >
                            <img src={club.images[0]} alt={club.name} className={styles.img} />
                            <div className={styles.overlay}>
                                <div className={styles.category}>{club.category}</div>
                                <h2 className={styles.name}>{club.name}</h2>
                                <div style={{ color: '#aaa', fontSize: '0.9rem', marginTop: '5px' }}>
                                    {club.region} · ★ {club.rating}
                                </div>
                            </div>
                        </div>

                        <div className={styles.content}>
                            <fieldset
                                className={styles.musicFieldset}
                                onClick={() => toggleMusic(club.id)}
                            >
                                <legend className={styles.legend}>
                                    <div className={styles.waveContainer}>
                                        <div className={`${styles.wave} ${styles.wave1}`}></div>
                                        <div className={`${styles.wave} ${styles.wave2}`}></div>
                                        <div className={`${styles.wave} ${styles.wave3}`}></div>
                                    </div>
                                    <span className={styles.nowPlayingLabel}>NOW PLAYING</span>
                                </legend>

                                <div className={styles.liveInfo}>
                                    <div className={styles.songDisplay}>
                                        <span className={styles.songArtist}>{club.nowPlaying.artist}</span>
                                        <span className={styles.songDivider}>-</span>
                                        <span className={styles.songTitle}>{club.nowPlaying.title}</span>
                                    </div>
                                </div>

                                <div className={`${styles.historyPanel} ${openMusicId === club.id ? styles.showHistory : ''}`}>
                                    <div className={styles.historyHeader}>RECENTLY PLAYED</div>
                                    {club.musicHistory.map((history, idx) => (
                                        <div key={idx} className={styles.historyItem}>
                                            <div className={styles.historyDetail}>
                                                <span className={styles.historyTitle}>{history.title}</span>
                                                <span className={styles.historyArtist}>{history.artist}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </fieldset>

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
                                        <img src={club.currentDJ.image} alt={club.currentDJ.name} className={styles.djProfileImg} />
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
                <div style={{ textAlign: 'center', padding: '4rem', color: '#555' }}>
                    해당 지역에는 아직 등록된 클럽이 없습니다. :(
                </div>
            )}
        </div>
    );
}
