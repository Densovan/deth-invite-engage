'use client';
import { useState, useEffect } from 'react';

const toKhmerNumber = (num: number) => {
  const khmerNumerals = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];
  return num.toString().split('').map(digit => {
    const d = parseInt(digit);
    return isNaN(d) ? digit : khmerNumerals[d];
  }).join('');
};

export default function Countdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex justify-center gap-4 text-center z-10 relative">
      {[
        { label: 'ថ្ងៃ', value: timeLeft.days },
        { label: 'ម៉ោង', value: timeLeft.hours },
        { label: 'នាទី', value: timeLeft.minutes },
        { label: 'វិនាទី', value: timeLeft.seconds },
      ].map((item, idx) => (
        <div key={idx} className="flex flex-col items-center">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-khmer-gold flex items-center justify-center bg-white/20 backdrop-blur-md shadow-lg mb-3">
            <span className="text-2xl md:text-3xl font-moulpali text-khmer-gold-dark drop-shadow-sm">
              {toKhmerNumber(item.value)}
            </span>
          </div>
          <span className="font-suwannaphum text-sm text-khmer-burgundy font-bold tracking-wider">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
