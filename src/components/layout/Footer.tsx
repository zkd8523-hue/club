import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={styles.brand}>
                        <Link href="/" className={styles.logo}>
                            Club<span>bnb</span>
                        </Link>
                        <p className={styles.description}>
                            프리미엄 클럽 리저베이션 토탈 솔루션. <br />
                            최저가 보장제부터 실시간 테이블 경매까지.
                        </p>
                    </div>

                    <div className={styles.links}>
                        <h4>서비스</h4>
                        <Link href="/clubs">클럽 찾기</Link>
                        <Link href="/membership">멤버십 안내</Link>
                        <Link href="/partners">파트너 제휴</Link>
                    </div>

                    <div className={styles.links}>
                        <h4>커뮤니티</h4>
                        <Link href="/#party-section">파티 조각</Link>
                        <Link href="/reviews">리얼 리뷰</Link>
                        <Link href="/notices">공지사항</Link>
                    </div>

                    <div className={styles.links}>
                        <h4>고객지원</h4>
                        <Link href="/faq">자주 묻는 질문</Link>
                        <Link href="/contact">1:1 문의</Link>
                        <p className={styles.contactInfo}>
                            고객센터: 1544-XXXX <br />
                            (평일 10:00 - 18:00)
                        </p>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p>&copy; 2026 Clubbnb. All rights reserved.</p>
                    <div className={styles.legalLinks}>
                        <Link href="/terms">이용약관</Link>
                        <Link href="/privacy">개인정보처리방침</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
