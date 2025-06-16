// components/EventCard.jsx
import { motion } from 'framer-motion';

export default function EventCard({ title, description, icon, link, index }) {
  return (
    <motion.div
      className="bg-dark-card rounded-lg p-6 shadow-xl border border-transparent hover:border-neon-cyan transition-all duration-300 relative overflow-hidden h-full flex flex-col"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1 }} // Stagger delay for card itself
      whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(6,182,212,0.4)' }}
    >
      <div className="flex items-center mb-4">
        <div className="text-5xl mr-4 text-neon-yellow">{icon}</div>
        <h3 className="text-3xl font-heading text-neon-cyan bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan to-neon-purple leading-tight">
          {title}
        </h3>
      </div>
      <p className="text-gray-300 mb-6 flex-grow">{description}</p> {/* flex-grow to push "Learn More" to bottom */}
      <div className="text-right mt-auto"> {/* mt-auto pushes it to the bottom */}
        <a href={link} className="inline-block text-neon-pink hover:text-neon-yellow transition-colors duration-300 font-bold">
          Learn More &rarr;
        </a>
      </div>
    </motion.div>
  );
}