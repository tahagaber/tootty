import { useEffect, useRef, useState } from 'react';
import { Heart, Feather } from 'lucide-react';

const LoveLetter = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [showSeal, setShowSeal] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const letterContent = "كل عيد حب وأنتِ عيدي. أنا مش مستني عيد حب عشان أقولك إني بحبك، ولا عشان أكتبلك كلام حلو، بس تقديرًا لليوم ده إنك دخلتي حياتي، وإن حياتي معاكي بقت حاجة تانية. أنتِ أغلى حاجة ربنا رزقني بيها، أنتِ اللي ما تتعوضيش، واللي ما تتقارنيش بحد، أنتِ اللي زيك قليل. ولو قولت وكررت مش هكفيكي كلام، ولا هيكفي عمري كله في حقك. حابب أقولك إنك عيدي، وحبي ليكي كل يوم بيزيد. أنتِ اللي اتمنيتها من الدنيا، أنتِ العوض في كل حاجة حلوة، وأنتِ اللي اتفق عليكي قلبي وعقلي إنهم يحبوك. أنتِ الأهل والصحاب، وأنتِ غايتي من الدنيا دي. بحبك يا تسنيم يا اغلي حاجه عندي";

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

  // Typewriter effect
  useEffect(() => {
    if (!isVisible) return;

    let index = 0;
    const timer = setInterval(() => {
      if (index < letterContent.length) {
        setDisplayedText(letterContent.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        setTimeout(() => setShowSeal(true), 500);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 px-4 overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-valentine-pink/40 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-valentine-red/10 rounded-full blur-3xl" />

      <div className="max-w-3xl mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div
            className={`flex items-center justify-center gap-3 mb-4 transition-all duration-700 ${isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'}`}
          >
            <Feather className="w-5 h-5 text-valentine-red" />
            <span className="font-body text-sm uppercase tracking-widest text-valentine-darkRed/70">
              From My Heart
            </span>
            <Feather className="w-5 h-5 text-valentine-red" />
          </div>
        </div>

        {/* Letter Container */}
        <div
          className={`relative transition-all duration-1000 ${isVisible ? 'animate-scale-in opacity-100' : 'opacity-0'}`}
          style={{ animationDelay: '0.2s' }}
        >
          {/* Paper Background */}
          <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden paper-texture">
            {/* Decorative Border */}
            <div className="absolute inset-4 border-2 border-valentine-red/20 rounded-2xl pointer-events-none" />

            {/* Corner Decorations */}
            <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-valentine-red/30 rounded-tl-lg" />
            <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-valentine-red/30 rounded-tr-lg" />
            <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-valentine-red/30 rounded-bl-lg" />
            <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-valentine-red/30 rounded-br-lg" />

            {/* Letter Content */}
            <div className="relative px-8 md:px-16 py-12 md:py-16">
              {/* Salutation */}
              <h3
                className={`font-display text-4xl md:text-5xl text-valentine-red mb-8 transition-all duration-700 ${isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'}`}
                style={{ animationDelay: '0.3s' }}
              >
                My Dearest Love,
              </h3>

              {/* Letter Body with Typewriter Effect */}
              <div className="min-h-[200px]">
                <p className="font-body text-lg md:text-xl text-gray-700 leading-relaxed typewriter-cursor">
                  {displayedText}
                </p>
              </div>

              {/* Closing */}
              <div
                className={`mt-10 transition-all duration-700 ${displayedText.length === letterContent.length ? 'opacity-100' : 'opacity-0'}`}
              >
                <p className="font-body text-lg text-gray-700 mb-2">With all my love,</p>
                <p className="font-display text-3xl text-valentine-darkRed">Your Valentine</p>
              </div>

              {/* Wax Seal */}
              <div
                className={`absolute bottom-8 right-8 md:bottom-12 md:right-16 transition-all duration-500 ${showSeal ? 'opacity-100 scale-100' : 'opacity-0 scale-150'}`}
              >
                <div className="relative">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-valentine-red rounded-full flex items-center justify-center shadow-lg animate-pulse-glow">
                    <Heart className="w-8 h-8 md:w-10 md:h-10 text-white" fill="currentColor" />
                  </div>
                  {/* Seal Shine */}
                  <div className="absolute top-2 left-3 w-4 h-4 bg-white/30 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Shadow Effect */}
          <div className="absolute -inset-2 bg-valentine-red/10 rounded-3xl -z-10 blur-xl" />
        </div>

        {/* Floating Hearts Around Letter */}
        <div className="absolute -top-8 -right-8 pointer-events-none">
          <Heart
            className={`w-6 h-6 text-valentine-red/30 animate-float ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            fill="currentColor"
            style={{ animationDelay: '0.5s' }}
          />
        </div>
        <div className="absolute -bottom-6 -left-6 pointer-events-none">
          <Heart
            className={`w-5 h-5 text-valentine-red/20 animate-float-delayed ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            fill="currentColor"
            style={{ animationDelay: '0.7s' }}
          />
        </div>
      </div>
    </section>
  );
};

export default LoveLetter;
