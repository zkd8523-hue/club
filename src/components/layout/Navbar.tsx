"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";
import { scrollToElement, isHomePage } from "@/utils/scroll";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);

        // Handle initial scroll if coming from another page with a hash
        if (isHomePage(pathname) && window.location.hash) {
            const id = window.location.hash.replace('#', '');
            setTimeout(() => scrollToElement(id, 80), 100);
        }

        return () => window.removeEventListener("scroll", handleScroll);
    }, [pathname]);

    const scrollToSection = (e: React.MouseEvent, id: string) => {
        if (isHomePage(pathname)) {
            e.preventDefault();
            scrollToElement(id, 80);
        }
    };

    return (
        <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
            <div className={styles.container}>
                <Link href="/#home" className={styles.logo} onClick={(e) => scrollToSection(e, 'home')}>
                    Club<span>bnb</span>
                </Link>
                <div className={styles.navLinks}>
                    <Link href="/#home" className={styles.link} onClick={(e) => scrollToSection(e, 'home')}>
                        홈 (Home)
                    </Link>
                    <Link href="/#hot-deals" className={styles.link} onClick={(e) => scrollToSection(e, 'hot-deals')}>
                        🔥 HOT DEALS
                    </Link>
                    <Link href="/#auction" className={styles.link} onClick={(e) => scrollToSection(e, 'auction')}>
                        경매 (Auction)
                    </Link>
                    <Link href="/#party-section" className={styles.link} onClick={(e) => scrollToSection(e, 'party-section')}>
                        파티/조각 (Parties)
                    </Link>
                    <Link href="/clubs" className={styles.link}>
                        🎵 NOW PLAYING
                    </Link>
                    <Link href="/membership" className={styles.link}>
                        멤버십 (Membership)
                    </Link>
                </div>
                <div className={styles.actions}>
                    <button
                        className={styles.loginBtn}
                        onClick={() => alert('일반 회원 로그인은 현재 준비 중입니다. PARTNER 버튼을 이용해 주세요!')}
                    >
                        로그인 (Sign In)
                    </button>
                    <Link href="/partner/login" className={styles.partnerBtn}>PARTNER</Link>
                </div>
            </div>
        </nav>
    );
}
