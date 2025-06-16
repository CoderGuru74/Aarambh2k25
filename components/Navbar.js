// components/Navbar.jsx
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi'; // Import icons for mobile menu

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { name: 'About', href: '#about' }, // Added about to navbar
    { name: 'Events', href: '#events' },
    { name: 'Schedule', href: '#schedule' },
    { name: 'Sponsors', href: '#sponsors' },
    { name: 'Accommodation', href: '#accommodation' },
    { name: 'Contact Us', href: '#contact' },
  ];

  // Animation variants for mobile menu
  const mobileMenuVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: { x: '0%', opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 20, staggerChildren: 0.1 } },
    exit: { x: '100%', opacity: 0, transition: { duration: 0.3 } }
  };

  const mobileMenuItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.nav
      className={`fixed w-full z-40 transition-all duration-300 will-change-transform ${
        isScrolled
          ? 'bg-dark-card/90 backdrop-blur-md shadow-lg py-3 border-b border-neon-cyan/20'
          : 'bg-transparent py-5'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80, damping: 15, delay: 2.5 }}
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo/Brand Name */}
        <Link href="/" className="text-3xl font-black font-heading text-neon-cyan hover:text-white transition-colors duration-300" aria-label="Home">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.7, duration: 0.5 }}
          >
            AARAMBH
          </motion.span>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex space-x-6 lg:space-x-8">
          {navItems.map((item) => (
            <motion.li
              key={item.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.8 + navItems.indexOf(item) * 0.1, duration: 0.5 }}
              className="relative group perspective-[1000px]"
            >
              <Link
                href={item.href}
                className="relative block text-lg font-body text-gray-300 hover:text-white transition-all duration-300 overflow-hidden cursor-pointer"
                data-interactive="true"
                aria-label={item.name}
              >
                {/* Front face of the 'box' */}
                <motion.span
                  className="block py-2 px-4 rounded-lg border-2 border-transparent bg-dark-card/50 group-hover:border-neon-purple transition-all duration-300 will-change-transform"
                  initial={{ rotateX: 0 }}
                  whileHover={{ rotateX: 90, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{ transformOrigin: 'bottom center', transformStyle: 'preserve-3d' }}
                >
                  {item.name}
                </motion.span>

                {/* Back face of the 'box' (Twisted/Glitchy) */}
                <motion.span
                  className="absolute inset-0 flex items-center justify-center py-2 px-4 rounded-lg border-2 border-neon-cyan bg-neon-cyan/10 text-neon-cyan will-change-transform"
                  initial={{ rotateX: -90, opacity: 0 }}
                  whileHover={{ rotateX: 0, opacity: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{ transformOrigin: 'top center', transformStyle: 'preserve-3d' }}
                >
                  {item.name}
                  {/* Subtle glitch effect on hover for the back face */}
                  <motion.div
                    className="absolute inset-0 bg-white opacity-0"
                    whileHover={{ opacity: [0, 0.1, 0, 0.2, 0] }}
                    transition={{ duration: 0.1, repeat: 3, repeatType: "reverse" }}
                    style={{
                        clipPath: 'polygon(0% 0%, 100% 0%, 100% 20%, 0% 20%)',
                        transform: 'translateY(var(--y))',
                        '--y': ['0%', '10%', '20%', '30%', '40%'].map(x => `${Math.random() * 100}%`),
                    }}
                  />
                </motion.span>
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-neon-cyan text-3xl focus:outline-none"
            aria-label="Toggle navigation"
            aria-expanded={isMobileMenuOpen}
            data-interactive="true"
          >
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 bg-dark-bg/95 backdrop-blur-sm z-30 flex flex-col items-center justify-center space-y-8"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Background pattern for mobile menu */}
            <div className="absolute inset-0 z-0 opacity-10"
               style={{
                 backgroundImage: 'linear-gradient(to right, #1C1C2B 1px, transparent 1px), linear-gradient(to bottom, #1C1C2B 1px, transparent 1px)',
                 backgroundSize: '40px 40px',
                 animation: 'gridFade 5s infinite ease-in-out alternate',
               }}/>

            <ul className="flex flex-col space-y-6 text-center">
              {navItems.map((item) => (
                <motion.li key={item.name} variants={mobileMenuItemVariants}>
                  <Link
                    href={item.href}
                    className="text-3xl font-body text-gray-300 hover:text-white transition-colors duration-300 block py-4 text-shadow-subtle-neon"
                    onClick={() => setIsMobileMenuOpen(false)}
                    data-interactive="true"
                    aria-label={item.name}
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-neon-pink text-4xl mt-8 focus:outline-none"
              aria-label="Close navigation"
              data-interactive="true"
            >
              <FiX />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;