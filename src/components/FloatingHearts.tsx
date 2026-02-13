import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

interface FloatingHeart {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  useEffect(() => {
    // Generate initial hearts
    const initialHearts: FloatingHeart[] = [];
    for (let i = 0; i < 15; i++) {
      initialHearts.push({
        id: i,
        x: Math.random() * 100,
        size: 10 + Math.random() * 30,
        duration: 10 + Math.random() * 10,
        delay: Math.random() * 10,
        opacity: 0.1 + Math.random() * 0.3,
      });
    }
    setHearts(initialHearts);

    // Add new hearts periodically
    const interval = setInterval(() => {
      setHearts(prev => {
        const newHeart: FloatingHeart = {
          id: Date.now(),
          x: Math.random() * 100,
          size: 10 + Math.random() * 30,
          duration: 10 + Math.random() * 10,
          delay: 0,
          opacity: 0.1 + Math.random() * 0.3,
        };
        return [...prev.slice(-20), newHeart];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-float-heart"
          style={{
            left: `${heart.x}%`,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          <Heart
            className="text-valentine-red"
            style={{
              width: heart.size,
              height: heart.size,
              opacity: heart.opacity,
            }}
            fill="currentColor"
          />
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;
