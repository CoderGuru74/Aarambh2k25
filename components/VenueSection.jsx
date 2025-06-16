// components/VenueSection.jsx
import { motion } from 'framer-motion';

export default function VenueSection() {
  return (
    <section id="venue" className="py-20 px-4 container mx-auto text-center">
      <motion.h2
        className="text-5xl font-bold font-heading mb-12 bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent pb-4 border-b-2 border-neon-purple/50 relative"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{ textShadow: '0 0 10px rgba(6,182,212,0.5)' }}
      >
        Our Venue
        <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-24 h-1 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-full"></span>
      </motion.h2>
      <div className="relative w-full max-w-4xl mx-auto h-96 bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center border border-gray-700 shadow-lg">
        {/* Placeholder for actual map or image of map */}
        <p className="text-xl text-gray-400">Map will go here! (e.g., Google Map iframe or static image)</p>
      </div>
      <p className="text-xl text-gray-300 font-body mt-8 max-w-2xl mx-auto leading-relaxed">
        Join us at our state-of-the-art campus! Detailed directions and specific location details will be available soon.
      </p>
    </section>
  );
}