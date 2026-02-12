"use client";

import styles from "./SearchBar.module.css";
import { useState, useRef } from "react";

import DatePicker from "../ui/DatePicker";
import CustomSelect from "../ui/CustomSelect";

export default function SearchBar() {
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [guests, setGuests] = useState("");
    const inputRef = useRef(null);

    const locationOptions = [
        { value: "Gangnam", label: "서울 - 강남" },
        { value: "Itaewon", label: "서울 - 이태원" },
        { value: "Hongdae", label: "서울 - 홍대" },
        { value: "Apgujeong", label: "서울 - 압구정" },
        { value: "Busan", label: "부산 - 해운대/서면" },
        { value: "Jeju", label: "제주" }
    ];

    const handleSearch = () => {
        console.log("Searching for", location, date);
    };

    return (
        <div className={styles.searchBar}>
            <div className={styles.inputGroup}>
                <label className={styles.label}>지역 (Location)</label>
                <CustomSelect
                    value={location}
                    onChange={setLocation}
                    options={locationOptions}
                    placeholder="지역 선택"
                />
            </div>
            <div className={styles.inputGroup}>
                <label className={styles.label}>날짜 (Date)</label>
                <DatePicker
                    selected={date}
                    onChange={setDate}
                    placeholder="날짜 선택"
                />
            </div>
            <div className={styles.inputGroup}>
                <label className={styles.label}>인원 (Guests)</label>
                <div
                    onClick={() => inputRef.current?.focus()}
                    style={{
                        padding: '1rem',
                        background: 'rgba(0,0,0,0.3)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.3)'}
                >
                    <input
                        ref={inputRef}
                        type="number"
                        placeholder="2명"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        min="1"
                        style={{
                            width: '100%',
                            background: 'transparent',
                            border: 'none',
                            color: 'white',
                            fontSize: '1.1rem',
                            fontWeight: '500',
                            outline: 'none',
                            cursor: 'pointer'
                        }}
                    />
                </div>
            </div>
            <button className={styles.searchBtn} onClick={handleSearch}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
            </button>
        </div>
    );
}
