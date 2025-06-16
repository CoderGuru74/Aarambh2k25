// components/MoodyText.jsx
import { motion } from 'framer-motion';

export default function MoodyText({ text, className = '', glitch = true, shadowClass = 'text-shadow-strong-neon', flicker = false, gradientClass = 'bg-gradient-to-r from-dark-card via-dark-bg to-dark-card' }) {
  const baseClass = `
    font-black font-heading bg-clip-text text-transparent
    ${shadowClass}
    ${className}
  `;

  const glitchAnimation = {
    textShadow: [
      '2px 2px 0px #EC4899, -2px -2px 0px #06B6D4',
      '0px 0px 0px #EC4899, 0px 0px 0px #06B6D4',
      '2px 2px 0px #EC4899, -2px -2px 0px #06B6D4'
    ],
  };

  const glitchTransition = {
    duration: 0.5,
    repeat: Infinity,
    repeatType: "reverse",
  };

  const glitchLayerAnimation = {
    x: [0, -4, 4, 0],
  };

  const glitchLayerTransition = {
    duration: 0.2,
    repeat: Infinity,
  };

  return (
    <motion.div className="relative">
      {/* Main Text */}
      <motion.h1
        className={`${baseClass} ${gradientClass} ${flicker ? 'animate-flicker' : ''}`}
        animate={glitch ? glitchAnimation : undefined}
        transition={glitch ? glitchTransition : undefined}
        style={{ willChange: (glitch || flicker) ? 'text-shadow, transform, opacity' : 'auto' }}
      >
        {text}
      </motion.h1>
      {/* Glitch Overlay */}
      {glitch && (
        <motion.div
          className={`absolute inset-0 text-neon-pink opacity-20 ${className} font-black font-heading`}
          style={{
            background: 'none',
            WebkitBackgroundClip: 'unset',
            WebkitTextFillColor: 'currentColor',
            MozTextFillColor: 'currentColor',
            willChange: 'transform, opacity',
          }}
          animate={glitchLayerAnimation}
          transition={glitchLayerTransition}
        >
          {text}
        </motion.div>
      )}
    </motion.div>
  );
}