// components/Loader.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [showLoader, setShowLoader] = useState(true);
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      const handleResize = () => {
        setWindowDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setShowLoader(false);
            onComplete();
          }, 1000);
          return 100;
        }
        return prev + Math.random() * 8 + 3; // Faster progress, more erratic
      });
    }, 80); // Faster updates
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {showLoader && (
        <motion.div
          className="fixed inset-0 z-50 bg-dark-bg flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {/* Animated Background Gradients */}
          <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/20 via-dark-bg to-neon-pink/20 animate-pulseNeon" />

          {/* More intense background digital static/grid */}
          <div className="absolute inset-0 z-0 opacity-10"
               style={{
                 backgroundImage: 'linear-gradient(to right, #1C1C2B 1px, transparent 1px), linear-gradient(to bottom, #1C1C2B 1px, transparent 1px)',
                 backgroundSize: '30px 30px', // Smaller grid for more density
                 animation: 'gridFade 3s infinite ease-in-out alternate', // Faster fade
                 willChange: 'opacity'
               }}/>

          {/* Floating Particles (More dense, slightly faster) */}
          {[...Array(80)].map((_, i) => ( // More particles
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-neon-cyan rounded-full will-change-transform-opacity"
              initial={{
                x: windowDimensions.width ? Math.random() * windowDimensions.width : 0,
                y: windowDimensions.height ? Math.random() * windowDimensions.height : 0,
                opacity: 0,
                scale: Math.random() * 0.7 + 0.3, // Slightly larger particles
              }}
              animate={{
                y: [null, Math.random() * -300 - 100, Math.random() * -600 - 200],
                x: [null, Math.random() * 150 - 75, Math.random() * 300 - 150],
                opacity: [0, 0.7, 0], // More opaque
                scale: [null, Math.random() * 1 + 0.5, Math.random() * 1.5 + 0.8],
              }}
              transition={{
                duration: Math.random() * 3 + 2, // Faster duration
                repeat: Infinity,
                delay: Math.random() * 1, // Less delay
                ease: "linear",
              }}
            />
          ))}

          <div className="text-center z-10">
            {/* Glitch Logo Animation */}
            <motion.div
              className="relative mb-8"
              animate={{
                textShadow: [
                  '2px 2px 0px #EC4899, -2px -2px 0px #06B6D4',
                  '0px 0px 0px #EC4899, 0px 0px 0px #06B6D4',
                  '2px 2px 0px #EC4899, -2px -2px 0px #06B6D4'
                ]
              }}
              transition={{ duration: 0.3, repeat: Infinity, repeatType: "reverse" }} // Faster glitch
            >
              <h1 className="text-8xl md:text-9xl font-black bg-gradient-to-r from-neon-purple via-neon-pink to-neon-cyan bg-clip-text text-transparent">
                AARAMBH
              </h1>
              <motion.div
                className="absolute inset-0 text-8xl md:text-9xl font-black text-neon-pink opacity-30" // More opaque glitch layer
                animate={{ x: [0, -6, 6, 0] }} // More aggressive glitch offset
                transition={{ duration: 0.15, repeat: Infinity }} // Faster glitch offset
              >
                AARAMBH
              </motion.div>
            </motion.div>

            <motion.h2
              className="text-4xl md:text-5xl font-bold text-neon-yellow mb-8 will-change-opacity animate-flicker" // Added flicker
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }} // Faster pulse
            >
              2K25
            </motion.h2>

            {/* Progress Bar */}
            <div className="w-80 h-2 bg-gray-800 rounded-full overflow-hidden mx-auto mb-4 border border-neon-cyan/50 animate-neon-border-pulse"> {/* Added border pulse */}
              <motion.div
                className="h-full bg-gradient-to-r from-neon-purple to-neon-cyan"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
                style={{ willChange: 'width' }}
              />
            </div>

            <motion.p
              className="text-neon-cyan text-xl will-change-opacity font-mono" // Using mono font for loading text
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 0.5, repeat: Infinity }} // Faster pulse
            >
              {Math.round(progress)}% Loading...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}