// pages/index.js
import Head from 'next/head';
import { useState, useRef, useEffect, useCallback } from 'react';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import EventCard from '../components/EventCard'; // Make sure this component exists
import ScrollToTopButton from '../components/ScrollToTopButton'; // Make sure this component exists
import AnimatedButton from '../components/AnimatedButton'; // Make sure this component exists
import CustomCursor from '../components/CustomCursor'; // Make sure this component exists
import VenueSection from '../components/VenueSection'; // Make sure this component exists and has id="venue"
import MoodyText from '../components/MoodyText'; // Make sure this component exists
import ContactSlideIn from '../components/ContactSlideIn'; // Make sure this component exists
import { motion, useScroll, useTransform, animate } from 'framer-motion';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [isContactPanelOpen, setIsContactPanelOpen] = useState(false); // State for the contact panel

  // --- PLACEHOLDER DATA FOR NEW SECTIONS ---
  const festEndDate = new Date('2025-10-26T09:00:00'); // Example: October 26, 2025, 9:00 AM

  const speakers = [
    {
      id: 1,
      name: 'Dr. Anya Sharma',
      title: 'AI Ethicist, FutureTech Inc.',
      bio: 'Leading expert in responsible AI development and societal impact of technology.',
      image: 'https://via.placeholder.com/150/00BFFF/FFFFFF?text=A.S.', // Replace with actual image paths
      topic: 'AI and the Human Future: A Symbiotic Relationship'
    },
    {
      id: 2,
      name: 'Mr. Rohan Gupta',
      title: 'Head of Blockchain Innovation, BlockX',
      bio: 'Pioneering decentralized solutions and Web3 architectures for next-gen internet.',
      image: 'https://via.placeholder.com/150/FF007F/FFFFFF?text=R.G.',
      topic: 'Beyond Cryptocurrencies: The True Power of Web3'
    },
    {
      id: 3,
      name: 'Ms. Zara Khan',
      title: 'Cybersecurity Architect, SecureNet',
      bio: 'Specializing in advanced persistent threats and securing critical infrastructure.',
      image: 'https://via.placeholder.com/150/39FF14/FFFFFF?text=Z.K.',
      topic: 'Navigating the Digital Wild West: Future of Cybersecurity'
    },
    {
      id: 4,
      name: 'Dr. David Lee',
      title: 'Robotics Lead, OmniBot Labs',
      bio: 'Visionary in humanoid robotics and human-robot interaction.',
      image: 'https://via.placeholder.com/150/FFFF00/000000?text=D.L.',
      topic: 'The Rise of Sentient Machines: Myth or Reality?'
    },
  ];

  const scheduleData = [
    {
      day: 'Day 1: October 24, 2025',
      events: [
        { time: '09:00 AM - 10:00 AM', title: 'Opening Ceremony & Keynote: Dr. Anya Sharma', location: 'Main Auditorium', type: 'Keynote' },
        { time: '10:00 AM - 05:00 PM', title: 'CodeVerse Hackathon - Round 1', location: 'Hackathon Zone', type: 'Competition' },
        { time: '10:30 AM - 12:00 PM', title: 'Workshop: Intro to Quantum Computing', location: 'Lab A', type: 'Workshop' },
        { time: '01:00 PM - 02:00 PM', title: 'Lunch Break', location: 'Food Court', type: 'Break' },
        { time: '02:00 PM - 03:30 PM', title: 'Speaker Session: Mr. Rohan Gupta', location: 'Main Auditorium', type: 'Speaker Session' },
        { time: '03:30 PM - 05:00 PM', title: 'Robo Rumble Arena - Practice Rounds', location: 'Arena', type: 'Competition' },
      ],
    },
    {
      day: 'Day 2: October 25, 2025',
      events: [
        { time: '09:00 AM - 05:00 PM', title: 'CodeVerse Hackathon - Final Round', location: 'Hackathon Zone', type: 'Competition' },
        { time: '09:30 AM - 11:00 AM', title: 'Workshop: Advanced UI/UX Design', location: 'Lab B', type: 'Workshop' },
        { time: '11:00 AM - 12:30 PM', title: 'Speaker Session: Ms. Zara Khan', location: 'Main Auditorium', type: 'Speaker Session' },
        { time: '12:30 PM - 01:30 PM', title: 'Lunch Break', location: 'Food Court', type: 'Break' },
        { time: '01:30 PM - 03:00 PM', title: 'Ideathon: Pitch Perfect - Preliminary', location: 'Conference Hall', type: 'Competition' },
        { time: '03:00 PM - 05:00 PM', title: 'Robo Rumble Arena - Elimination Rounds', location: 'Arena', type: 'Competition' },
      ],
    },
    {
      day: 'Day 3: October 26, 2025',
      events: [
        { time: '09:00 AM - 11:00 AM', title: 'Final Pitches: Ideathon & Hackathon', location: 'Main Auditorium', type: 'Finals' },
        { time: '11:00 AM - 01:00 PM', title: 'Robo Rumble Arena - Grand Finale', location: 'Arena', type: 'Finals' },
        { time: '01:00 PM - 02:00 PM', title: 'Lunch Break', location: 'Food Court', type: 'Break' },
        { time: '02:00 PM - 03:30 PM', title: 'Keynote & Valedictory: Dr. David Lee', location: 'Main Auditorium', type: 'Keynote' },
        { time: '03:30 PM - 04:30 PM', title: 'Prize Distribution & Closing Ceremony', location: 'Main Auditorium', type: 'Ceremony' },
      ],
    },
  ];

  const faqs = [
    { question: 'What is Aarambh 2K25?', answer: 'Aarambh 2K25 is the annual cybernetic tech fest of IIT Patna, bringing together tech enthusiasts, innovators, and students for a grand celebration of technology and creativity.' },
    { question: 'When and where will Aarambh 2K25 be held?', answer: 'Aarambh 2K25 will be held from October 24-26, 2025, at the IIT Patna campus.' },
    { question: 'How can I register for the fest?', answer: 'Registration details will be announced soon! Keep an eye on our website and social media for updates regarding early bird registration.' },
    { question: 'Are there any participation fees?', answer: 'Details regarding participation fees for individual events and general fest access will be published along with registration information.' },
    { question: 'Who can participate in Aarambh 2K25?', answer: 'Students from all colleges and universities are welcome to participate. Some events might have specific eligibility criteria, which will be mentioned in their descriptions.' },
    { question: 'Will accommodation be provided?', answer: 'Information regarding accommodation options for outstation participants will be made available closer to the fest dates.' },
    { question: 'How can I become a sponsor?', answer: 'Please reach out to us at aarambh@iitp.ac.in with the subject "Sponsorship Inquiry" to discuss partnership opportunities.' },
    { question: 'Whom should I contact for more information?', answer: 'You can reach us via the contact form on our website, or email us at aarambh@iitp.ac.in. You can also follow our social media channels for the quickest updates.' },
  ];

  const teamMembers = [
    { id: 1, name: 'Ankita Singh', role: 'Fest Convener', image: 'https://via.placeholder.com/150/00BFFF/FFFFFF?text=AS' },
    { id: 2, name: 'Rahul Verma', role: 'Technical Head', image: 'https://via.placeholder.com/150/FF007F/FFFFFF?text=RV' },
    { id: 3, name: 'Priya Sharma', role: 'Marketing Lead', image: 'https://via.placeholder.com/150/39FF14/FFFFFF?text=PS' },
    { id: 4, name: 'Vivek Kumar', role: 'Logistics Manager', image: 'https://via.placeholder.com/150/FFFF00/000000?text=VK' },
  ];
  // --- END PLACEHOLDER DATA ---


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
          });
          await new Promise(resolve => setTimeout(resolve, 500));

          for (let i = 0; i < points.length; i++) {
              const currentPoint = points[i];
              await animate(carRef.current, {
                  x: currentPoint.x,
                  y: currentPoint.y
              }, {
                  duration: 1.0,
                  ease: "easeInOut",
              });
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

  // --- NEW: CountdownTimer Component (Nested for simplicity, can be moved to components/CountdownTimer.js) ---
  const CountdownTimer = ({ targetDate }) => {
    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();
      let timeLeft = {};

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
      const timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);

      return () => clearTimeout(timer);
    });

    const timerComponents = [];

    Object.keys(timeLeft).forEach((interval) => {
      if (!timeLeft[interval] && interval !== 'seconds') { // Keep seconds for continuous update
        return;
      }
      timerComponents.push(
        <span key={interval} className="flex flex-col items-center mx-2 p-2 bg-dark-card/50 rounded-lg border border-neon-cyan/30 shadow-md">
          <span className="text-4xl md:text-5xl font-bold text-neon-yellow">{timeLeft[interval] || '00'}</span>
          <span className="text-sm text-gray-400 uppercase">{interval}</span>
        </span>
      );
    });

    return (
      <div className="flex justify-center mt-8 mb-12 will-change-transform-opacity">
        {timerComponents.length ? timerComponents : <span className="text-neon-pink text-3xl font-bold">The Fest Has Begun!</span>}
      </div>
    );
  };

  // --- NEW: SpeakerCard Component (Nested for simplicity, can be moved to components/SpeakerCard.js) ---
  const SpeakerCard = ({ speaker, index }) => (
    <motion.div
      className="bg-dark-card p-6 rounded-lg border border-neon-purple/30 text-center shadow-lg transition-all duration-300 hover:border-neon-pink hover:shadow-card-glow-pink will-change-transform-opacity"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      data-interactive="true"
    >
      <img src={speaker.image} alt={speaker.name} className="w-28 h-28 rounded-full mx-auto mb-4 object-cover border-4 border-neon-cyan" />
      <h3 className="text-2xl font-semibold text-neon-yellow mb-1">{speaker.name}</h3>
      <p className="text-md text-gray-300 mb-2">{speaker.title}</p>
      <p className="text-sm text-gray-400 italic mb-3">"{speaker.topic}"</p>
      <p className="text-sm text-gray-500 line-clamp-3">{speaker.bio}</p>
    </motion.div>
  );

  // --- NEW: ScheduleItem Component (Nested for simplicity, can be moved to components/ScheduleItem.js) ---
  const ScheduleItem = ({ event, index }) => (
    <motion.div
      className="bg-dark-card p-4 rounded-lg border-l-4 border-neon-cyan shadow-md mb-4 flex items-start space-x-4 will-change-transform-opacity"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="flex-shrink-0 text-neon-yellow text-lg font-bold w-24 text-right pr-4 border-r border-gray-700">
        {event.time}
      </div>
      <div className="flex-grow">
        <h4 className="text-xl font-semibold text-neon-pink mb-1">{event.title}</h4>
        <p className="text-gray-300 text-sm">{event.location} <span className="text-neon-cyan/70">({event.type})</span></p>
      </div>
    </motion.div>
  );

  // --- NEW: FAQItem Component (Nested for simplicity, can be moved to components/FAQItem.js) ---
  const FAQItem = ({ faq, index }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <motion.div
        className="bg-dark-card p-5 rounded-lg border border-neon-purple/30 shadow-md mb-4 cursor-pointer will-change-transform-opacity"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        onClick={() => setIsOpen(!isOpen)}
        data-interactive="true"
      >
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-neon-yellow">{faq.question}</h3>
          <span className="text-2xl text-neon-cyan">{isOpen ? '-' : '+'}</span>
        </div>
        {isOpen && (
          <motion.p
            className="text-gray-300 mt-3 pl-4 border-l-2 border-neon-pink"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {faq.answer}
          </motion.p>
        )}
      </motion.div>
    );
  };

  // --- NEW: TeamMemberCard Component (Nested for simplicity, can be moved to components/TeamMemberCard.js) ---
  const TeamMemberCard = ({ member, index }) => (
    <motion.div
      className="bg-dark-card p-6 rounded-lg border border-neon-cyan/30 text-center shadow-lg transition-all duration-300 hover:border-neon-yellow hover:shadow-card-glow will-change-transform-opacity"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      data-interactive="true"
    >
      <img src={member.image} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-neon-purple" />
      <h3 className="text-xl font-semibold text-neon-pink mb-1">{member.name}</h3>
      <p className="text-md text-gray-300">{member.role}</p>
    </motion.div>
  );


  return (
    <>
      <Head>
        <title>Aarambh 2K25 - The Ultimate Cybernetic Fest</title>
        <meta name="description" content="Aarambh 2K25 - College Tech Fest: Unleash Your Inner Tech. Ignite the Future." />
        <link rel="icon" href="/favicon.ico" />
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

                <div className="absolute inset-0"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(0,191,255,0.05) 1px, transparent 1px)
                        `,
                        backgroundSize: '100% 2px',
                        animation: 'scanline-pulse 15s linear infinite alternate',
                        willChange: 'background-position, opacity'
                    }}/>

                <div className="absolute inset-0 opacity-[0.03] overflow-hidden"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='0' y='8' font-family='Fira Code' font-size='10' fill='%2300BFFF'%3E01%3C/text%3E%3C/svg%3E")`,
                        backgroundRepeat: 'repeat',
                        backgroundSize: '10px 10px',
                        animation: 'code-flow 30s linear infinite',
                        willChange: 'transform'
                    }}>
                </div>

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
              {/* Pulsing Spheres */}
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

              {/* NEW: Subtle Digital Wave Background */}
              <motion.div
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-neon-cyan/5 to-transparent opacity-10 will-change-transform pointer-events-none"
                style={{
                  clipPath: 'polygon(0% 20%, 100% 0%, 100% 80%, 0% 100%)', // A wave-like shape
                  animation: 'digital-wave 10s ease-in-out infinite alternate',
                  filter: 'blur(10px)'
                }}
              />

              {/* Floating Particles */}
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

              {/* Dynamic light streaks/shooting stars */}
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
                      staggerChildren: 0.1,
                      delayChildren: 0.5
                    }
                  },
                }}
              >
<div className="w-full flex justify-center overflow-x-auto">
  <MoodyText
    text="AARAMBH"
    className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl mb-4 leading-tight tracking-wide max-w-full overflow-visible"
    glitch={true}
    glitchClass="text-neon-pink"
    shadowClass="text-shadow-strong-neon"
    flicker={true}
    gradientClass="bg-gradient-to-r from-neon-pink to-neon-pink"
    style={{
      color: '#FF007F',
      wordBreak: 'keep-all',
      whiteSpace: 'nowrap',
      letterSpacing: '0.03em'
    }}
  />
</div>



                <motion.h2
                  className="text-3xl md:text-4xl font-bold text-neon-yellow font-mono mb-8 relative inline-block overflow-hidden whitespace-nowrap text-shadow-subtle-neon will-change-width"
                  style={{
                      animation: 'text-type 2s steps(4, end) forwards, text-blink-caret .75s step-end infinite',
                      borderRight: '2px solid white'
                  }}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%', borderRightColor: 'transparent' }}
                  transition={{
                    duration: 1.5,
                    ease: "linear",
                    delay: 0.5
                  }}
                >
                  2K25
                </motion.h2>

                <motion.p
                  className="text-xl md:text-2xl text-gray-300 font-body mb-8 max-w-2xl mx-auto leading-relaxed will-change-transform-opacity"
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 10, delay: 0.8 } },
                  }}
                >
                  Unleash Your Inner Tech. Ignite the Future.
                </motion.p>

                {/* --- NEW: Countdown Timer in Hero Section --- */}
                <CountdownTimer targetDate={festEndDate} />

                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 10, delay: 1.0 } },
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

                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-neon-cyan to-transparent rounded-full mix-blend-screen opacity-15 blur-xl animate-radialPulse will-change-transform"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tl from-neon-pink to-transparent rounded-full mix-blend-screen opacity-15 blur-xl animate-radialPulse will-change-transform" style={{ animationDelay: '2s' }}></div>

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

            {/* --- NEW: Speakers/Keynote Section --- */}
            <section id="speakers" className="py-20 px-4 container mx-auto text-center relative overflow-hidden">
              <div className="absolute inset-0 z-0 opacity-5"
                  style={{
                      backgroundImage: `
                          radial-gradient(circle at top left, rgba(0, 191, 255, 0.05) 0%, transparent 50%),
                          radial-gradient(circle at bottom right, rgba(138, 43, 226, 0.05) 0%, transparent 50%)
                      `,
                      backgroundSize: '80% 80%',
                      backgroundRepeat: 'no-repeat',
                      animation: 'gradientFlow 15s ease-in-out infinite alternate',
                      willChange: 'background-position'
                  }}
              />
              <div className="absolute inset-0 opacity-[0.03] overflow-hidden"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='0' y='8' font-family='Fira Code' font-size='10' fill='%23FF007F'%3E10%3C/text%3E%3C/svg%3E")`,
                        backgroundRepeat: 'repeat',
                        backgroundSize: '10px 10px',
                        animation: 'code-flow 40s linear infinite reverse',
                        willChange: 'transform'
                    }}>
                </div>


              <motion.h2
                className="text-5xl font-bold font-heading text-center mb-16 bg-gradient-to-r from-neon-cyan to-neon-yellow bg-clip-text text-transparent
                                  pb-4 border-b-2 border-neon-yellow/50 relative z-10 text-shadow-subtle-neon will-change-transform-opacity"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8 }}
              >
                Our Esteemed Speakers
                <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-24 h-1 bg-gradient-to-r from-neon-cyan to-neon-yellow rounded-full"></span>
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                {speakers.map((speaker, index) => (
                  <SpeakerCard key={speaker.id} speaker={speaker} index={index} />
                ))}
              </div>
            </section>


            {/* Events Section - WITH CONNECTING LINE AND CAR */}
            <section id="events" className="py-20 px-4 container mx-auto relative overflow-hidden" ref={eventsSectionRef}>
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

              <div className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-neon-yellow/30 to-transparent blur-3xl opacity-15 animate-pulseNeon will-change-transform"></div>

              <div className="absolute top-1/4 left-10 w-40 h-40 bg-neon-cyan rounded-full opacity-10 blur-2xl animate-pulse-light will-change-transform" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-neon-pink rounded-full opacity-10 blur-2xl animate-pulse-light will-change-transform" style={{ animationDelay: '1.5s' }}></div>

              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={`event-data-line-${i}`}
                  className="absolute w-full h-1 bg-gradient-to-r from-transparent via-lime-green/20 to-transparent opacity-0 will-change-transform-opacity"
                  initial={{
                    y: `${Math.random() * 100}%`,
                    x: `${-100 + Math.random() * 50}%`,
                    width: `${Math.random() * 200 + 100}px`,
                  }}
                  animate={{
                    x: [`${-100 + Math.random() * 50}%`, `${150 + Math.random() * 50}%`],
                    opacity: [0, 0.2, 0.1, 0],
                  }}
                  transition={{
                    duration: Math.random() * 15 + 10,
                    repeat: Infinity,
                    delay: Math.random() * 8,
                    ease: "linear",
                  }}
                  style={{ top: `${Math.random() * 100}%` }}
                />
              ))}


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
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-8 relative z-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
                }}
                data-interactive="true"
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
                    whileHover={{
                      scale: 1.03,
                      boxShadow: '0 0 20px rgba(0, 191, 255, 0.4), 0 0 40px rgba(138, 43, 226, 0.3)',
                      transition: { duration: 0.2 }
                    }}
                    className="rounded-lg overflow-hidden bg-dark-card p-6 border border-dark-card transition-all duration-300
                                hover:border-neon-cyan hover:shadow-card-glow will-change-transform-opacity"
                  >
                    <EventCard {...event} index={index} />
                  </motion.div>
                ))}
              </motion.div>
            </section>

            {/* Venue Section (Minimal changes, mainly background) */}
            <VenueSection />

            {/* --- NEW: Schedule Section (Dynamic Content) --- */}
            <section id="schedule" className="py-20 px-4 container mx-auto text-center relative overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-5 will-change-transform"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M25 0V25H0V75H25V100H75V75H100V25H75V0H25Z' fill='none' stroke='%231C1C2B' stroke-width='1'/%3E%3C/svg%3E")`,
                      backgroundSize: '100px 100px',
                      animation: 'digital-flow-x 60s linear infinite, digital-flow-y 60s linear infinite',
                      filter: 'invert(1) opacity(0.3)',
                      backgroundBlendMode: 'overlay',
                    }}>
                </div>
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
              <div className="max-w-4xl mx-auto relative z-10">
                {scheduleData.map((dayData, dayIndex) => (
                  <div key={dayIndex} className="mb-10 text-left">
                    <motion.h3
                      className="text-3xl font-bold text-neon-yellow mb-6 border-b-2 border-neon-pink/50 pb-2 inline-block will-change-transform-opacity"
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      {dayData.day}
                    </motion.h3>
                    <div className="space-y-4">
                      {dayData.events.map((event, eventIndex) => (
                        <ScheduleItem key={eventIndex} event={event} index={eventIndex} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Registration Section */}
            <section id="register" className="py-20 px-4 container mx-auto text-center relative overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-15 will-change-opacity"
                    style={{
                      backgroundImage: 'radial-gradient(circle at center, #8A2BE2 1px, transparent 1px), radial-gradient(circle at center, #00BFFF 1px, transparent 1px)',
                      backgroundSize: '40px 40px',
                      backgroundPosition: '0 0, 20px 20px',
                      animation: 'pulseNeon 3s infinite ease-in-out alternate, digital-flow-x 50s linear infinite',
                    }}>
                </div>
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
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: 0, duration: 0.25, ease: "easeOut" }}
                style={{ willChange: 'transform, opacity' }}
              >
                <AnimatedButton href="#" variant="secondary" data-interactive="true">
                  Secure Your Spot
                </AnimatedButton>
              </motion.div>
            </section>

            {/* --- NEW: FAQ Section --- */}
            <section id="faq" className="py-20 px-4 container mx-auto relative overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-5"
                    style={{
                        backgroundImage: `
                            repeating-radial-gradient(circle at 10% 20%, rgba(0, 191, 255, 0.03) 0%, transparent 10%),
                            repeating-radial-gradient(circle at 90% 80%, rgba(138, 43, 226, 0.03) 0%, transparent 10%)
                        `,
                        backgroundSize: '200px 200px',
                        animation: 'pulseNeon 8s infinite ease-in-out alternate',
                        willChange: 'transform, opacity'
                    }}
                />

                <motion.h2
                    className="text-5xl font-bold font-heading text-center mb-16 bg-gradient-to-r from-neon-pink to-neon-cyan bg-clip-text text-transparent
                                pb-4 border-b-2 border-neon-cyan/50 relative z-10 text-shadow-subtle-neon will-change-transform-opacity"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8 }}
                >
                    Frequently Asked Questions
                    <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-24 h-1 bg-gradient-to-r from-neon-pink to-neon-cyan rounded-full"></span>
                </motion.h2>
                <div className="max-w-3xl mx-auto relative z-10">
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} faq={faq} index={index} />
                    ))}
                </div>
            </section>


{/* SPONSOR SECTION */}
<section id="sponsors" className="bg-dark-bg py-12 px-4">
  <div className="container mx-auto">
    <h2 className="text-5xl font-bold font-heading text-center mb-16 bg-gradient-to-r from-neon-pink to-neon-yellow bg-clip-text text-transparent
                    pb-4 border-b-2 border-neon-cyan/50 relative z-10 text-shadow-subtle-neon will-change-transform-opacity"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
    >
        Our Esteemed Sponsors
        <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-24 h-1 bg-gradient-to-r from-neon-pink to-neon-yellow rounded-full"></span>
    </h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center">
      <div className="flex justify-center items-center p-4">
        <img src="/sponsors/Audi-Logo-Desktop-Wallpapers-Photo.jpg" alt="Audi Sponsor" className="max-h-28 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-105" />
      </div>
      <div className="flex justify-center items-center p-4">
        <img src="/sponsors/alex-albon-red-bull-racing-rb1.jpg" alt="Red Bull Racing Sponsor 1" className="max-h-28 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-105" />
      </div>
      <div className="flex justify-center items-center p-4">
        <img src="/sponsors/News_RedBullT822Renewal2-1024x576.jpg" alt="Red Bull Sponsor 2" className="max-h-28 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-105" />
      </div>
      <div className="flex justify-center items-center p-4">
        <img src="/sponsors/Nike-Logo-1978-present.jpg" alt="Nike Sponsor" className="max-h-28 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-105" />
      </div>
    </div>
  </div>
</section>
{/* END SPONSOR SECTION */}



            {/* --- NEW: Team Section --- */}
            <section id="team" className="py-20 px-4 container mx-auto text-center relative overflow-hidden">
              <div className="absolute inset-0 z-0 opacity-5"
                    style={{
                        backgroundImage: `
                            radial-gradient(circle at 80% 20%, rgba(57, 255, 20, 0.05) 0%, transparent 50%),
                            radial-gradient(circle at 20% 80%, rgba(255, 255, 0, 0.05) 0%, transparent 50%)
                        `,
                        backgroundSize: '70% 70%',
                        backgroundRepeat: 'no-repeat',
                        animation: 'gradientFlow 18s ease-in-out infinite reverse alternate',
                        willChange: 'background-position'
                    }}
                />
                <div className="absolute inset-0 opacity-[0.03] overflow-hidden"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='0' y='8' font-family='Fira Code' font-size='10' fill='%2300BFFF'%3E11%3C/text%3E%3C/svg%3E")`,
                        backgroundRepeat: 'repeat',
                        backgroundSize: '10px 10px',
                        animation: 'code-flow 35s linear infinite',
                        willChange: 'transform'
                    }}>
                </div>

              <motion.h2
                className="text-5xl font-bold font-heading text-center mb-16 bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent
                                pb-4 border-b-2 border-neon-purple/50 relative z-10 text-shadow-subtle-neon will-change-transform-opacity"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8 }}
              >
                Meet the Team
                <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-24 h-1 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-full"></span>
              </motion.h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                {teamMembers.map((member, index) => (
                  <TeamMemberCard key={member.id} member={member} index={index} />
                ))}
              </div>
            </section>

            {/* --- NEW: Newsletter Signup Section --- */}
            <section id="newsletter" className="py-20 px-4 container mx-auto text-center relative overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-10"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(255, 0, 127, 0.05) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 0, 127, 0.05) 1px, transparent 1px)
                        `,
                        backgroundSize: '40px 40px',
                        animation: 'pulseNeon 6s infinite ease-in-out alternate',
                        willChange: 'opacity'
                    }}
                />
                <motion.h2
                    className="text-4xl md:text-5xl font-bold font-heading mb-8 bg-gradient-to-r from-neon-yellow to-lime-green bg-clip-text text-transparent
                                pb-3 border-b-2 border-lime-green/50 relative z-10 text-shadow-subtle-neon will-change-transform-opacity"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8 }}
                >
                    Stay Connected
                    <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-20 h-1 bg-gradient-to-r from-neon-yellow to-lime-green rounded-full"></span>
                </motion.h2>
                <p className="text-xl text-gray-300 font-body mb-8 max-w-2xl mx-auto leading-relaxed relative z-10 will-change-transform-opacity">
                    Join our newsletter to get the latest updates, announcements, and exclusive insights from Aarambh 2K25!
                </p>
                <motion.form
                    className="flex flex-col md:flex-row justify-center items-center gap-4 max-w-xl mx-auto relative z-10"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <input
                        type="email"
                        placeholder="Enter your email address"
                        className="w-full md:flex-grow p-4 rounded-lg bg-dark-bg border border-neon-cyan/50 text-white placeholder-gray-500
                                   focus:outline-none focus:ring-2 focus:ring-neon-pink transition-all duration-300 text-lg font-code"
                        aria-label="Email for newsletter"
                    />
                    <AnimatedButton type="submit" variant="primary" data-interactive="true">
                        Subscribe Now
                    </AnimatedButton>
                </motion.form>
            </section>


          </main>

          {/* Footer (Enhanced with subtle animations and new contact triggers) */}
          <footer id="contact" className="bg-dark-card py-8 mt-12 border-t border-neon-purple/30 relative overflow-hidden">
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
                <a href="https://www.instagram.com/aarambh_iitp?igsh=MXdhcjZwN2lwcmZmbQ==" target="_blank" rel="noopener noreferrer" className="text-neon-cyan hover:text-white transition-colors duration-300 text-2xl will-change-all" aria-label="Instagram" data-interactive="true">
                   <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram inline-block"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.5" y1="6.5" y2="6.5"/></svg>
                </a>
                <a href="#" className="text-neon-cyan hover:text-white transition-colors duration-300 text-2xl will-change-all" aria-label="LinkedIn" data-interactive="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucude-linkedin inline-block"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </a>

                <button
                  onClick={() => setIsContactPanelOpen(true)}
                  className="text-neon-yellow hover:text-white transition-colors duration-300 font-code text-lg relative group focus:outline-none"
                  data-interactive="true"
                >
                  @aarambh2k25
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-neon-yellow transition-all duration-300 group-hover:w-full"></span>
                </button>
                <button
                  onClick={() => setIsContactPanelOpen(true)}
                  className="text-neon-yellow hover:text-white transition-colors duration-300 font-code text-lg relative group focus:outline-none"
                  data-interactive="true"
                >
                  aarambh@iitp.ac.in
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-neon-yellow transition-all duration-300 group-hover:w-full"></span>
                </button>
              </div>
            </div>
          </footer>
          <ScrollToTopButton />

          <ContactSlideIn isOpen={isContactPanelOpen} onClose={() => setIsContactPanelOpen(false)} />
        </div>
      )}
    </>
  );
}