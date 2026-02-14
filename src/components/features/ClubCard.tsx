'use client';

import Image from 'next/image';
import { Club } from '@/types/club';
import styles from "./ClubCard.module.css";
import Button from "../common/Button";
import Link from "next/link";
import { useFavorites } from '@/hooks/useFavorites';

interface ClubCardProps {
    club: Club;
}

export default function ClubCard({ club }: ClubCardProps) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const favorite = isFavorite(club.id);

    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <Image
                    src={club.images?.[0] || 'https://images.unsplash.com/photo-1574391884720-bbe37400581a?q=80&w=800'}
                    alt={club.name}
                    fill
                    className={styles.clubImage}
                    sizes="(max-width: 768px) 100vw, 280px"
                />
                <div className={styles.badge}>{club.category || "EDM"}</div>
                <button
                    className={styles.favoriteBtn}
                    onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(club.id);
                    }}
                    aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
                >
                    {favorite ? '❤️' : '🤍'}
                </button>
            </div>
            <div className={styles.content}>
                <div className={styles.header}>
                    <h3 className={styles.name}>{club.name}</h3>
                    <div className={styles.rating}>★ {club.rating}</div>
                </div>
                <div className={styles.location}>
                    <span>📍</span> {club.location}
                </div>
                <div className={styles.footer}>
                    <div className={styles.price}>
                        최저 <span>{club.minPrice?.toLocaleString()}</span>원
                    </div>
                    <Link href={`/checkout/${club.id}`} className={styles.bookLink}>
                        <Button size="small" variant="outline">예약</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
