import { useEffect, useRef, useState, useCallback } from 'react';
import { Heart, Sparkles } from 'lucide-react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

const InteractiveHeart = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [clickCount, setClickCount] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const heartRef = useRef<HTMLButtonElement>(null);
  const particleIdRef = useRef(0);

  const messages = [
    "انتي بتخلي قلبي يدق بسرعة أوي من الفرحة",
    "بحبك أكتر من أي حاجه في دنيتي ",
    "انتي كل حاجة ليا في الدنيا دي",
    "عشانك انا قادر احلم وافرح في الدنيا دي ",
    "انتي السبب في الضحكة اللي على وشي وفرحة قلبي",
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Particle animation loop
  useEffect(() => {
    if (particles.length === 0) return;

    const animationFrame = requestAnimationFrame(() => {
      setParticles(prev =>
        prev
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.2, // gravity
            life: p.life - 1,
          }))
          .filter(p => p.life > 0)
      );
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [particles]);

  const createParticles = useCallback((centerX: number, centerY: number) => {
    const colors = ['#e64848', '#c20f0f', '#ff6b6b', '#ffb4b4', '#ffe8e8'];
    const newParticles: Particle[] = [];

    for (let i = 0; i < 30; i++) {
      const angle = (Math.PI * 2 * i) / 30;
      const velocity = 5 + Math.random() * 5;

      newParticles.push({
        id: particleIdRef.current++,
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - 3,
        life: 60,
        maxLife: 60,
        size: 4 + Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    setParticles(prev => [...prev, ...newParticles]);
  }, []);

  const handleHeartClick = useCallback(() => {
    if (isClicked) return;

    setIsClicked(true);
    setClickCount(prev => prev + 1);

    // Create particle explosion
    if (heartRef.current) {
      const rect = heartRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      createParticles(centerX, centerY);
    }

    // Show message after animation
    setTimeout(() => {
      setShowMessage(true);
    }, 300);

    // Reset after delay
    setTimeout(() => {
      setIsClicked(false);
      setShowMessage(false);
    }, 3000);
  }, [isClicked, createParticles]);

  const currentMessage = messages[clickCount % messages.length];

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 px-4 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-valentine-pink/50 via-valentine-lightPink to-valentine-pink/30" />

      {/* Floating Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="fixed pointer-events-none z-50"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            borderRadius: '50%',
            opacity: particle.life / particle.maxLife,
            transform: `translate(-50%, -50%)`,
          }}
        />
      ))}

      <div className="max-w-2xl mx-auto text-center relative">
        {/* Section Header */}
        <div
          className={`mb-12 transition-all duration-700 ${isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'}`}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-valentine-red animate-pulse" />
            <span className="font-body text-sm uppercase tracking-widest text-valentine-darkRed/70">
              A Special Message
            </span>
            <Sparkles className="w-5 h-5 text-valentine-red animate-pulse" />
          </div>
          <h2 className="font-display text-5xl md:text-6xl text-valentine-red">
            دوس على القلب
          </h2>
        </div>

        {/* Interactive Heart */}
        <div
          className={`relative transition-all duration-1000 ${isVisible ? 'animate-scale-in opacity-100' : 'opacity-0'}`}
          style={{ animationDelay: '0.3s' }}
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`w-48 h-48 md:w-64 md:h-64 bg-valentine-red/30 rounded-full blur-3xl transition-all duration-500 ${isClicked ? 'scale-150 opacity-80' : 'scale-100 opacity-50'}`} />
          </div>

          {/* Heart Button */}
          <button
            ref={heartRef}
            onClick={handleHeartClick}
            disabled={isClicked}
            className={`relative w-40 h-40 md:w-56 md:h-56 mx-auto flex items-center justify-center transition-all duration-300 ${isClicked
              ? 'scale-0 rotate-180'
              : 'scale-100 hover:scale-110 cursor-pointer'
              }`}
          >
            <Heart
              className={`w-full h-full text-valentine-red transition-all duration-300 ${!isClicked && 'animate-heartbeat hover:text-valentine-darkRed'}`}
              fill="currentColor"
              strokeWidth={1}
            />

            {/* Inner Glow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Heart
                className="w-3/4 h-3/4 text-white/20"
                fill="currentColor"
              />
            </div>

            {/* Shine Effect */}
            <div className="absolute top-4 left-8 w-8 h-8 bg-white/40 rounded-full blur-sm" />
          </button>

          {/* Message Card */}
          <div
            className={`absolute top-full left-1/2 -translate-x-1/2 mt-8 transition-all duration-500 ${showMessage
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 -translate-y-8 scale-90 pointer-events-none'
              }`}
          >
            <div className="relative bg-white rounded-2xl shadow-xl px-8 py-6 min-w-[280px]">
              {/* Speech Bubble Tail */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white rotate-45" />

              <div className="relative">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Heart className="w-5 h-5 text-valentine-red animate-pulse" fill="currentColor" />
                  <Heart className="w-4 h-4 text-valentine-red/70 animate-pulse" fill="currentColor" style={{ animationDelay: '0.2s' }} />
                  <Heart className="w-3 h-3 text-valentine-red/50 animate-pulse" fill="currentColor" style={{ animationDelay: '0.4s' }} />
                </div>
                <p className="font-display text-2xl md:text-3xl text-valentine-darkRed text-center">
                  {currentMessage}
                </p>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-valentine-red/20 rounded-tr-lg" />
              <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-valentine-red/20 rounded-bl-lg" />
            </div>
          </div>
        </div>

        {/* Hint Text */}
        <p
          className={`mt-8 font-body text-gray-500 transition-all duration-700 ${isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'}`}
          style={{ animationDelay: '0.5s' }}
        >
          {isClicked ? 'استنى عاوز اقولك حاجه كمان' : 'دوس على القلب '}
        </p>

        {/* Floating Decorations */}
        <div className="absolute top-0 left-0 pointer-events-none">
          <Heart
            className={`w-6 h-6 text-valentine-red/20 animate-float ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            fill="currentColor"
            style={{ animationDelay: '0.6s' }}
          />
        </div>
        <div className="absolute bottom-0 right-0 pointer-events-none">
          <Heart
            className={`w-5 h-5 text-valentine-red/15 animate-float-delayed ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            fill="currentColor"
            style={{ animationDelay: '0.8s' }}
          />
        </div>
      </div>
    </section>
  );
};

export default InteractiveHeart;
