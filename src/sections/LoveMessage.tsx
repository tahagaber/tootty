import { useEffect, useRef, useState } from 'react';
import { Heart, Quote } from 'lucide-react';

const LoveMessage = () => {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 px-4 overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-valentine-pink/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-valentine-red/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Text Content */}
          <div className="relative order-2 md:order-1">
            {/* Quote Icon */}
            <Quote
              className={`absolute -top-8 -left-4 w-16 h-16 text-valentine-red/20 transition-all duration-700 ${isVisible ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-12'}`}
            />

            {/* Heading */}
            <h2
              className={`font-display text-5xl md:text-6xl lg:text-7xl text-valentine-red mb-8 leading-tight transition-all duration-1000 ${isVisible ? 'animate-slide-in-left opacity-100' : 'opacity-0'}`}
            >
              You are the
              <span className="block text-valentine-darkRed">love of my life</span>
            </h2>

            {/* Message Body */}
            <div
              className={`space-y-6 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'}`}
              style={{ animationDelay: '0.3s' }}
            >
              <p className="font-body text-lg md:text-xl text-gray-700 leading-relaxed">
                Every moment with you feels like a beautiful dream I never want to wake up from.
                You fill my days with joy, my heart with love, and my life with meaning.
              </p>
              <p className="font-body text-lg md:text-xl text-gray-700 leading-relaxed">
                Your smile brightens my darkest days, your touch calms my restless soul,
                and your love gives me strength I never knew I had.
              </p>
            </div>

            {/* Signature */}
            <div
              className={`mt-10 flex items-center gap-4 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'}`}
              style={{ animationDelay: '0.5s' }}
            >
              <div className="w-12 h-px bg-valentine-red/50" />
              <span className="font-display text-2xl md:text-3xl text-valentine-darkRed">
                Forever Yours
              </span>
              <Heart className="w-5 h-5 text-valentine-red animate-pulse" fill="currentColor" />
            </div>

            {/* Decorative Hearts */}
            <div className="absolute -bottom-4 right-10 flex gap-2">
              <Heart
                className={`w-4 h-4 text-valentine-red/30 transition-all duration-700 ${isVisible ? 'animate-float opacity-100' : 'opacity-0'}`}
                fill="currentColor"
                style={{ animationDelay: '0.7s' }}
              />
              <Heart
                className={`w-3 h-3 text-valentine-red/20 transition-all duration-700 ${isVisible ? 'animate-float-delayed opacity-100' : 'opacity-0'}`}
                fill="currentColor"
                style={{ animationDelay: '0.9s' }}
              />
            </div>
          </div>

          {/* Image */}
          <div
            className={`relative order-1 md:order-2 transition-all duration-1000 ${isVisible ? 'animate-slide-in-right opacity-100' : 'opacity-0'}`}
            style={{ animationDelay: '0.2s' }}
          >
            <div className="relative">
              {/* Image Frame Decoration */}
              <div className="absolute -inset-4 bg-gradient-to-br from-valentine-red/20 to-valentine-pink/40 rounded-3xl transform rotate-3" />
              <div className="absolute -inset-4 bg-valentine-lightPink rounded-3xl transform -rotate-2" />

              {/* Main Image */}
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="/couple.jpeg"
                  alt="Loving couple"
                  className="w-full h-auto object-cover image-hover"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-valentine-red/20 to-transparent" />
              </div>

              {/* Floating Heart Badge */}
              <div
                className={`absolute -bottom-6 -left-6 bg-white rounded-full p-4 shadow-lg transition-all duration-700 ${isVisible ? 'animate-float opacity-100' : 'opacity-0'}`}
                style={{ animationDelay: '0.6s' }}
              >
                <Heart className="w-8 h-8 text-valentine-red animate-heartbeat" fill="currentColor" />
              </div>

              {/* Small Decorative Element */}
              <div
                className={`absolute -top-4 -right-4 w-16 h-16 bg-valentine-red/10 rounded-full flex items-center justify-center transition-all duration-700 ${isVisible ? 'animate-pulse opacity-100' : 'opacity-0'}`}
                style={{ animationDelay: '0.8s' }}
              >
                <Heart className="w-6 h-6 text-valentine-red" fill="currentColor" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoveMessage;
