// components/ScrollToTopButton.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) { // Show button after scrolling down 300px
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className="fixed bottom-8 right-8 p-4 rounded-full bg-neon-purple text-white shadow-lg z-50
                     hover:bg-neon-pink transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-neon-cyan"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          aria-label="Scroll to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}