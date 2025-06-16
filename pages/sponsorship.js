// pages/sponsorship.js
import { motion } from 'framer-motion';
import { useState } from 'react';
import ParticlesBackground from '../components/ParticlesBackground';
import ScrollProgressBar from '../components/ScrollProgressBar';

export default function Sponsorship() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const sponsors = [
    { name: 'TechCorp', tier: 'Platinum', logo: '🏢' },
    { name: 'InnovateLab', tier: 'Gold', logo: '🔬' },
    { name: 'FutureFlow', tier: 'Silver', logo: '⚡' },
    { name: 'CodeCraft', tier: 'Bronze', logo: '💻' },
    { name: 'DesignStudio', tier: 'Bronze', logo: '🎨' },
    { name: 'StartupX', tier: 'Silver', logo: '🚀' }
  ];

  const getTierColor = (tier) => {
    switch(tier) {
      case 'Platinum': return 'from-gray-300 to-gray-100';
      case 'Gold': return 'from-yellow-400 to-yellow-200';
      case 'Silver': return 'from-gray-400 to-gray-200';
      case 'Bronze': return 'from-orange-400 to-orange-200';
      default: return 'from-neon-purple to-neon-pink';
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white">
      <ScrollProgressBar />
      <ParticlesBackground />
      
      <div className="container mx-auto px-8 py-20">
        <motion.h1 
          className="text-6xl font-bold text-center mb-4 bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Our Sponsors
        </motion.h1>

        <motion.p
          className="text-xl text-center text-gray-300 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Powered by innovation, supported by industry leaders
        </motion.p>

        {/* Sponsors Grid with 3D Hover Effects */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {sponsors.map((sponsor, index) => (
            <motion.div
              key={sponsor.name}
              className="relative group cursor-pointer perspective-1000"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              onHoverStart={() => setHoveredCard(sponsor.name)}
              onHoverEnd={() => setHoveredCard(null)}
              whileHover={{ y: -10 }}
            >
              <motion.div 
                className="bg-dark-card rounded-xl p-8 border border-gray-800 hover:border-neon-purple/50 transition-all duration-500 h-48 flex flex-col items-center justify-center relative overflow-hidden transform-style-preserve-3d"
                animate={{
                  rotateY: hoveredCard === sponsor.name ? 10 : 0,
                  rotateX: hoveredCard === sponsor.name ? 5 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Animated Background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${getTierColor(sponsor.tier)} opacity-5 group-hover:opacity-15 transition-opacity duration-500`}
                  animate={{
                    scale: hoveredCard === sponsor.name ? 1.1 : 1,
                  }}
                />
                
                {/* Logo */}
                <motion.div
                  className="text-6xl mb-4"
                  animate={{
                    rotate: hoveredCard === sponsor.name ? [0, 10, -10, 0] : 0,
                    scale: hoveredCard === sponsor.name ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {sponsor.logo}
                </motion.div>
                
                <h3 className="text-xl font-bold text-center mb-2 text-white group-hover:text-neon-cyan transition-colors duration-300">
                  {sponsor.name}
                </h3>
                
                <motion.span 
                  className={`text-sm font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${getTierColor(sponsor.tier)} text-black`}
                  animate={{
                    boxShadow: hoveredCard === sponsor.name ? '0 0 20px rgba(255,255,255,0.5)' : '0 0 0px rgba(255,255,255,0)'
                  }}
                >
                  {sponsor.tier}
                </motion.span>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Become a Sponsor CTA */}
        <motion.div
          className="text-center bg-dark-card rounded-2xl p-12 border border-neon-purple/30 relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/10 to-neon-pink/10 animate-pulse" />
          
          <motion.h2 
            className="text-4xl font-bold mb-6 bg-gradient-to-r from-neon-yellow to-neon-pink bg-clip-text text-transparent relative z-10"
            animate={{
              textShadow: ['0 0 20px rgba(234, 179, 8, 0.5)', '0 0 40px rgba(234, 179, 8, 0.8)', '0 0 20px rgba(234, 179, 8, 0.5)']
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Become a Sponsor
          </motion.h2>
          
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto relative z-10">
            Partner with us to reach thousands of talented students and showcase your brand at the most innovative college fest of the year.
          </p>
          
          <motion.button
            className="bg-gradient-to-r from-neon-purple to-neon-pink px-12 py-4 rounded-full text-xl font-bold hover:shadow-2xl transition-all duration-300 relative z-10 animate-glow-pulse"
            whileHover={{ 
              scale: 1.1,
              boxShadow: '0 0 50px rgba(168, 85, 247, 0.8)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            🤝 Partner With Us
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
