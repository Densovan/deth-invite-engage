'use client';
import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

export default function Petals() {
  const [hearts, setHearts] = useState<{ id: number; left: string; animationDuration: string; animationDelay: string; color: string; size: number }[]>([]);

  useEffect(() => {
    const colors = ['text-khmer-lotus-pink', 'text-khmer-gold', 'text-khmer-burgundy/40'];
    const newHearts = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      animationDuration: `${Math.random() * 4 + 10}s`,
      animationDelay: `${Math.random() * 10}s`,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 12 + 12 // Sizes from 12px to 24px
    }));
    
    queueMicrotask(() => {
      setHearts(newHearts);
    });
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className={`absolute top-[-10vh] ${heart.color} animate-fall opacity-60 filter drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]`}
          style={{
            left: heart.left,
            animationDuration: heart.animationDuration,
            animationDelay: heart.animationDelay,
          }}
        >
          <Heart 
            size={heart.size} 
            fill="currentColor" 
            className="rotate-12"
          />
        </div>
      ))}
    </div>
  );
}
