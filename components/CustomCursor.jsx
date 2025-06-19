import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsMobile(isTouchDevice);
    if (isTouchDevice) return; // Exit if mobile

    let animationFrameId;

    const updateCursorPosition = (e) => {
      if (cursorRef.current) {
        animationFrameId = requestAnimationFrame(() => {
          cursorRef.current.style.left = `${e.clientX}px`;
          cursorRef.current.style.top = `${e.clientY}px`;
        });
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const checkInteractiveTarget = (target) => {
      return (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('[data-interactive="true"]')
      );
    };

    const handleMouseOver = (e) => {
      if (checkInteractiveTarget(e.target)) setIsHoveringInteractive(true);
    };

    const handleMouseOut = (e) => {
      if (checkInteractiveTarget(e.target)) {
        if (!e.relatedTarget || !checkInteractiveTarget(e.relatedTarget)) {
          setIsHoveringInteractive(false);
        }
      }
    };

    window.addEventListener('mousemove', updateCursorPosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.documentElement.addEventListener('mouseover', handleMouseOver, true);
    document.documentElement.addEventListener('mouseout', handleMouseOut, true);

    const timeoutId = setTimeout(() => setIsVisible(true), 100);

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

  // Don't render cursor on mobile devices
  if (isMobile) return null;

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor fixed z-50 pointer-events-none rounded-full transition-all duration-150 ease-out-sine will-change-transform-opacity
        ${isClicked ? 'scale-75 bg-neon-pink/80' : ''}
      `}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: 'translate(-50%, -50%)',
        width: isHoveringInteractive ? '45px' : '20px',
        height: isHoveringInteractive ? '45px' : '20px',
        background: isHoveringInteractive
          ? 'radial-gradient(circle, rgba(0,191,255,0.8) 0%, rgba(138,43,226,0.5) 70%)'
          : 'radial-gradient(circle, rgba(0,191,255,0.7) 0%, rgba(138,43,226,0.3) 70%)',
        boxShadow: isHoveringInteractive
          ? '0 0 25px rgba(0, 191, 255, 0.9), 0 0 50px rgba(138, 43, 226, 0.7), 0 0 80px rgba(236, 72, 153, 0.5)'
          : '0 0 10px rgba(0, 191, 255, 0.5), 0 0 20px rgba(0, 191, 255, 0.3)',
        transition: 'opacity 0.2s ease, width 0.15s, height 0.15s, background 0.15s, box-shadow 0.15s, transform 0.15s'
      }}
    />
  );
}
