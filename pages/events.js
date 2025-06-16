// pages/events.js
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import ParticlesBackground from '../components/ParticlesBackground';
import ScrollProgressBar from '../components/ScrollProgressBar';

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = [
    {
      id: 1,
      title: 'MUSIC MAESTRO',
      category: 'MUSIC',
      description: 'Unleash your musical genius in this ultimate showdown of melodies and rhythms that will echo through eternity.',
      date: 'March 15, 2025',
      time: '6:00 PM',
      venue: 'Main Auditorium',
      registerLink: 'https://forms.gle/sample-music-form',
      gradient: 'from-purple-500 to-pink-500',
      icon: '🎵',
      details: 'Battle of the Bands featuring live performances, DJ battles, and acoustic sessions.'
    },
    {
      id: 2,
      title: 'DANCE DYNAMITE',
      category: 'DANCE',
      description: 'Move to the beat and express your soul through the universal language of dance and rhythm.',
      date: 'March 16, 2025',
      time: '7:00 PM',
      venue: 'Dance Arena',
      registerLink: 'https://forms.gle/sample-dance-form',
      gradient: 'from-blue-500 to-cyan-500',
      icon: '💃',
      details: 'Solo, duo, and group performances across various dance styles including hip-hop, classical, and contemporary.'
    },
    {
      id: 3,
      title: 'DRAMA DIARIES',
      category: 'DRAMA',
      description: 'Step into character and bring stories to life on the grand stage of theatrical excellence.',
      date: 'March 17, 2025',
      time: '8:00 PM',
      venue: 'Theater Hall',
      registerLink: 'https://forms.gle/sample-drama-form',
      gradient: 'from-yellow-500 to-orange-500',
      icon: '🎭',
      details: 'Short plays, monologues, and improvisational theater showcasing dramatic talents.'
    }
  ];

  return (
    <div className="min-h-screen bg-dark-bg text-white">
      <ScrollProgressBar />
      <ParticlesBackground />
      
      <div className="container mx-auto px-8 py-20">
        <motion.h1 
          className="text-6xl font-bold text-center mb-4 bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          EVENTS
        </motion.h1>
        
        <motion.p 
          className="text-xl text-center text-gray-300 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Where talents meet opportunity and dreams take flight
        </motion.p>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              className="relative group cursor-pointer"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              whileHover={{ y: -10, scale: 1.02 }}
              onClick={() => setSelectedEvent(event)}
            >
              <div className="bg-dark-card rounded-xl p-8 border border-gray-800 hover:border-neon-purple/50 transition-all duration-500 h-full relative overflow-hidden">
                {/* Animated Background Gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${event.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}
                />
                
                {/* Floating Icon */}
                <motion.div
                  className="text-6xl mb-6 text-center relative z-10"
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  {event.icon}
                </motion.div>
                
                <div className="relative z-10">
                  <motion.div
                    className="text-sm font-bold text-neon-yellow mb-2 tracking-wide"
                    animate={{ 
                      textShadow: selectedEvent?.id === event.id ? '0 0 10px currentColor' : '0 0 0px currentColor'
                    }}
                  >
                    {event.category}
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-neon-pink transition-colors duration-300">
                    {event.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {event.description}
                  </p>
                  
                  <div className="space-y-2 mb-8 text-sm text-gray-400">
                    <div className="flex items-center">
                      <span className="w-4 h-4 mr-2">📅</span>
                      {event.date}
                    </div>
                    <div className="flex items-center">
                      <span className="w-4 h-4 mr-2">🕐</span>
                      {event.time}
                    </div>
                    <div className="flex items-center">
                      <span className="w-4 h-4 mr-2">📍</span>
                      {event.venue}
                    </div>
                  </div>
                  
                  <motion.a
                    href={event.registerLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-block bg-gradient-to-r ${event.gradient} px-8 py-3 rounded-full font-bold text-white shadow-lg hover:shadow-xl transition-all duration-300`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Register Now 🚀
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Event Details Modal */}
        <AnimatePresence>
          {selectedEvent && (
            <motion.div
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
            >
              <motion.div
                className="bg-dark-card rounded-xl p-8 max-w-2xl w-full border border-neon-purple/50"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-neon-pink">{selectedEvent.title}</h2>
                  <button 
                    onClick={() => setSelectedEvent(null)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-gray-300 mb-4">{selectedEvent.details}</p>
                <div className="flex justify-center">
                  <motion.a
                    href={selectedEvent.registerLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`bg-gradient-to-r ${selectedEvent.gradient} px-8 py-3 rounded-full font-bold text-white`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Register Now
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
