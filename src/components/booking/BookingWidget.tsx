"use client";

import { useState } from "react";
import styles from "./BookingWidget.module.css";
import Button from "../common/Button";
import DatePicker from "../common/DatePicker";
import { Club } from "@/types/club";

interface BookingWidgetProps {
    club: Club;
}

export default function BookingWidget({ club }: BookingWidgetProps) {
    const [date, setDate] = useState("");
    const [selectedTable, setSelectedTable] = useState<typeof club.tables[0] | null>(null);
    const [bottles, setBottles] = useState<typeof club.menu>([]);

    const handleBottleAdd = (bottle: typeof club.menu[0]) => {
        setBottles([...bottles, bottle]);
    };

    const totalPrice = (selectedTable?.price || 0) + bottles.reduce((sum, b) => sum + b.price, 0);

    return (
        <div className={styles.widget}>
            <h3 className={styles.title}>예약하기 (Book Your Night)</h3>

            <div className={styles.section}>
                <label className={styles.label}>날짜 선택 (Date)</label>
                <DatePicker
                    selected={date}
                    onChange={setDate}
                    placeholder="방문 예정일"
                />
            </div>

            <div className={styles.section}>
                <label className={styles.label}>테이블 선택 (Table)</label>
                <div className={styles.grid}>
                    {club.tables.map(table => (
                        <button
                            key={table.id}
                            className={`${styles.optionBtn} ${selectedTable?.id === table.id ? styles.selected : ''}`}
                            onClick={() => setSelectedTable(table)}
                        >
                            <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{table.name}</div>
                            <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>₩{table.price.toLocaleString()}</div>
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.section}>
                <label className={styles.label}>주류/바틀 추가 (선택) (Bottles)</label>
                <div className={styles.grid}>
                    {club.menu.map(item => (
                        <button
                            key={item.id}
                            className={styles.optionBtn}
                            onClick={() => handleBottleAdd(item)}
                            style={item.isHotDeal ? { border: '1px solid #ff0055', background: 'rgba(255, 0, 85, 0.1)' } : {}}
                        >
                            <div style={{ fontSize: '0.85rem' }}>
                                {item.name}
                                {item.isHotDeal && <span style={{ fontSize: '0.7em', marginLeft: '4px', verticalAlign: 'top', color: '#ff0055' }}>🔥</span>}
                            </div>
                            <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>+ ₩{item.price.toLocaleString()}</div>
                        </button>
                    ))}
                </div>
                {bottles.length > 0 && (
                    <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#888' }}>
                        추가됨: {bottles.length} 바틀 (Bottles Added)
                    </div>
                )}
            </div>

            <div className={styles.total}>
                <span>총 합계 (Total)</span>
                <span className={styles.price}>₩{totalPrice.toLocaleString()}</span>
            </div>

            <Button fullWidth variant="primary" disabled={!date || !selectedTable}>
                예약 신청하기 (Reserve Now)
            </Button>
            <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.8rem', color: '#666' }}>
                지금 바로 결제되지 않습니다. (No charge yet)
            </p>
        </div>
    );
}
