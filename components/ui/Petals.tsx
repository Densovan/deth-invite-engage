'use client';
import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ClickedHeart {
  id: string;
  x: number;
  y: number;
  size: number;
  color: string;
  drift: number;
}

export default function Petals() {
  const [hearts, setHearts] = useState<{ id: number; left: string; animationDuration: string; animationDelay: string; color: string; size: number }[]>([]);
  const [clickedHearts, setClickedHearts] = useState<ClickedHeart[]>([]);

  useEffect(() => {
    // Generate background falling hearts
    const colors = ['text-khmer-lotus-pink', 'text-khmer-gold', 'text-khmer-burgundy/40'];
    const newHearts = Array.from({ length: 25 }).map((_, i) => ({
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

  useEffect(() => {
    const spawnHeart = (x: number, y: number) => {
      const colors = ['#ecc6dd', '#C5A059', '#800020'];
      const newHeart = {
        id: `${Date.now()}-${Math.random()}`,
        x,
        y,
        size: Math.random() * 15 + 15, // 15px to 30px
        color: colors[Math.floor(Math.random() * colors.length)],
        drift: (Math.random() - 0.5) * 60, // drift left or right by up to 30px
      };

      setClickedHearts((prev) => [...prev, newHeart]);

      // Automatically remove after 1.5 seconds to clean memory
      setTimeout(() => {
        setClickedHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
      }, 1500);
    };

    const handleGlobalClick = (e: MouseEvent) => {
      spawnHeart(e.clientX, e.clientY);
    };

    const handleGlobalTouch = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        spawnHeart(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('click', handleGlobalClick);
    window.addEventListener('touchstart', handleGlobalTouch);

    return () => {
      window.removeEventListener('click', handleGlobalClick);
      window.removeEventListener('touchstart', handleGlobalTouch);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[9999]">
      {/* Auto falling hearts in background */}
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

      {/* Interactive touch/click hearts */}
      <AnimatePresence>
        {clickedHearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ 
              opacity: 1, 
              scale: 0.5, 
              x: heart.x - heart.size / 2, 
              y: heart.y - heart.size / 2 
            }}
            animate={{ 
              opacity: 0, 
              scale: [0.5, 1.2, 0.8],
              y: heart.y - 120, // Float up by 120px
              x: heart.x - heart.size / 2 + heart.drift, // Sway left/right
              rotate: [0, 45, -45]
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute pointer-events-none filter drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]"
            style={{ color: heart.color }}
          >
            <Heart 
              size={heart.size} 
              fill="currentColor" 
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
