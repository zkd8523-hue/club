"use client";

import styles from "./SearchBar.module.css";
import { useState, useRef } from "react";

import DatePicker from "../ui/DatePicker";
import CustomSelect from "../ui/CustomSelect";

export default function SearchBar() {
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [guests, setGuests] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

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
                    className={styles.guestInputWrapper}
                >
                    <input
                        ref={inputRef}
                        type="number"
                        placeholder="2명"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        min="1"
                        className={styles.guestInput}
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
