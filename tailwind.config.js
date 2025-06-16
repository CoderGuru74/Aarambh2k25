/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0D0D15', // Slightly darker for more contrast
        'midnight-code': '#05050A', // Even deeper dark, almost black with a blue tint
        'dark-card': '#1C1C2B',
        'neon-cyan': '#00BFFF', // Sky blue-ish (keeping it as a general color, but not for pink elements)
        'neon-purple': '#8A2BE2', // Blue-violet (keeping it as a general color, but not for pink elements)
        'neon-pink': '#FF007F', // UPDATED: Consistent vibrant pink
        'neon-yellow': '#FFFF00', // Bright yellow
        'lime-green': '#39FF14', // Lime green
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"Fira Code"', 'monospace'], // For digital/code feel
      },
      boxShadow: {
        // Keeping original, as these primarily use neon-cyan
        'neon': '0 0 5px rgba(0, 191, 255, 0.5), 0 0 10px rgba(0, 191, 255, 0.4), 0 0 20px rgba(0, 191, 255, 0.3)',
        'neon-md': '0 0 8px rgba(0, 191, 255, 0.6), 0 0 15px rgba(0, 191, 255, 0.5), 0 0 30px rgba(0, 191, 255, 0.4)',
        'neon-lg': '0 0 10px rgba(0, 191, 255, 0.7), 0 0 20px rgba(0, 191, 255, 0.6), 0 0 40px rgba(0, 191, 255, 0.5)',
        'card-glow': '0 0 15px rgba(0, 191, 255, 0.3), 0 0 30px rgba(138, 43, 226, 0.2)' // Subtle card glow
      },
      textShadow: {
        sm: '0 0 3px var(--tw-shadow-color)',
        DEFAULT: '0 0 5px var(--tw-shadow-color), 0 0 10px var(--tw-shadow-color)',
        md: '0 0 8px var(--tw-shadow-color), 0 0 15px var(--tw-shadow-color)',
        lg: '0 0 10px var(--tw-shadow-color), 0 0 20px var(--tw-shadow-color), 0 0 40px var(--tw-shadow-color)',
        // UPDATED: All blue/purple replaced with neon-pink
        'strong-neon': '0 0 10px #FF007F, 0 0 20px #FF007F, 0 0 30px #FF007F, 0 0 40px rgba(255, 0, 127, 0.8), 0 0 70px rgba(255, 0, 127, 0.6), 0 0 80px rgba(255, 0, 127, 0.4), 0 0 100px rgba(255, 0, 127, 0.2)',
        // UPDATED: Subtle neon also made pink-focused
        'subtle-neon': '0 0 5px rgba(255,0,127,0.6), 0 0 10px rgba(255,0,127,0.4)'
      },
      willChange: {
        'transform-opacity': 'transform, opacity',
        'all': 'all',
      },
      keyframes: {
        glitch: {
          '0%, 100%': {
            transform: 'translate(0, 0)',
            'text-shadow': '2px 2px 0px #FF007F, -2px -2px 0px rgba(255, 0, 127, 0.6)', // UPDATED to pink
          },
          '20%, 60%': {
            transform: 'translate(-2px, 2px)',
            'text-shadow': '-2px -2px 0px #FF007F, 2px 2px 0px rgba(255, 0, 127, 0.6)', // UPDATED to pink
          },
          '40%': {
            transform: 'translate(2px, -2px)',
            'text-shadow': '2px -2px 0px #FF007F, -2px 2px 0px rgba(255, 0, 127, 0.6)', // UPDATED to pink
          },
          '80%': {
            transform: 'translate(-1px, 1px)',
            'text-shadow': '-1px 1px 0px #FF007F, 1px -1px 0px rgba(255, 0, 127, 0.6)', // UPDATED to pink
          },
        },
        fadeZoomRotate: {
          '0%, 100%': { opacity: '0', transform: 'scale(0.8) rotate(0deg)' },
          '50%': { opacity: '0.05', transform: 'scale(1.1) rotate(180deg)' },
        },
        radialPulse: {
          '0%, 100%': { transform: 'scale(0.8)', opacity: '0.1' },
          '50%': { transform: 'scale(1.2)', opacity: '0.25' },
        },
        gridFade: {
          '0%, 100%': { opacity: '0.05' },
          '50%': { opacity: '0.15' },
        },
        pulseNeon: {
          '0%, 100%': { filter: 'blur(20px) brightness(1)', opacity: '0.1' },
          '50%': { filter: 'blur(30px) brightness(1.2)', opacity: '0.2' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        horizontalWave: {
            '0%, 100%': { transform: 'translateX(0)' },
            '50%': { transform: 'translateX(-50px)' },
        },
        'bubble-float': {
            '0%': { transform: 'translate(0, 0) scale(0.5)', opacity: '0.2' },
            '50%': { transform: 'translate(50px, -100px) scale(1)', opacity: '0.5' },
            '100%': { transform: 'translate(100px, -200px) scale(0.5)', opacity: '0' },
        },
        'shooting-star': {
            '0%': { transform: 'translateX(-100vw) translateY(0)', opacity: '0' },
            '10%': { opacity: '1' },
            '100%': { transform: 'translateX(100vw) translateY(50vh)', opacity: '0' },
        },
        'neon-border-pulse': {
          '0%, 100%': { borderColor: 'rgba(255,0,127,0.5)' }, // UPDATED to pink
          '50%': { borderColor: 'rgba(255,0,127,0.8)' }, // UPDATED to pink
        },
        'fade-in-up': {
            '0%': { opacity: '0', transform: 'translateY(20px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'rotate-y-fwd': {
            '0%': { transform: 'rotateY(0deg)' },
            '100%': { transform: 'rotateY(360deg)' },
        },
        'flip-vertical-right': {
            '0%': { transform: 'translateZ(0) rotateY(0)' },
            '100%': { transform: 'translateZ(160px) rotateY(180deg)' },
        },
        // NEW ANIMATIONS FOR COLLEGE FEST VIBE
        flicker: {
          '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': {
            opacity: '1',
            textShadow: '0 0 5px rgba(255, 0, 127, 0.8), 0 0 15px rgba(255, 0, 127, 0.6), 0 0 25px rgba(255, 0, 127, 0.4)' // UPDATED to pink
          },
          '20%, 24%, 55%': {
            opacity: '0.8',
            textShadow: 'none'
          }
        },
        'scanline-pulse': {
          '0%, 100%': { backgroundPosition: '0% 0%', opacity: '0.08' },
          '50%': { backgroundPosition: '100% 100%', opacity: '0.15' },
        },
        'digital-flow-x': {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '100% 0%' },
        },
        'digital-flow-y': {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '0% 100%' },
        },
        'pulse-light': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.2' },
          '50%': { transform: 'scale(1.05)', opacity: '0.3' },
        },
        'border-spin': {
            '0%': { transform: 'rotate(0deg) scale(1)' },
            '100%': { transform: 'rotate(360deg) scale(1.05)' },
        },
        'text-reveal': { // For "2K25"
          '0%': { width: '0%', opacity: '0', 'border-right': '2px solid transparent' },
          '1%': { opacity: '1' },
          '100%': { width: '100%', opacity: '1', 'border-right': '2px solid transparent' }
        },
        'text-blink-caret': { // For "2K25"
          '0%, 100%': { borderColor: 'transparent' },
          '50%': { borderColor: 'white' }
        },
      },
      animation: {
        glitch: 'glitch 0.8s infinite',
        fadeZoomRotate: 'fadeZoomRotate 6s ease-in-out infinite',
        radialPulse: 'radialPulse 4s ease-in-out infinite',
        gridFade: 'gridFade 5s ease-in-out infinite alternate',
        pulseNeon: 'pulseNeon 3s ease-in-out infinite alternate',
        float: 'float 3s ease-in-out infinite alternate',
        horizontalWave: 'horizontalWave 20s linear infinite alternate',
        'bubble-float': 'bubble-float 10s ease-in-out infinite',
        'shooting-star': 'shooting-star 8s linear infinite',
        'neon-border-pulse': 'neon-border-pulse 3s ease-in-out infinite alternate',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'rotate-y-fwd': 'rotate-y-fwd 6s ease-in-out infinite',
        'flip-vertical-right': 'flip-vertical-right 0.6s ease-in-out both',
        // NEW ANIMATIONS
        flicker: 'flicker 3s infinite step-end', // Use step-end for 'on/off' effect
        'scanline-pulse': 'scanline-pulse 10s ease-in-out infinite alternate',
        'digital-flow-x': 'digital-flow-x 30s linear infinite',
        'digital-flow-y': 'digital-flow-y 40s linear infinite',
        'pulse-light': 'pulse-light 4s ease-in-out infinite alternate',
        'border-spin': 'border-spin 8s linear infinite',
        'text-type': 'text-reveal 2s steps(40, end), text-blink-caret .75s step-end infinite', // For 2K25
      }
    },
  },
  plugins: [
    function ({ addUtilities, theme }) {
      const newUtilities = {
        '.text-shadow': {
          'text-shadow': theme('textShadow.DEFAULT'),
        },
        '.text-shadow-sm': {
          'text-shadow': theme('textShadow.sm'),
        },
        '.text-shadow-md': {
          'text-shadow': theme('textShadow.md'),
        },
        '.text-shadow-lg': {
          'text-shadow': theme('textShadow.lg'),
        },
        '.text-shadow-strong-neon': {
          'text-shadow': theme('textShadow.strong-neon'),
        },
        '.text-shadow-subtle-neon': {
          'text-shadow': theme('textShadow.subtle-neon'),
        },
        '.will-change-transform-opacity': {
          'will-change': 'transform, opacity',
        },
        '.will-change-all': {
          'will-change': 'all',
        },
        '.will-change-width': { // For text reveal
          'will-change': 'width',
        },
        // Custom cursor styles for easy application
        '.cursor-interactive': {
            'cursor': 'none', /* Hide default cursor */
            // Add a data attribute handler for the custom cursor
            '[data-interactive="true"]': {
                'cursor': 'none', /* Still hide default for interactive elements */
            },
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
};