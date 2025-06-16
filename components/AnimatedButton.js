// components/AnimatedButton.jsx
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AnimatedButton({ href, children, variant = 'primary', className = '', ...props }) {
  const baseClasses = `
    relative inline-flex items-center justify-center
    px-10 py-4 font-bold text-xl rounded-full
    overflow-hidden
    group transition-all duration-500 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2
    z-10 /* Ensure button content is above pseudo-elements */
  `;

  let colors;
  let textColors;
  let ringColors;
  let shadowColors;

  if (variant === 'primary') {
    colors = 'bg-gradient-to-br from-neon-purple to-neon-cyan';
    textColors = 'text-white';
    ringColors = 'focus:ring-neon-purple';
    shadowColors = 'hover:shadow-neon-purple/70';
  } else if (variant === 'secondary') {
    colors = 'bg-neon-yellow';
    textColors = 'text-dark-bg';
    ringColors = 'focus:ring-neon-yellow';
    shadowColors = 'hover:shadow-neon-yellow/50';
  }

  // Define the border gradient for the pseudo-element
  const borderGradient = variant === 'primary' 
    ? 'linear-gradient(90deg, #A855F7, #EC4899, #06B6D4, #A855F7)'
    : 'linear-gradient(90deg, #EAB308, #EC4899, #06B6D4, #EAB308)';

  return (
    <Link
      href={href}
      className={`${baseClasses} ${colors} ${textColors} ${ringColors} ${shadowColors} ${className}`}
      as={motion.a}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {/* Outer animated border using pseudo-element */}
      <motion.span 
        className={`
          absolute inset-0 rounded-full z-0
          bg-cover bg-no-repeat
          group-hover:opacity-100 opacity-0 transition-opacity duration-300
        `}
        style={{
          backgroundImage: borderGradient,
          backgroundSize: '200% 100%', // Larger background to allow movement
          animation: `border-spin 4s linear infinite ${variant === 'secondary' ? 'reverse' : 'normal'}`,
          borderRadius: '9999px', // Full rounded border
          padding: '2px', // Simulates border thickness
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor', // For older Webkit
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.5 }} // Delay reveal after loader
      />

      <span className="relative z-10">{children}</span>
      {/* Inner glow effect on hover */}
      <span className={`absolute inset-0 rounded-full z-0 ${variant === 'primary' ? 'bg-white' : 'bg-dark-bg'} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></span>
    </Link>
  );
}