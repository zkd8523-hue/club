import { getClub } from "@/data/clubs";
import BookingWidget from "@/components/booking/BookingWidget";
import styles from "./ClubDetail.module.css";
import { notFound } from "next/navigation";
import Link from "next/link";

interface ClubDetailPageProps {
    params: Promise<{ id: string }>;
}

export default async function ClubDetailPage({ params }: ClubDetailPageProps) {
    const { id } = await params;
    const club = getClub(id);

    if (!club) {
        notFound();
    }

    return (
        <div className={styles.container}>
            <div className={styles.backNav}>
                <Link href="/" className={styles.backLink}>&larr; 홈으로 돌아가기</Link>
            </div>

            <div className={styles.heroSection}>
                <div className={styles.heroImageWrapper}>
                    <img src={club.images[0]} alt={club.name} className={styles.heroImage} />
                    <div className={styles.heroOverlay}>
                        <div className={styles.badge}>{club.category}</div>
                        <h1 className={styles.title}>{club.name}</h1>
                        <div className={styles.meta}>
                            <span className={styles.rating}>★ {club.rating}</span>
                            <span>{club.location.split(' ').slice(0, 2).join(' ')}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.contentGrid}>
                <div className={styles.mainContent}>
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>클럽 소개 (About)</h2>
                        <p className={styles.description}>{club.description}</p>
                    </section>

                    {club.images.length > 1 && (
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>갤러리 (Gallery)</h2>
                            <div className={styles.galleryGrid}>
                                {club.images.map((img, idx) => (
                                    <img key={idx} src={img} alt={`${club.name} gallery ${idx}`} className={styles.galleryImg} />
                                ))}
                            </div>
                        </section>
                    )}

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>VIP 서비스 & 메뉴</h2>
                        <div className={styles.menuGrid}>
                            {club.menu.map(item => (
                                <div key={item.id} className={styles.menuItem}>
                                    <div className={styles.menuInfo}>
                                        <span className={styles.menuName}>{item.name}</span>
                                        {item.isHotDeal && <span className={styles.hotBadge}>HOT</span>}
                                    </div>
                                    <span className={styles.menuPrice}>₩{item.price.toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>위치 및 연락처</h2>
                        <div className={styles.infoCard}>
                            <div className={styles.infoRow}>
                                <span className={styles.infoLabel}>주소</span>
                                <span className={styles.infoValue}>{club.location}</span>
                            </div>
                            <div className={styles.infoRow}>
                                <span className={styles.infoLabel}>연락처</span>
                                <span className={styles.infoValue}>{club.contact}</span>
                            </div>
                            <div className={styles.mapPlaceholder}>
                                {/* Map integration would go here */}
                                <div className={styles.mapText}>지도 로딩 중...</div>
                            </div>
                        </div>
                    </section>
                </div>

                <aside className={styles.sidebar}>
                    <div className={styles.stickyWidget}>
                        <BookingWidget club={club} />
                    </div>
                </aside>
            </div>
        </div>
    );
}
