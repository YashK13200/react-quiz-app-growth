import  { useEffect, useCallback } from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  timeRemaining: number;
  onTimeUp: () => void;
}

export function Timer({ timeRemaining, onTimeUp }: TimerProps) {
  const formatTime = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  }, []);

  useEffect(() => {
    if (timeRemaining <= 0) {
      onTimeUp();
    }
  }, [timeRemaining, onTimeUp]);

  return (
    <div className="flex items-center justify-center bg-white rounded-lg shadow-md p-3 sm:p-4 transition-all duration-300">
      <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-indigo-600" />
      <span className="text-base sm:text-xl font-semibold">
        Time Remaining: {formatTime(timeRemaining)}
      </span>
    </div>
  );
}