import styles from "./Hero.module.css";
import SearchBar from "./SearchBar";

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.background}></div>
            <div className={styles.content}>
                <h1 className={styles.title}>
                    오늘 밤의 주인공 <br />
                    <span className="text-gradient">지금바로<span style={{ fontSize: '0.6em', verticalAlign: 'middle', marginRight: '4px' }}>,</span> 최저가로</span>
                </h1>
                <p className={styles.subtitle}>
                    프리미엄 클럽 테이블 예약부터 바틀 주문, 함께할 파티 조각까지.
                </p>
                <SearchBar />
            </div>
        </section>
    );
}
