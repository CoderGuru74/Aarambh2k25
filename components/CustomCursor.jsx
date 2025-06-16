// components/CustomCursor.jsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false); // Renamed for clarity

  useEffect(() => {
    let animationFrameId;

    const updateCursorPosition = (e) => {
      animationFrameId = requestAnimationFrame(() => {
        setCursorPos({ x: e.clientX, y: e.clientY });
      });
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const checkInteractiveTarget = (target) => {
      // Check if the target or any of its parents have data-interactive="true"
      return target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('[data-interactive="true"]');
    };

    const handleMouseOver = (e) => {
      if (checkInteractiveTarget(e.target)) {
        setIsHoveringInteractive(true);
      }
    };
    const handleMouseOut = (e) => {
      if (checkInteractiveTarget(e.target)) {
        // Only set to false if we are actually leaving an interactive element
        // This prevents flickering if moving between child elements of an interactive parent
        if (!e.relatedTarget || !checkInteractiveTarget(e.relatedTarget)) {
            setIsHoveringInteractive(false);
        }
      }
    };

    window.addEventListener('mousemove', updateCursorPosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    // Use capture phase for more reliable hover detection on dynamic elements
    document.documentElement.addEventListener('mouseover', handleMouseOver, true);
    document.documentElement.addEventListener('mouseout', handleMouseOut, true);

    const timeoutId = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.documentElement.removeEventListener('mouseover', handleMouseOver, true);
      document.documentElement.removeEventListener('mouseout', handleMouseOut, true);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <motion.div
      className={`custom-cursor fixed z-50 pointer-events-none rounded-full transition-all duration-150 ease-out-sine will-change-transform-opacity
        ${isClicked ? 'scale-75 bg-neon-pink/80' : ''}
      `}
      style={{
        left: cursorPos.x,
        top: cursorPos.y,
        opacity: isVisible ? 1 : 0,
        transform: 'translate(-50%, -50%)',
        // Dynamic size and glow based on hover state
        width: isHoveringInteractive ? '45px' : '20px', // Larger on hover
        height: isHoveringInteractive ? '45px' : '20px',
        background: isHoveringInteractive
          ? 'radial-gradient(circle, rgba(0,191,255,0.8) 0%, rgba(138,43,226,0.5) 70%)' // More complex gradient
          : 'radial-gradient(circle, rgba(0,191,255,0.7) 0%, rgba(138,43,226,0.3) 70%)',
        boxShadow: isHoveringInteractive
          ? '0 0 25px rgba(0, 191, 255, 0.9), 0 0 50px rgba(138, 43, 226, 0.7), 0 0 80px rgba(236, 72, 153, 0.5)' // More intense multi-color glow
          : '0 0 10px rgba(0, 191, 255, 0.5), 0 0 20px rgba(0, 191, 255, 0.3)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    />
  );
}