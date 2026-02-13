import { useEffect, useRef, useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heartRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // 3D tilt effect on mouse move
  useEffect(() => {
    const container = containerRef.current;
    const heart = heartRef.current;
    if (!container || !heart) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      heart.style.transform = `perspective(1000px) rotateY(${x * 15}deg) rotateX(${-y * 15}deg) scale(1.05)`;
    };

    const handleMouseLeave = () => {
      heart.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-valentine-pink via-valentine-lightPink to-white opacity-80" />

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating hearts */}
        <Heart
          className={`absolute top-[15%] left-[10%] w-8 h-8 text-valentine-red/30 transition-all duration-1000 ${isVisible ? 'animate-float opacity-100' : 'opacity-0'}`}
          fill="currentColor"
          style={{ animationDelay: '0s' }}
        />
        <Heart
          className={`absolute top-[25%] right-[15%] w-6 h-6 text-valentine-red/20 transition-all duration-1000 ${isVisible ? 'animate-float-delayed opacity-100' : 'opacity-0'}`}
          fill="currentColor"
          style={{ animationDelay: '0.5s' }}
        />
        <Heart
          className={`absolute bottom-[30%] left-[8%] w-10 h-10 text-valentine-red/25 transition-all duration-1000 ${isVisible ? 'animate-float opacity-100' : 'opacity-0'}`}
          fill="currentColor"
          style={{ animationDelay: '1s' }}
        />
        <Heart
          className={`absolute bottom-[20%] right-[12%] w-5 h-5 text-valentine-red/30 transition-all duration-1000 ${isVisible ? 'animate-float-delayed opacity-100' : 'opacity-0'}`}
          fill="currentColor"
          style={{ animationDelay: '1.5s' }}
        />

        {/* Sparkles */}
        <Sparkles
          className={`absolute top-[20%] right-[25%] w-5 h-5 text-valentine-red/40 transition-all duration-1000 ${isVisible ? 'animate-pulse opacity-100' : 'opacity-0'}`}
          style={{ animationDelay: '0.3s' }}
        />
        <Sparkles
          className={`absolute bottom-[35%] left-[20%] w-4 h-4 text-valentine-red/30 transition-all duration-1000 ${isVisible ? 'animate-pulse opacity-100' : 'opacity-0'}`}
          style={{ animationDelay: '0.8s' }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Subheading */}
        <p
          className={`font-body text-lg md:text-xl text-valentine-darkRed/70 mb-4 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'}`}
          style={{ animationDelay: '0.2s' }}
        >
          To the most special person in my life
        </p>

        {/* Main Heading */}
        <h1
          className={`font-display text-6xl md:text-8xl lg:text-9xl text-valentine-red mb-8 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'}`}
          style={{ animationDelay: '0.4s' }}
        >
          Happy Valentine's
          <span className="block text-valentine-darkRed">Day</span>
        </h1>

        {/* 3D Heart Image */}
        <div
          className={`relative mx-auto w-48 h-48 md:w-64 md:h-64 mb-8 transition-all duration-1000 ${isVisible ? 'animate-scale-in opacity-100' : 'opacity-0'}`}
          style={{ animationDelay: '0.6s' }}
        >
          <div className="absolute inset-0 bg-valentine-red/20 rounded-full blur-3xl animate-pulse" />
          <img
            ref={heartRef}
            src="/hero-heart.png"
            alt="Valentine Heart"
            className="relative w-full h-full object-contain transition-transform duration-300 ease-out animate-heartbeat"
            style={{ transformStyle: 'preserve-3d' }}
          />
        </div>

        {/* Decorative Line */}
        <div
          className={`flex items-center justify-center gap-4 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'}`}
          style={{ animationDelay: '0.8s' }}
        >
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-valentine-red/50" />
          <Heart className="w-4 h-4 text-valentine-red animate-pulse" fill="currentColor" />
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-valentine-red/50" />
        </div>

        {/* Scroll Indicator */}
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'}`}
          style={{ animationDelay: '1s' }}
        >
          <div className="flex flex-col items-center gap-2 text-valentine-red/60">
            <span className="text-sm font-body">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-valentine-red/30 rounded-full flex justify-center pt-2">
              <div className="w-1.5 h-3 bg-valentine-red/50 rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
