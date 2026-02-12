"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    Club<span>bnb</span>
                </Link>
                <div className={styles.navLinks}>
                    <Link href="/" className={styles.link}>
                        홈 (Home)
                    </Link>
                    <Link href="/clubs" className={styles.link}>
                        클럽 (Clubs)
                    </Link>
                    <Link href="/party" className={styles.link}>
                        파티/조각 (Parties)
                    </Link>
                </div>
                <div className={styles.actions}>
                    <button className={styles.loginBtn}>로그인 (Sign In)</button>
                    <Link href="/partner/login" className={styles.partnerBtn}>PARTNER</Link>
                </div>
            </div>
        </nav>
    );
}
