import { Club } from '@/types/club';
import styles from "./ClubCard.module.css";
import Button from "../ui/Button";
import Link from "next/link";

interface ClubCardProps {
    club: Club;
}

export default function ClubCard({ club }: ClubCardProps) {
    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <div className={styles.imagePlaceholder}>
                    {/* In real app, next/image here */}
                    IMG
                </div>
                <div className={styles.badge}>{club.category || "EDM"}</div>
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
                    <Link href={`/checkout/${club.id}`} style={{ textDecoration: 'none' }}>
                        <Button size="small" variant="outline">예약</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
