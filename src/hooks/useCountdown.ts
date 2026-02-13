import { useState, useEffect, useRef } from "react";

/**
 * Hook that manages a countdown timer
 * @param initialSeconds Number of seconds to count down
 * @param onComplete Optional callback when countdown reaches zero
 */
export function useCountdown(initialSeconds: number, onComplete?: () => void) {
    const [timeLeft, setTimeLeft] = useState(initialSeconds);
    const onCompleteRef = useRef(onComplete);

    useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

    useEffect(() => {
        if (timeLeft <= 0) {
            if (onCompleteRef.current) onCompleteRef.current();
            return;
        }

        const intervalId = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeLeft]);

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return {
        timeLeft,
        formattedTime: formatTime(timeLeft),
        setTimeLeft
    };
}
