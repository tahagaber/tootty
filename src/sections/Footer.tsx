import { useEffect, useRef, useState } from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  // Generate hearts for marquee
  const hearts = [...Array(20)].map((_, i) => (
    <Heart
      key={i}
      className="w-6 h-6 mx-4 text-valentine-red/40 flex-shrink-0"
      fill="currentColor"
    />
  ));

  return (
    <footer
      ref={sectionRef}
      className="relative py-16 md:py-24 px-4 overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-valentine-pink via-valentine-lightPink to-transparent" />

      {/* Hearts Marquee */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden opacity-50">
        <div
          className={`flex animate-marquee ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          style={{ transition: 'opacity 1s ease' }}
        >
          {[...hearts, ...hearts]}
        </div>
      </div>

      <div className="max-w-4xl mx-auto relative">
        {/* Main Content */}
        <div
          className={`text-center transition-all duration-1000 ${isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'}`}
        >
          {/* Large Heart */}
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-valentine-red/20 rounded-full blur-2xl animate-pulse" />
            <Heart
              className="relative w-16 h-16 md:w-20 md:h-20 text-valentine-red animate-heartbeat"
              fill="currentColor"
            />
          </div>

          {/* Main Message */}
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-valentine-red mb-4">
            اتعمل بكل حب ليكي
          </h2>

          {/* Sub Message */}
          <p className="font-body text-lg text-gray-600 mb-8 max-w-xl mx-auto">
            كل لحظة قضيتها معاكي هي كنز بالنسبة ليا.. شكراً ليكي إنك أحلى وأجمل حاجة في حياتي.
          </p>

          {/* Decorative Line */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-valentine-red/50" />
            <Heart className="w-4 h-4 text-valentine-red animate-pulse" fill="currentColor" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-valentine-red/50" />
          </div>

          {/* Year */}
          <p className="font-display text-3xl text-valentine-darkRed/70">
            كل عيد حب وانتي يا حبي معايه
          </p>
        </div>

        {/* Bottom Floating Hearts */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
          <Heart
            className={`w-4 h-4 text-valentine-red/30 animate-float ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            fill="currentColor"
            style={{ animationDelay: '0.3s' }}
          />
          <Heart
            className={`w-5 h-5 text-valentine-red/40 animate-float-delayed ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            fill="currentColor"
            style={{ animationDelay: '0.5s' }}
          />
          <Heart
            className={`w-4 h-4 text-valentine-red/30 animate-float ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            fill="currentColor"
            style={{ animationDelay: '0.7s' }}
          />
        </div>
      </div>

      {/* Copyright */}
      <div
        className={`absolute bottom-4 left-0 right-0 text-center transition-all duration-1000 ${isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'}`}
        style={{ animationDelay: '0.5s' }}
      >
        <p className="font-body text-sm text-gray-400">
          <Heart className="w-3 h-3 inline text-valentine-red" fill="currentColor" />
        </p>
      </div>
    </footer>
  );
};

export default Footer;
