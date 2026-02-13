import { useState, useRef, useEffect } from 'react';
import { Music, Music2, Volume2, VolumeX } from 'lucide-react';

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const handleFirstInteraction = () => {
            if (!hasInteracted && audioRef.current) {
                setHasInteracted(true);
                audioRef.current.play().then(() => {
                    setIsPlaying(true);
                }).catch(err => {
                    console.log("Autoplay prevented or failed:", err);
                });

                // Remove listeners after first interaction
                window.removeEventListener('click', handleFirstInteraction);
                window.removeEventListener('touchstart', handleFirstInteraction);
                window.removeEventListener('scroll', handleFirstInteraction);
            }
        };

        window.addEventListener('click', handleFirstInteraction);
        window.addEventListener('touchstart', handleFirstInteraction);
        window.addEventListener('scroll', handleFirstInteraction);

        return () => {
            window.removeEventListener('click', handleFirstInteraction);
            window.removeEventListener('touchstart', handleFirstInteraction);
            window.removeEventListener('scroll', handleFirstInteraction);
        };
    }, [hasInteracted]);

    const togglePlay = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play().then(() => {
                    setIsPlaying(true);
                }).catch(err => {
                    console.error("Playback failed:", err);
                });
            }
        }
    };

    return (
        <div className="fixed bottom-8 right-8 z-[100]">
            <audio
                ref={audioRef}
                src="/music.mp3"
                loop
                preload="auto"
            />

            <button
                onClick={togglePlay}
                className={`group relative flex items-center justify-center w-16 h-16 rounded-full bg-white/90 backdrop-blur-md shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95 border-2 ${isPlaying ? 'border-valentine-red text-valentine-red' : 'border-gray-200 text-gray-400'
                    }`}
            >
                {isPlaying && (
                    <>
                        <div className="absolute inset-0 bg-valentine-red/20 rounded-full animate-ping" />
                        <div className="absolute -inset-1 bg-valentine-pink/30 rounded-full animate-pulse" />
                    </>
                )}

                <div className="relative flex items-center justify-center">
                    {isPlaying ? (
                        <Volume2 className="w-6 h-6" />
                    ) : (
                        <VolumeX className="w-6 h-6" />
                    )}
                </div>

                {isPlaying && (
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex gap-1">
                        <Music className="w-4 h-4 text-valentine-red animate-float" style={{ animationDelay: '0s' }} />
                        <Music2 className="w-5 h-5 text-valentine-pink animate-float-delayed" style={{ animationDelay: '0.4s' }} />
                        <Music className="w-3 h-3 text-valentine-red animate-float" style={{ animationDelay: '0.8s' }} />
                    </div>
                )}

                <span className="absolute right-full mr-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-sm font-medium text-valentine-darkRed shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {isPlaying ? "Pause Song" : "Play Romantic Music"}
                </span>
            </button>
        </div>
    );
};

export default MusicPlayer;
