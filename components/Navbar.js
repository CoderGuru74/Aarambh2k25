import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
  const sections = [
    { name: 'About', href: '#about' },
    { name: 'Speakers', href: '#speakers' },
    { name: 'Events', href: '#events' },
    { name: 'Venue', href: '#venue' },
    { name: 'Schedule', href: '#schedule' },
    { name: 'Registration', href: '#register' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Sponsors', href: '#sponsors' },
    { name: 'Team', href: '#team' },
    { name: 'Newsletter', href: '#newsletter' },
    { name: 'Contact', href: '#contact' },
  ];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 p-4 backdrop-filter backdrop-blur-md bg-dark-card/50 shadow-lg border-b border-neon-cyan/20">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/Brand link */}
        <Link
          href="/"
          className="font-bold text-neon-yellow hover:text-white transition-colors duration-300 whitespace-nowrap max-w-full overflow-visible px-2"
          style={{
            fontSize: 'clamp(1.1rem, 7vw, 2rem)',
            letterSpacing: '0.04em',
            fontFamily: 'inherit',
            lineHeight: 1.1,
            display: 'inline-block'
          }}
          data-interactive="true"
        >
          Aarambh 2K25
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            ></path>
          </svg>
        </button>

        {/* Desktop navigation links */}
        <div className="hidden md:flex space-x-6">
          {sections.map((section) => (
            <Link
              key={section.name}
              href={section.href}
              className="text-gray-300 hover:text-neon-cyan transition-colors duration-300 font-mono text-lg"
              data-interactive="true"
            >
              {section.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile navigation menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center mt-4 space-y-4 bg-dark-card/70 py-4 rounded-b-lg">
          {sections.map((section) => (
            <Link
              key={section.name}
              href={section.href}
              className="text-gray-300 hover:text-neon-cyan transition-colors duration-300 font-mono text-lg"
              data-interactive="true"
              onClick={() => setIsOpen(false)}
            >
              {section.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
