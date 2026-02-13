"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);

        // Handle initial scroll if coming from another page with a hash
        if (pathname === '/' && window.location.hash) {
            const id = window.location.hash.replace('#', '');
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    const offset = 80;
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elementRect = element.getBoundingClientRect().top;
                    const elementPosition = elementRect - bodyRect;
                    const offsetPosition = elementPosition - offset;
                    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                }
            }, 100);
        }

        return () => window.removeEventListener("scroll", handleScroll);
    }, [pathname]);

    const scrollToSection = (e: React.MouseEvent, id: string) => {
        if (pathname === '/') {
            e.preventDefault();
            const element = document.getElementById(id);
            if (element) {
                const offset = 80;
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = element.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
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
                    <Link href="/clubs" className={styles.link}>
                        클럽 (Clubs)
                    </Link>
                    <Link href="/membership" className={styles.link}>
                        멤버십 (Membership)
                    </Link>
                    <Link href="/#auction" className={styles.link} onClick={(e) => scrollToSection(e, 'auction')}>
                        경매 (Auction)
                    </Link>
                    <Link href="/#party-section" className={styles.link} onClick={(e) => scrollToSection(e, 'party-section')}>
                        파티/조각 (Parties)
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
