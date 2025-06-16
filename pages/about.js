// pages/about.js
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import ParticlesBackground from '../components/ParticlesBackground';
import ScrollProgressBar from '../components/ScrollProgressBar';

export default function About() {
  const timelineRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1
        }
      });

      timeline.to('.timeline-line', { height: '100%', duration: 1 })
              .from('.timeline-item', { x: -100, opacity: 0, stagger: 0.3 }, 0.2);
    }
  }, []);

  const milestones = [
    { year: '2020', title: 'The Vision', desc: 'Aarambh was conceptualized as a platform for innovation', icon: '💡' },
    { year: '2021', title: 'First Steps', desc: 'Our inaugural fest brought together 500+ participants', icon: '🚀' },
    { year: '2022', title: 'Growing Strong', desc: 'Expanded to multiple cities with 2000+ attendees', icon: '🌱' },
    { year: '2023', title: 'Going Digital', desc: 'Hybrid format reached 10,000+ participants globally', icon: '🌐' },
    { year: '2024', title: 'New Horizons', desc: 'International partnerships and cutting-edge tech', icon: '🎯' },
    { year: '2025', title: 'A New Beginning', desc: 'The most ambitious edition yet awaits you', icon: '✨' }
  ];

  return (
    <div className="min-h-screen bg-dark-bg text-white">
      <ScrollProgressBar />
      <ParticlesBackground />
      
      <div className="container mx-auto px-8 py-20">
        <motion.h1 
          className="text-6xl font-bold text-center mb-16 bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Our Journey
        </motion.h1>

        <motion.p
          className="text-xl text-center text-gray-300 mb-20 max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          From a simple idea to the most anticipated college festival, Aarambh has been a journey of passion, creativity, and endless possibilities.
        </motion.p>

        <div ref={timelineRef} className="relative max-w-4xl mx-auto">
          <div className="timeline-line absolute left-8 top-0 w-1 bg-gradient-to-b from-neon-purple to-neon-pink opacity-50 h-0"></div>
          
          {milestones.map((milestone, index) => (
            <motion.div 
              key={milestone.year}
              className="timeline-item relative flex items-center mb-16 ml-16"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <motion.div 
                className="absolute -left-20 w-12 h-12 bg-gradient-to-r from-neon-yellow to-neon-cyan rounded-full border-4 border-dark-bg flex items-center justify-center text-xl"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.3 }}
              >
                {milestone.icon}
              </motion.div>
              
              <motion.div 
                className="bg-dark-card p-6 rounded-lg border border-neon-purple/30 hover:border-neon-pink/50 transition-all duration-300 w-full group"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 10px 30px rgba(168, 85, 247, 0.3)'
                }}
              >
                <div className="flex items-center gap-4 mb-3">
                  <h3 className="text-3xl font-bold text-neon-yellow">{milestone.year}</h3>
                  <h4 className="text-xl font-semibold text-neon-pink">{milestone.title}</h4>
                </div>
                <p className="text-gray-300 group-hover:text-white transition-colors duration-300">
                  {milestone.desc}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
