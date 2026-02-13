'use client';

import { useCountdown } from '@/hooks/useCountdown';

interface CountdownTimerProps {
  initialSeconds: number;
  className?: string;
  onComplete?: () => void;
}

/**
 * Countdown timer component
 * Uses the useCountdown hook to display time in HH:MM:SS format
 */
export default function CountdownTimer({
  initialSeconds,
  className = '',
  onComplete
}: CountdownTimerProps) {
  const { formattedTime } = useCountdown(initialSeconds, onComplete);

  return <span className={className}>{formattedTime}</span>;
}
