// pages/index.js
import Head from 'next/head';
import { useState, useRef, useEffect, useCallback } from 'react';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import EventCard from '../components/EventCard';
import ScrollToTopButton from '../components/ScrollToTopButton';
import AnimatedButton from '../components/AnimatedButton';
import CustomCursor from '../components/CustomCursor';
import VenueSection from '../components/VenueSection';
import MoodyText from '../components/MoodyText';
import { motion, useScroll, useTransform, animate } from 'framer-motion';

export default function Home() {
  const [loading, setLoading] = useState(true);

  const events = [
    { id: 1, title: 'CodeVerse Hackathon', description: '24-hour coding challenge for innovation, collaboration, and groundbreaking solutions.', icon: '💻', link: '#event-hackathon' },
    { id: 2, title: 'Robo Rumble Arena', description: 'Witness the ultimate clash of custom-built robots in a high-octane battle.', icon: '🤖', link: '#event-robo' },
    { id: 3, title: 'Design Sprint Challenge', description: 'Ignite your creativity and solve real-world problems through rapid prototyping.', icon: '🎨', link: '#event-design' },
    { id: 4, title: 'Gaming Gauntlet Esports', description: 'Compete in our premier esports tournament across various popular titles.', icon: '🎮', link: '#event-gaming' },
    { id: 5, title: 'Ideathon: Pitch Perfect', description: 'Transform your innovative ideas into compelling pitches and win big.', icon: '💡', link: '#event-ideathon' },
    { id: 6, title: 'Circuit Crafters Workshop', description: 'Hands-on experience building and debugging complex electronic circuits.', icon: '⚙️', link: '#event-circuits' },
  ];

  const eventRefs = useRef([]);
  const carRef = useRef(null);
  const eventsSectionRef = useRef(null);

  const { scrollYProgress: eventsScrollProgress } = useScroll({
    target: eventsSectionRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useTransform(eventsScrollProgress, [0.2, 0.8], [0, 1]);

  const [isAnimatingCar, setIsAnimatingCar] = useState(false);

  const animateCar = useCallback(async () => {
      if (!eventsSectionRef.current || events.length === 0 || isAnimatingCar) return;

      setIsAnimatingCar(true);

      const points = eventRefs.current
          .filter(Boolean)
          .map((ref) => {
              const rect = ref.getBoundingClientRect();
              const containerRect = eventsSectionRef.current.getBoundingClientRect();
              const x = rect.left + rect.width / 2 - containerRect.left;
              const y = rect.top + rect.height / 2 - containerRect.top;
              return { x, y };
          });

      if (points.length < 2) {
        setIsAnimatingCar(false);
        return;
      }

      const svgElement = document.getElementById('eventPathSvg');
      if (!svgElement) {
        console.warn("SVG container with ID 'eventPathSvg' not found.");
        setIsAnimatingCar(false);
        return;
      }
      const svgRect = svgElement.getBoundingClientRect();

      const adjustedPoints = points.map(p => ({
          x: p.x - svgRect.left,
          y: p.y - svgRect.top
      }));

      const pathData = adjustedPoints.map((p, i) =>
          i === 0 ? `M ${p.x},${p.y}` : `L ${p.x},${p.y}`
      ).join(' ');

      const svgPath = document.getElementById('eventPath');
      if (svgPath) {
          svgPath.setAttribute('d', pathData);
      } else {
        console.warn("SVG path element with ID 'eventPath' not found.");
        setIsAnimatingCar(false);
        return;
      }

      if (carRef.current) {
          await animate(carRef.current, {
              x: points[0].x,
              y: points[0].y,
              opacity: 1
          }, {
              duration: 0.5,
              ease: "easeOut"
          }).asPromise();
          await new Promise(resolve => setTimeout(resolve, 500));

          for (let i = 0; i < points.length; i++) {
              const currentPoint = points[i];
              await animate(carRef.current, {
                  x: currentPoint.x,
                  y: currentPoint.y
              }, {
                  duration: 1.0,
                  ease: "easeInOut",
              }).asPromise();
              await new Promise(resolve => setTimeout(resolve, 400));
          }
      }
      setIsAnimatingCar(false);
  }, [events.length, isAnimatingCar]);

  useEffect(() => {
    let observer;
    const currentEventsSectionRef = eventsSectionRef.current;

    if (currentEventsSectionRef) {
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !isAnimatingCar) {
          animateCar();
        }
      }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
      });

      observer.observe(currentEventsSectionRef);
    }

    return () => {
      if (observer && currentEventsSectionRef) {
        observer.unobserve(currentEventsSectionRef);
      }
    };
  }, [animateCar, isAnimatingCar]);


  const heroTargetRef = useRef(null);
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroTargetRef,
    offset: ["start end", "end start"]
  });
  const heroScale = useTransform(heroScrollProgress, [0, 0.5], [1, 1.2]);
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.5, 0.8], [1, 1, 0]);
  const heroY = useTransform(heroScrollProgress, [0, 1], ['0%', '-50%']);


  return (
    <>
      <Head>
        <title>Aarambh 2K25 - The Ultimate Cybernetic Fest</title>
        <meta name="description" content="Aarambh 2K25 - College Tech Fest: Unleash Your Inner Tech. Ignite the Future." />
        <link rel="icon" href="/favicon.ico" />
        {/* Import Fira Code font from Google Fonts */}
        <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&display=swap" rel="stylesheet" />
      </Head>

      {loading && <Loader onComplete={() => setLoading(false)} />}

      {!loading && (
        <div className="min-h-screen bg-midnight-code font-body text-white relative cursor-none">
          <Navbar />
          <CustomCursor />

          <main>
            {/* Global Background Overlay for the entire site */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-5 overflow-hidden">
                {/* Subtle digital grid/circuit board overlay */}
                <div className="absolute inset-0"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, rgba(28, 28, 43, 0.5) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(28, 28, 43, 0.5) 1px, transparent 1px)
                        `,
                        backgroundSize: '60px 60px',
                        animation: 'gridFade 8s infinite ease-in-out alternate',
                        willChange: 'opacity'
                    }}>
                </div>

                {/* Animated scanlines across the entire page */}
                <div className="absolute inset-0"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(0,191,255,0.05) 1px, transparent 1px)
                        `,
                        backgroundSize: '100% 2px',
                        animation: 'scanline-pulse 15s linear infinite alternate',
                        willChange: 'background-position, opacity'
                    }}/>

                {/* Randomly floating larger "data packets" or "energy cells" */}
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={`global-bubble-${i}`}
                        className="absolute w-20 h-20 bg-gradient-to-br from-neon-purple/20 to-neon-cyan/20 rounded-full blur-xl opacity-0 will-change-transform-opacity"
                        initial={{
                            x: `${Math.random() * 100}vw`,
                            y: `${Math.random() * 100}vh`,
                            scale: Math.random() * 0.5 + 0.5
                        }}
                        animate={{
                            x: [`${Math.random() * 100}vw`, `${Math.random() * 100}vw`, `${Math.random() * 100}vw`],
                            y: [`${Math.random() * 100}vh`, `${Math.random() * 100}vh`, `${Math.random() * 100}vh`],
                            opacity: [0, 0.1, 0.2, 0.1, 0],
                            scale: [null, Math.random() * 0.8 + 0.8, Math.random() * 0.5 + 0.5]
                        }}
                        transition={{
                            duration: Math.random() * 20 + 20,
                            repeat: Infinity,
                            delay: Math.random() * 10,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>

            {/* Hero Section */}
            <section
              ref={heroTargetRef}
              className="relative h-screen flex items-center justify-center text-center overflow-hidden"
            >
              {/* Pulsing Spheres (More intense) */}
              <motion.div
                className="absolute w-60 h-60 bg-neon-purple rounded-full opacity-5 blur-xl -left-30 top-1/4 animate-fadeZoomRotate will-change-transform"
                style={{ filter: 'blur(40px)' }}
              ></motion.div>
              <motion.div
                className="absolute w-52 h-52 bg-neon-cyan rounded-full opacity-5 blur-xl -right-20 bottom-1/3 animate-fadeZoomRotate will-change-transform"
                style={{ animationDelay: '2s', filter: 'blur(35px)' }}
              ></motion.div>
              <motion.div
                className="absolute w-44 h-44 bg-neon-pink rounded-full opacity-5 blur-xl top-10 left-1/4 animate-fadeZoomRotate will-change-transform"
                style={{ animationDelay: '4s', filter: 'blur(30px)' }}
              ></motion.div>

              {/* Floating Particles (More subtle, background elements) */}
              {[...Array(150)].map((_, i) => (
                <motion.div
                  key={`hero-particle-${i}`}
                  className="absolute w-0.5 h-0.5 bg-neon-cyan rounded-full opacity-20 will-change-transform-opacity"
                  initial={{
                    x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
                    y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : 0,
                    opacity: 0,
                    scale: Math.random() * 0.8 + 0.2
                  }}
                  animate={{
                    y: [null, Math.random() * -600 - 100, Math.random() * -1200 - 200],
                    x: [null, Math.random() * 150 - 75, Math.random() * 300 - 150],
                    opacity: [0, 0.2, 0.4, 0.2, 0],
                    scale: [null, Math.random() * 1 + 0.2, Math.random() * 1.2 + 0.4],
                  }}
                  transition={{
                    duration: Math.random() * 10 + 10,
                    repeat: Infinity,
                    delay: Math.random() * 5,
                    ease: "linear",
                  }}
                />
              ))}

              {/* Dynamic light streaks/shooting stars - More pronounced */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`shooting-star-${i}`}
                  className="absolute w-1 h-1 bg-gradient-to-r from-transparent via-neon-yellow to-transparent rounded-full transform rotate-45 opacity-0 will-change-transform-opacity"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 70}%`,
                    width: `${Math.random() * 80 + 80}px`,
                    height: '2px',
                  }}
                  animate={{
                    x: [0, 300, 600, 900, 1200, 1500],
                    y: [0, 75, 150, 225, 300, 375],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: Math.random() * 2 + 2,
                    repeat: Infinity,
                    delay: Math.random() * 4,
                    ease: "linear",
                  }}
                />
              ))}

              <motion.div
                className="relative z-10 p-6 will-change-transform"
                initial="hidden"
                animate="visible"
                style={{ y: heroY }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.2,
                      delayChildren: 1.5
                    }
                  },
                }}
              >
                {/* AARAMBH with MoodyText Component - PURE PINK & GLITCH COLOR FIXED */}
                <MoodyText
                  text="AARAMBH"
                  className="text-8xl md:text-9xl mb-4"
                  glitch={true}
                  glitchClass="text-neon-pink" // Explicitly set glitch color to pink
                  shadowClass="text-shadow-strong-neon" // This will now use the pink definition from tailwind.config.js
                  flicker={true}
                  gradientClass="bg-gradient-to-r from-neon-pink to-neon-pink" // Ensures solid pink gradient for base text
                  style={{ color: '#FF007F' }} // Inline style for maximum override
                />

                {/* 2K25 with typing and blinking cursor effect */}
                <motion.h2
                  className="text-3xl md:text-4xl font-bold text-neon-yellow font-mono mb-8 relative inline-block overflow-hidden whitespace-nowrap text-shadow-subtle-neon will-change-width"
                  style={{
                      animation: 'text-type 2s steps(4, end) forwards, text-blink-caret .75s step-end infinite',
                      borderRight: '2px solid white'
                  }}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%', borderRightColor: 'transparent' }}
                  transition={{
                    duration: 2,
                    ease: "linear",
                    delay: 3
                  }}
                  onAnimationComplete={() => {
                    // Stop caret blinking after typing, or keep it if desired
                    // This is more complex with just CSS, might need JS for fine control
                  }}
                >
                  2K25
                </motion.h2>


                <motion.p
                  className="text-xl md:text-2xl text-gray-300 font-body mb-8 max-w-2xl mx-auto leading-relaxed will-change-transform-opacity"
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 10, delay: 3.5 } },
                  }}
                >
                  Unleash Your Inner Tech. Ignite the Future.
                </motion.p>

                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 10, delay: 3.8 } },
                  }}
                >
                  <AnimatedButton href="#register" variant="primary" data-interactive="true">
                    Register Now
                  </AnimatedButton>
                </motion.div>
              </motion.div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 px-4 container mx-auto text-center relative overflow-hidden">
                {/* Background hexagons with more pronounced spin */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 will-change-transform"
                  initial={{ rotate: 0, scale: 1 }}
                  animate={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: 'center center' }}
                >
                    <svg className="w-2/3 h-auto text-neon-purple/20" viewBox="0 0 200 200" fill="currentColor">
                        <path d="M100 0L0 50L0 150L100 200L200 150L200 50Z" />
                    </svg>
                </motion.div>

                {/* Pulsing Blobs - More prominent for sections */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-neon-cyan to-transparent rounded-full mix-blend-screen opacity-15 blur-xl animate-radialPulse will-change-transform"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tl from-neon-pink to-transparent rounded-full mix-blend-screen opacity-15 blur-xl animate-radialPulse will-change-transform" style={{ animationDelay: '2s' }}></div>

                {/* Subtle Floating Particles - Increased density */}
                {[...Array(30)].map((_, i) => (
                  <motion.div
                    key={`about-particle-${i}`}
                    className="absolute w-2 h-2 bg-neon-yellow rounded-full opacity-15 animate-float will-change-transform"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 4}s`,
                      filter: 'blur(1px)'
                    }}
                  ></motion.div>
                ))}

                <motion.h2
                  className="relative z-10 text-5xl font-bold font-heading text-center mb-16 bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent
                                  pb-4 border-b-2 border-neon-cyan/50 text-shadow-subtle-neon will-change-transform-opacity"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.8 }}
                >
                  About Aarambh 2K25
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-24 h-1 bg-gradient-to-r from-neon-purple to-neon-pink rounded-full"></span>
                </motion.h2>
                <p className="relative z-10 text-xl text-gray-300 font-body max-w-3xl mx-auto leading-relaxed will-change-transform-opacity">
                  Aarambh 2K25 is not just a fest; it's a convergence of minds, a celebration of innovation, and a launchpad for the future. Prepare to immerse yourself in cutting-edge technology, fierce competitions, insightful workshops, and unforgettable experiences. This year, we're pushing the boundaries to bring you an event that truly ignites your passion for technology and creativity. Join us as we build, learn, and grow together in this cybernetic journey!
                </p>
            </section>


            {/* Events Section - WITH CONNECTING LINE AND CAR */}
            <section id="events" className="py-20 px-4 container mx-auto relative overflow-hidden" ref={eventsSectionRef}>
              {/* Energetic background grid with digital flow */}
              <div className="absolute inset-0 z-0 opacity-10"
                   style={{
                     backgroundImage: `
                        linear-gradient(to right, #1C1C2B 1px, transparent 1px),
                        linear-gradient(to bottom, #1C1C2B 1px, transparent 1px),
                        linear-gradient(45deg, rgba(0, 191, 255, 0.05) 1px, transparent 1px),
                        linear-gradient(-45deg, rgba(138, 43, 226, 0.05) 1px, transparent 1px)
                     `,
                     backgroundSize: '40px 40px, 40px 40px, 80px 80px, 80px 80px',
                     animation: 'gridFade 5s infinite ease-in-out alternate',
                     willChange: 'opacity'
                   }}>
              </div>

              {/* Pulsing central light source */}
              <div className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-neon-yellow/30 to-transparent blur-3xl opacity-15 animate-pulseNeon will-change-transform"></div>

              {/* More dynamic background glow elements for events */}
              <div className="absolute top-1/4 left-10 w-40 h-40 bg-neon-cyan rounded-full opacity-10 blur-2xl animate-pulse-light will-change-transform" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-neon-pink rounded-full opacity-10 blur-2xl animate-pulse-light will-change-transform" style={{ animationDelay: '1.5s' }}></div>


              <motion.h2
                className="text-5xl font-bold font-heading text-center mb-16 bg-gradient-to-r from-neon-pink to-neon-yellow bg-clip-text text-transparent
                                pb-4 border-b-2 border-neon-cyan/50 relative z-10 text-shadow-subtle-neon will-change-transform-opacity"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8 }}
              >
                Our Stellar Events
                <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-24 h-1 bg-gradient-to-r from-neon-pink to-neon-yellow rounded-full"></span>
              </motion.h2>

              {/* SVG for the connecting line */}
              <svg id="eventPathSvg" className="absolute top-0 left-0 w-full h-full pointer-events-none z-10" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet">
                  <motion.path
                      id="eventPath"
                      d="M 0,0 L 0,0"
                      fill="none"
                      stroke="url(#line-gradient)"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      style={{ pathLength, willChange: 'stroke-dashoffset, stroke-dasharray' }}
                  />
                  <defs>
                      <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#00BFFF" />
                          <stop offset="50%" stopColor="#39FF14" />
                          <stop offset="100%" stopColor="#FFFF00" />
                      </linearGradient>
                  </defs>
              </svg>

              {/* Animated Car Icon */}
              <motion.div
                ref={carRef}
                className="absolute w-12 h-12 bg-gradient-to-br from-lime-green to-neon-yellow rounded-full flex items-center justify-center text-3xl font-bold z-20 will-change-transform-opacity"
                style={{
                  left: 0,
                  top: 0,
                  transform: 'translate(-50%, -50%)',
                  opacity: 0
                }}
                animate={{ opacity: isAnimatingCar ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              >
                🚗
              </motion.div>


              <motion.div
                // Updated grid for more lattitudinal layout on larger screens
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-8 relative z-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
                }}
                data-interactive="true"
                // Add hover effects for cards
                whileHover={{
                  scale: 1.03,
                  boxShadow: '0 0 20px rgba(0, 191, 255, 0.4), 0 0 40px rgba(138, 43, 226, 0.3)',
                  transition: { duration: 0.2 }
                }}
                className="rounded-lg overflow-hidden bg-dark-card p-6 border border-dark-card transition-all duration-300
                                hover:border-neon-cyan hover:shadow-card-glow will-change-transform-opacity"
              >
                {events.map((event, index) => (
                  <motion.div key={event.id} ref={el => eventRefs.current[index] = el}
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
                    }}
                    data-interactive="true"
                    // Add hover effects for cards
                    whileHover={{
                      scale: 1.03,
                      boxShadow: '0 0 20px rgba(0, 191, 255, 0.4), 0 0 40px rgba(138, 43, 226, 0.3)',
                      transition: { duration: 0.2 }
                    }}
                    className="rounded-lg overflow-hidden bg-dark-card p-6 border border-dark-card transition-all duration-300
                                hover:border-neon-cyan hover:shadow-card-glow will-change-transform-opacity"
                  >
                    {/* Assuming EventCard uses event.icon, event.title, event.description */}
                    <EventCard {...event} index={index} />
                  </motion.div>
                ))}
              </motion.div>
            </section>

            {/* Venue Section (Minimal changes, mainly background) */}
            <VenueSection />

            {/* Schedule Section */}
            <section id="schedule" className="py-20 px-4 container mx-auto text-center relative overflow-hidden">
                {/* Animated circuit pattern background */}
                <div className="absolute inset-0 z-0 opacity-5 will-change-transform"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M25 0V25H0V75H25V100H75V75H100V25H75V0H25Z' fill='none' stroke='%231C1C2B' stroke-width='1'/%3E%3C/svg%3E")`,
                      backgroundSize: '100px 100px',
                      animation: 'digital-flow-x 60s linear infinite, digital-flow-y 60s linear infinite', // Slower flow
                      filter: 'invert(1) opacity(0.3)',
                      backgroundBlendMode: 'overlay', // Blend with other bg elements
                    }}>
                </div>
                {/* Pulsing light source */}
                <div className="absolute top-1/3 left-1/2 w-48 h-48 bg-neon-cyan rounded-full mix-blend-screen opacity-10 blur-2xl animate-float will-change-transform"></div>
                <div className="absolute bottom-1/4 right-1/4 w-60 h-60 bg-neon-purple rounded-full mix-blend-screen opacity-10 blur-2xl animate-float will-change-transform" style={{ animationDelay: '3s' }}></div>


              <motion.h2
                className="text-5xl font-bold font-heading text-center mb-16 bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent
                                pb-4 border-b-2 border-neon-purple/50 relative z-10 text-shadow-subtle-neon will-change-transform-opacity"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Fest Schedule
                <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-24 h-1 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-full"></span>
              </motion.h2>
              <p className="text-xl text-gray-300 font-body mb-8 max-w-2xl mx-auto leading-relaxed relative z-10 will-change-transform-opacity">
                Prepare for an action-packed experience! Our detailed schedule will be released soon.
                Stay tuned for the complete timeline of Aarambh 2K25, featuring exciting events, workshops, and keynote speakers.
              </p>
            </section>

            {/* Registration Section */}
            <section id="register" className="py-20 px-4 container mx-auto text-center relative overflow-hidden">
                {/* More dynamic background pattern - glowing dots/nodes */}
                <div className="absolute inset-0 z-0 opacity-15 will-change-opacity"
                    style={{
                      backgroundImage: 'radial-gradient(circle at center, #8A2BE2 1px, transparent 1px), radial-gradient(circle at center, #00BFFF 1px, transparent 1px)',
                      backgroundSize: '40px 40px',
                      backgroundPosition: '0 0, 20px 20px',
                      animation: 'pulseNeon 3s infinite ease-in-out alternate, digital-flow-x 50s linear infinite',
                    }}>
                </div>
                {/* Randomly generated "data lines" or "energy conduits" */}
                {[...Array(10)].map((_, i) => (
                    <motion.div
                        key={`data-line-${i}`}
                        className="absolute bg-gradient-to-r from-transparent via-lime-green/50 to-transparent h-0.5 opacity-0 will-change-transform-opacity"
                        initial={{
                            x: `${Math.random() * 100}vw`,
                            y: `${Math.random() * 100}vh`,
                            width: `${Math.random() * 300 + 100}px`,
                            rotate: Math.random() * 360,
                            scaleX: 0
                        }}
                        animate={{
                            scaleX: [0, 1, 0],
                            opacity: [0, 0.3, 0],
                            x: Math.random() > 0.5 ? [null, `${Math.random() * 100}vw`] : [null, `${-Math.random() * 50}vw`],
                            y: Math.random() > 0.5 ? [null, `${Math.random() * 100}vh`] : [null, `${-Math.random() * 50}vh`],
                        }}
                        transition={{
                            duration: Math.random() * 5 + 3,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                            ease: "linear"
                        }}
                    />
                ))}


              <motion.h2
                className="text-5xl font-bold font-heading mb-12 bg-gradient-to-r from-neon-yellow to-neon-pink bg-clip-text text-transparent
                                pb-4 border-b-2 border-neon-pink/50 relative z-10 text-shadow-subtle-neon will-change-transform-opacity"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Join the Fest!
                <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-24 h-1 bg-gradient-to-r from-neon-yellow to-neon-pink rounded-full"></span>
              </motion.h2>
              <p className="text-xl text-gray-300 font-body mb-8 max-w-2xl mx-auto leading-relaxed relative z-10 will-change-transform-opacity">
                Don't miss out on Aarambh 2K25 – the ultimate convergence of tech, talent, and innovation.
                Secure your spot and be part of this unforgettable journey. Early bird registration coming soon!
              </p>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <AnimatedButton href="#" variant="secondary" data-interactive="true">
                  Secure Your Spot
                </AnimatedButton>
              </motion.div>
            </section>
          </main>

          {/* Footer (Enhanced with subtle animations) */}
          <footer id="contact" className="bg-dark-card py-8 mt-12 border-t border-neon-purple/30 relative overflow-hidden">
            {/* Subtle animated border glow */}
            <div className="absolute inset-0 border border-transparent animate-neon-border-pulse" />

            <div className="container mx-auto text-center text-gray-400 font-body relative z-10">
              <p className="text-lg">
                &copy; {new Date().getFullYear()} Aarambh 2K25. All rights reserved.
              </p>
              <p className="text-md mt-2">
                Made with <span className="text-neon-pink animate-pulse">❤️</span> by IIT Patna Tech Team.
              </p>
              <div className="flex justify-center space-x-6 mt-6">
                <a href="#" className="text-neon-cyan hover:text-white transition-colors duration-300 text-2xl will-change-all" aria-label="Twitter" data-interactive="true">
                   <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter inline-block"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2 1.1-.5 2.1-1.2 3-2.5C12.8 11.6 10 7.9 10 5.5s1.5-4 4-4c.7 0 1.5.2 2 .5 2.5-.2 4.9-1.2 6-2.5z"/></svg>
                </a>
                <a href="#" className="text-neon-cyan hover:text-white transition-colors duration-300 text-2xl will-change-all" aria-label="Instagram" data-interactive="true">
                   <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram inline-block"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.5" y1="6.5" y2="6.5"/></svg>
                </a>
                <a href="#" className="text-neon-cyan hover:text-white transition-colors duration-300 text-2xl will-change-all" aria-label="LinkedIn" data-interactive="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucude-linkedin inline-block"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
              </div>
            </div>
          </footer>
          <ScrollToTopButton />
        </div>
      )}
    </>
  );
}