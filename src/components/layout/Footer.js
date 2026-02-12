import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={styles.brand}>
                        <h3>
                            Club<span>bnb</span>
                        </h3>
                        <p>
                            프리미엄 나이트라이프 예약 플랫폼.
                            <br />
                            테이블 예약, 조각 모임, 그리고 잊지 못할 밤을 경험하세요.
                        </p>
                    </div>
                    <div className={styles.column}>
                        <h4>플랫폼 (Platform)</h4>
                        <ul>
                            <li><Link href="/clubs">클럽 찾기</Link></li>
                            <li><Link href="/party">파티 조각</Link></li>
                            <li><Link href="/hot-deals">핫딜 (Hot Deals)</Link></li>
                        </ul>
                    </div>
                    <div className={styles.column}>
                        <h4>회사 (Company)</h4>
                        <ul>
                            <li><Link href="/about">서비스 소개</Link></li>
                            <li><Link href="/contact">문의하기</Link></li>
                            <li><Link href="/privacy">개인정보처리방침</Link></li>
                        </ul>
                    </div>
                    <div className={styles.column}>
                        <h4>소셜 (Social)</h4>
                        <ul>
                            <li><Link href="#">인스타그램</Link></li>
                            <li><Link href="#">트위터/X</Link></li>
                        </ul>
                    </div>
                </div>
                <div className={styles.bottom}>
                    &copy; {new Date().getFullYear()} Clubbnb. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
