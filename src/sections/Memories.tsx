import { useEffect, useRef, useState } from 'react';
import { Heart, Camera } from 'lucide-react';

interface Memory {
  id: number;
  src: string;
  alt: string;
  caption: string;
}

const memories: Memory[] = [
  { id: 1, src: '/memory1.jpg', alt: 'أول صوره تبعتهالي', caption: 'وانا ببص علي دنيتي' },
  { id: 2, src: '/memory2.jpg', alt: 'اول مره اكل من ايدك', caption: 'اول مره اكل من ايدك ' },
  { id: 3, src: '/memory3.jpg', alt: 'قمري', caption: 'اقرب واحب صوره ليا ' },
  { id: 4, src: '/memory4.jpg', alt: 'بحب ابص علي المج دا اوي', caption: 'اول مره نكسب حاجه سوا ' },
  { id: 5, src: '/memory5.jpg', alt: 'اول تدوير علي اكونت ابراهيم ', caption: 'اول مره اغير  واسلط العيال علي ابراهيم ' },
  { id: 6, src: '/memory6.jpg', alt: 'عيني لما كانت فرحانه ليكي', caption: 'ودي بنتي الشاطره الي بتفخر بيها واثق انها احسن حد في الدنيا ' },
];

const Memories = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
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
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-valentine-pink/30 to-transparent" />

      <div className="max-w-6xl mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div
            className={`flex items-center justify-center gap-3 mb-4 transition-all duration-700 ${isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'}`}
          >
            <Camera className="w-6 h-6 text-valentine-red" />
            <span className="font-body text-sm uppercase tracking-widest text-valentine-darkRed/70">
              أحلى ذكرياتنا
            </span>
            <Camera className="w-6 h-6 text-valentine-red" />
          </div>

          <h2
            className={`font-display text-5xl md:text-6xl lg:text-7xl text-valentine-red mb-4 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'}`}
            style={{ animationDelay: '0.1s' }}
          >
            لحظاتنا اللي من القلب
          </h2>

          <p
            className={`font-body text-lg text-gray-600 max-w-2xl mx-auto transition-all duration-1000 ${isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'}`}
            style={{ animationDelay: '0.2s' }}
          >
            كل صورة بتحكي قصة حبنا.. وبتسجل كل لحظة حلوة عشناها مع بعض.
          </p>

          {/* Decorative Line */}
          <div
            className={`flex items-center justify-center gap-4 mt-6 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'}`}
            style={{ animationDelay: '0.3s' }}
          >
            <div className="w-24 h-px bg-gradient-to-r from-transparent to-valentine-red/50" />
            <Heart className="w-5 h-5 text-valentine-red animate-pulse" fill="currentColor" />
            <div className="w-24 h-px bg-gradient-to-l from-transparent to-valentine-red/50" />
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {memories.map((memory, index) => {
            // Different heights for masonry effect
            const heights = ['h-64', 'h-80', 'h-72', 'h-60', 'h-80', 'h-64'];
            const heightClass = heights[index % heights.length];

            // Different animation delays
            const delay = 0.1 * (index + 1);

            // Offset for middle column
            const offsetClass = index % 3 === 1 ? 'md:mt-12' : '';

            return (
              <div
                key={memory.id}
                className={`relative group ${offsetClass} transition-all duration-700 ${isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'}`}
                style={{ animationDelay: `${delay}s` }}
                onMouseEnter={() => setHoveredId(memory.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className={`relative ${heightClass} overflow-hidden rounded-2xl shadow-lg`}>
                  {/* Image */}
                  <img
                    src={memory.src}
                    alt={memory.alt}
                    className={`w-full h-full object-cover transition-all duration-500 ${hoveredId === memory.id ? 'scale-110' : 'scale-100'}`}
                  />

                  {/* Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-valentine-darkRed/80 via-valentine-red/20 to-transparent transition-opacity duration-300 ${hoveredId === memory.id ? 'opacity-100' : 'opacity-0'}`}
                  />

                  {/* Caption */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 p-4 transition-all duration-300 ${hoveredId === memory.id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                  >
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-white" fill="currentColor" />
                      <span className="font-body text-white text-sm font-medium">
                        {memory.caption}
                      </span>
                    </div>
                  </div>

                  {/* Corner Decoration */}
                  <div
                    className={`absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 ${hoveredId === memory.id ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
                  >
                    <Heart className="w-4 h-4 text-white" fill="currentColor" />
                  </div>
                </div>

                {/* Shadow Effect */}
                <div
                  className={`absolute -inset-1 bg-valentine-red/20 rounded-2xl -z-10 transition-all duration-300 ${hoveredId === memory.id ? 'blur-xl opacity-60' : 'blur-lg opacity-0'}`}
                />
              </div>
            );
          })}
        </div>

        {/* Bottom Decoration */}
        <div
          className={`flex justify-center mt-12 gap-2 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'}`}
          style={{ animationDelay: '0.8s' }}
        >
          {[...Array(5)].map((_, i) => (
            <Heart
              key={i}
              className={`w-4 h-4 text-valentine-red/${30 + i * 10} animate-float`}
              fill="currentColor"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Memories;
