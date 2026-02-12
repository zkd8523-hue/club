"use client";

import { useState, useRef, useEffect } from "react";

export default function DatePicker({ selected, onChange, placeholder = "날짜 선택" }) {
    const [isOpen, setIsOpen] = useState(false);
    const [viewDate, setViewDate] = useState(new Date());
    const containerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleDateClick = (day) => {
        const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
        const offset = newDate.getTimezoneOffset() * 60000;
        const localISOTime = (new Date(newDate - offset)).toISOString().slice(0, 10);

        onChange(localISOTime);
        setIsOpen(false);
    };

    const getDaysArray = () => {
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfWeek = new Date(year, month, 1).getDay();

        const days = [];
        for (let i = 0; i < firstDayOfWeek; i++) {
            days.push(null);
        }
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(i);
        }
        return days;
    };

    const days = getDaysArray();
    const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

    const formatDateDisplay = (dateStr) => {
        if (!dateStr) return placeholder;
        const d = new Date(dateStr);
        return `${d.getMonth() + 1}월 ${d.getDate()}일`;
    };

    return (
        <div ref={containerRef} style={{ position: 'relative', width: '100%' }}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    padding: '1rem',
                    background: 'rgba(0,0,0,0.3)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '1.1rem',
                    fontWeight: '500',
                    width: '100%',
                    transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.3)'}
            >
                <span>{selected ? formatDateDisplay(selected) : placeholder}</span>
                <span>📅</span>
            </div>

            {isOpen && (
                <div
                    style={{
                        position: 'absolute',
                        top: 'calc(100% + 8px)',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '360px',
                        background: 'rgba(26, 26, 26, 0.95)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '20px',
                        padding: '1.5rem',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                        zIndex: 1000
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center' }}>
                        <button
                            onClick={() => setViewDate(new Date(viewDate.setMonth(viewDate.getMonth() - 1)))}
                            style={{
                                background: 'transparent',
                                border: '1px solid #333',
                                borderRadius: '50%',
                                width: '36px',
                                height: '36px',
                                color: 'white',
                                fontSize: '1.1rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                            }}
                        >
                            &lt;
                        </button>
                        <span style={{ fontSize: '1.6rem', fontWeight: 'bold' }}>{viewDate.getMonth() + 1}월</span>
                        <button
                            onClick={() => setViewDate(new Date(viewDate.setMonth(viewDate.getMonth() + 1)))}
                            style={{
                                background: 'transparent',
                                border: '1px solid #333',
                                borderRadius: '50%',
                                width: '36px',
                                height: '36px',
                                color: 'white',
                                fontSize: '1.1rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                            }}
                        >
                            &gt;
                        </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px', marginBottom: '10px' }}>
                        {weekDays.map(d => (
                            <div key={d} style={{ textAlign: 'center', color: '#888', fontWeight: 'bold', fontSize: '0.8rem' }}>{d}</div>
                        ))}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px' }}>
                        {days.map((d, i) => (
                            d === null ? <div key={`empty-${i}`} /> :
                                <button
                                    key={d}
                                    onClick={() => handleDateClick(d)}
                                    style={{
                                        aspectRatio: '1',
                                        background: selected === new Date(viewDate.getFullYear(), viewDate.getMonth(), d).toISOString().slice(0, 10) ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                                        border: 'none',
                                        borderRadius: '10px',
                                        color: 'white',
                                        fontSize: '1rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.2s',
                                        minHeight: '38px',
                                        padding: 0
                                    }}
                                    onMouseEnter={(e) => {
                                        if (selected !== new Date(viewDate.getFullYear(), viewDate.getMonth(), d).toISOString().slice(0, 10)) {
                                            e.target.style.background = 'rgba(255,255,255,0.15)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (selected !== new Date(viewDate.getFullYear(), viewDate.getMonth(), d).toISOString().slice(0, 10)) {
                                            e.target.style.background = 'rgba(255,255,255,0.05)';
                                        }
                                    }}
                                >
                                    {d}
                                </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
