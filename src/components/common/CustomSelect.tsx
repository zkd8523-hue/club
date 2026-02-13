"use client";

import { useState, useRef } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";

interface Option {
    value: string;
    label: string;
}

interface CustomSelectProps {
    value: string;
    onChange: (value: string) => void;
    options: Option[];
    placeholder: string;
}

export default function CustomSelect({ value, onChange, options, placeholder }: CustomSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useClickOutside(containerRef, () => setIsOpen(false));

    const selectedOption = options.find(opt => opt.value === value);

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
                    fontSize: '1.1rem',
                    fontWeight: '500',
                    transition: 'background 0.2s',
                    userSelect: 'none'
                }}
            >
                {selectedOption ? selectedOption.label : placeholder}
            </div>

            {isOpen && (
                <div
                    style={{
                        position: 'absolute',
                        top: 'calc(100% + 8px)',
                        left: 0,
                        right: 0,
                        background: '#1a1a1a',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        zIndex: 1000,
                        boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
                    }}
                >
                    {options.map((option) => (
                        <div
                            key={option.value}
                            onClick={() => {
                                onChange(option.value);
                                setIsOpen(false);
                            }}
                            style={{
                                padding: '0.875rem 1rem',
                                cursor: 'pointer',
                                color: value === option.value ? '#9d00ff' : 'white',
                                background: value === option.value ? 'rgba(157,0,255,0.1)' : 'transparent',
                                transition: 'all 0.15s',
                                fontSize: '1rem'
                            }}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
