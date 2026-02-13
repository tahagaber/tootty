import { useEffect, useState } from 'react';
import './App.css';
import Hero from './sections/Hero';
import LoveMessage from './sections/LoveMessage';
import Memories from './sections/Memories';
import LoveLetter from './sections/LoveLetter';
import InteractiveHeart from './sections/InteractiveHeart';
import Footer from './sections/Footer';
import FloatingHearts from './components/FloatingHearts';
import MusicPlayer from './components/MusicPlayer';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for smooth entrance
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-valentine-lightPink">
        <div className="text-center">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-valentine-red/20 rounded-full blur-xl animate-pulse" />
            <svg
              className="w-16 h-16 text-valentine-red animate-heartbeat"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <p className="mt-4 font-display text-2xl text-valentine-red">Loading Love...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Floating Hearts Background */}
      <FloatingHearts />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <LoveMessage />
        <Memories />
        <LoveLetter />
        <InteractiveHeart />
        <Footer />
        <MusicPlayer />
      </main>
    </div>
  );
}

export default App;
