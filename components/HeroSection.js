// pages/index.js
import Head from 'next/head';
import { useState, useRef, useEffect, useCallback } from 'react';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection'; // Ensure HeroSection is imported or its content is here
import EventCard from '../components/EventCard';
import ScrollToTopButton from '../components/ScrollToTopButton';
import AnimatedButton from '../components/AnimatedButton';
import CustomCursor from '../components/CustomCursor';
import VenueSection from '../components/VenueSection';
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

      const pathData = points.map((p, i) =>
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
          animate(carRef.current, { x: points[0].x, y: points[0].y, opacity: 1 }, {
              duration: 0.5,
              ease: "easeOut"
          }).asPromise();
          await new Promise(resolve => setTimeout(resolve, 500)); // Short delay before first move

          for (let i = 0; i < points.length; i++) {
              const currentPoint = points[i];
              await animate(carRef.current, { x: currentPoint.x, y: currentPoint.y }, {
                  duration: 1.0, // Speed of car travel
                  ease: "easeInOut",
              }).asPromise();
              await new Promise(resolve => setTimeout(resolve, 400)); // Pause at each event
          }
      }
      setIsAnimatingCar(false);
  }, [events.length, isAnimatingCar]);

  useEffect(() => {
    let unsubscribe;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isAnimatingCar) {
        animateCar();
      }
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.2
    });

    if (eventsSectionRef.current) {
      observer.observe(eventsSectionRef.current);
    }

    return () => {
      if (eventsSectionRef.current) {
        observer.unobserve(eventsSectionRef.current);
      }
      if (unsubscribe) unsubscribe();
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
      </Head>

      {loading && <Loader onComplete={() => setLoading(false)} />}

      {!loading && (
        <div className="min-h-screen bg-dark-bg font-body text-white relative cursor-none">
          <Navbar />
          <CustomCursor />

          <main>
            {/* Hero Section */}
            <section
              ref={heroTargetRef}
              className="relative h-screen flex items-center justify-center text-center overflow-hidden"
            >
              {[...Array(100)].map((_, i) => (
                <motion.div
                  key={`hero-particle-${i}`}
                  className="absolute w-0.5 h-0.5 bg-neon-cyan rounded-full opacity-20"
                  initial={{
                    x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
                    y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : 0,
                    opacity: 0,
                    scale: Math.random() * 0.5 + 0.1
                  }}
                  animate={{
                    y: [null, Math.random() * -500 - 100, Math.random() * -1000 - 200],
                    x: [null, Math.random() * 100 - 50, Math.random() * 200 - 100],
                    opacity: [0, 0.1, 0.2, 0.1, 0],
                    scale: [null, Math.random() * 0.5 + 0.1, Math.random() * 0.8 + 0.2],
                  }}
                  transition={{
                    duration: Math.random() * 15 + 15,
                    repeat: Infinity,
                    delay: Math.random() * 10,
                    ease: "linear",
                  }}
                />
              ))}

              <motion.div
                className="absolute w-40 h-40 bg-neon-purple rounded-full opacity-5 blur-xl -left-20 top-1/4 animate-fadeZoomRotate"
                style={{ filter: 'blur(30px)' }}
              ></motion.div>
              <motion.div
                className="absolute w-32 h-32 bg-neon-cyan rounded-full opacity-5 blur-xl -right-10 bottom-1/3 animate-fadeZoomRotate"
                style={{ animationDelay: '2s', filter: 'blur(25px)' }}
              ></motion.div>
              <motion.div
                className="absolute w-24 h-24 bg-neon-pink rounded-full opacity-5 blur-xl top-10 left-1/4 animate-fadeZoomRotate"
                style={{ animationDelay: '4s', filter: 'blur(20px)' }}
              ></motion.div>

              <motion.div
                className="relative z-10 p-6"
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
                <motion.h1
                  className={`
                    text-8xl md:text-9xl font-black font-heading
                    bg-clip-text text-transparent mb-4 animate-glitch
                    text-shadow-strong-neon
                    bg-gradient-to-r from-neon-purple via-dark-card to-neon-cyan /* CHANGED THIS LINE */
                  `}
                  style={{ scale: heroScale, opacity: heroOpacity }}
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 10 } },
                  }}
                >
                  AARAMBH 2K25
                </motion.h1>
                <motion.p
                  className="text-3xl md:text-4xl text-neon-yellow font-body mb-8 text-shadow-neon"
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 10 } },
                  }}
                >
                  Unleash Your Inner Tech. Ignite the Future.
                </motion.p>

                <motion.div variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 10 } },
                  }}>
                  <AnimatedButton href="#register" variant="primary">
                    Register Now
                  </AnimatedButton>
                </motion.div>
              </motion.div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 px-4 container mx-auto text-center relative overflow-hidden">
                {/* Existing spinning hexagon */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                >
                    <svg className="w-2/3 h-auto text-neon-purple/20" viewBox="0 0 200 200" fill="currentColor">
                        <path d="M100 0L0 50L0 150L100 200L200 150L200 50Z" />
                    </svg>
                </motion.div>

                {/* Added: Radial Gradient Pulse */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-neon-cyan to-transparent rounded-full mix-blend-screen opacity-10 animate-radialPulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tl from-neon-pink to-transparent rounded-full mix-blend-screen opacity-10 animate-radialPulse" style={{ animationDelay: '2s' }}></div>

                {/* Added: Subtle Floating Particles */}
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={`about-particle-${i}`}
                    className="absolute w-2 h-2 bg-neon-yellow rounded-full opacity-10 animate-float"
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
                                  pb-4 border-b-2 border-neon-cyan/50"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.8 }}
                  style={{ textShadow: '0 0 10px rgba(168,85,247,0.5)' }}
                >
                  About Aarambh 2K25
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-24 h-1 bg-gradient-to-r from-neon-purple to-neon-pink rounded-full"></span>
                </motion.h2>
                <p className="relative z-10 text-xl text-gray-300 font-body max-w-3xl mx-auto leading-relaxed">
                  Aarambh 2K25 is not just a fest; it's a convergence of minds, a celebration of innovation, and a launchpad for the future. Prepare to immerse yourself in cutting-edge technology, fierce competitions, insightful workshops, and unforgettable experiences. This year, we're pushing the boundaries to bring you an event that truly ignites your passion for technology and creativity. Join us as we build, learn, and grow together in this cybernetic journey!
                </p>
            </section>


            {/* Events Section - WITH CONNECTING LINE AND CAR */}
            <section id="events" className="py-20 px-4 container mx-auto relative overflow-hidden" ref={eventsSectionRef}>
              {/* Added: Background Grid */}
              <div className="absolute inset-0 z-0 opacity-10"
                   style={{
                     backgroundImage: 'linear-gradient(to right, #1C1C2B 1px, transparent 1px), linear-gradient(to bottom, #1C1C2B 1px, transparent 1px)',
                     backgroundSize: '40px 40px',
                     animation: 'gridFade 5s infinite ease-in-out alternate',
                   }}>
              </div>

              {/* Added: Background Pulsing Circle */}
              <div className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-neon-yellow/20 to-transparent blur-3xl opacity-10 animate-pulseNeon"></div>


              <motion.h2
                className="text-5xl font-bold font-heading text-center mb-16 bg-gradient-to-r from-neon-pink to-neon-yellow bg-clip-text text-transparent
                                pb-4 border-b-2 border-neon-cyan/50 relative z-10"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8 }}
                style={{ textShadow: '0 0 10px rgba(236,72,153,0.5)' }}
              >
                Our Stellar Events
                <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-24 h-1 bg-gradient-to-r from-neon-pink to-neon-yellow rounded-full"></span>
              </motion.h2>

              {/* SVG for the connecting line */}
              <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-10" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet">
                  <motion.path
                      id="eventPath"
                      d="M 0,0 L 0,0" // Placeholder, will be updated by JS
                      fill="none"
                      stroke="url(#line-gradient)"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      style={{ pathLength }} // Animate with scroll progress
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
                className="absolute w-12 h-12 bg-gradient-to-br from-lime-green to-neon-yellow rounded-full flex items-center justify-center text-3xl font-bold z-20"
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
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                {events.map((event, index) => (
                  <motion.div key={event.id} ref={el => eventRefs.current[index] = el}>
                    <EventCard {...event} index={index} />
                  </motion.div>
                ))}
              </motion.div>
            </section>

            {/* Venue Section */}
            <VenueSection />

            {/* Schedule Section */}
            <section id="schedule" className="py-20 px-4 container mx-auto text-center relative overflow-hidden">
                {/* Added: Animated Hexagon Pattern */}
                <div className="absolute inset-0 z-0 opacity-5"
                    style={{
                      backgroundImage: 'url(/path/to/hexagon-pattern.svg)', // You'd need to create this SVG pattern
                      backgroundSize: '200px 200px',
                      animation: 'horizontalWave 20s linear infinite alternate',
                      filter: 'invert(1) opacity(0.3)'
                    }}>
                </div>
                {/* Or simpler background elements for schedule: */}
                <div className="absolute top-1/3 left-1/2 w-48 h-48 bg-neon-cyan rounded-full mix-blend-screen opacity-5 blur-2xl animate-float"></div>
                <div className="absolute bottom-1/4 right-1/4 w-60 h-60 bg-neon-purple rounded-full mix-blend-screen opacity-5 blur-2xl animate-float" style={{ animationDelay: '3s' }}></div>


              <motion.h2
                className="text-5xl font-bold font-heading mb-12 bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent
                                pb-4 border-b-2 border-neon-purple/50 relative z-10"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ textShadow: '0 0 10px rgba(6,182,212,0.5)' }}
              >
                Fest Schedule
                <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-24 h-1 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-full"></span>
              </motion.h2>
              <p className="text-xl text-gray-300 font-body max-w-2xl mx-auto leading-relaxed relative z-10">
                Prepare for an action-packed experience! Our detailed schedule will be released soon.
                Stay tuned for the complete timeline of Aarambh 2K25, featuring exciting events, workshops, and keynote speakers.
              </p>
            </section>

            {/* Registration Section */}
            <section id="register" className="py-20 px-4 container mx-auto text-center relative overflow-hidden">
                {/* Added: Pulsing Grid Dots */}
                <div className="absolute inset-0 z-0 opacity-10"
                    style={{
                      backgroundImage: 'radial-gradient(#8A2BE2 1px, transparent 1px), radial-gradient(#00BFFF 1px, transparent 1px)',
                      backgroundSize: '30px 30px',
                      backgroundPosition: '0 0, 15px 15px',
                      animation: 'pulseNeon 3s infinite ease-in-out alternate',
                    }}>
                </div>


              <motion.h2
                className="text-5xl font-bold font-heading mb-12 bg-gradient-to-r from-neon-yellow to-neon-pink bg-clip-text text-transparent
                                pb-4 border-b-2 border-neon-pink/50 relative z-10"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                style={{ textShadow: '0 0 10px rgba(234,179,8,0.5)' }}
              >
                Join the Fest!
                <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-24 h-1 bg-gradient-to-r from-neon-yellow to-neon-pink rounded-full"></span>
              </motion.h2>
              <p className="text-xl text-gray-300 font-body mb-8 max-w-2xl mx-auto leading-relaxed relative z-10">
                Don't miss out on Aarambh 2K25 – the ultimate convergence of tech, talent, and innovation.
                Secure your spot and be part of this unforgettable journey. Early bird registration coming soon!
              </p>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <AnimatedButton href="#" variant="secondary">
                  Secure Your Spot
                </AnimatedButton>
              </motion.div>
            </section>
          </main>

          {/* Footer (No changes) */}
          <footer id="contact" className="bg-dark-card py-8 mt-12 border-t border-neon-purple/30">
            <div className="container mx-auto text-center text-gray-400 font-body">
              <p className="text-lg">&copy; {new Date().getFullYear()} Aarambh 2K25. All rights reserved.</p>
              <p className="text-md mt-2">Made with <span className="text-neon-pink animate-pulse">❤️</span> by The [Your College Name] Tech Team.</p>
              <div className="flex justify-center space-x-6 mt-6">
                <a href="#" className="text-neon-cyan hover:text-white transition-colors duration-300 text-2xl" aria-label="Twitter">
                   <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter inline-block"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2 1.1-.5 2.1-1.2 3-2.5C12.8 11.6 10 7.9 10 5.5s1.5-4 4-4c.7 0 1.5.2 2 .5 2.5-.2 4.9-1.2 6-2.5z"/></svg>
                </a>
                <a href="#" className="text-neon-cyan hover:text-white transition-colors duration-300 text-2xl" aria-label="Instagram">
                   <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram inline-block"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.5" y1="6.5" y2="6.5"/></svg>
                </a>
                <a href="#" className="text-neon-cyan hover:text-white transition-colors duration-300 text-2xl" aria-label="LinkedIn">
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