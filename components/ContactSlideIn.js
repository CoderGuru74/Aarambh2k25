// components/ContactSlideIn.js
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, AtSign, X } from 'lucide-react'; // Import necessary icons

const ContactSlideIn = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center pointer-events-none" // Use pointer-events-none on parent
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Overlay - allows clicks to close the panel */}
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm pointer-events-auto" // Re-enable pointer events on overlay
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Slide-in Panel */}
          <motion.div
            className="relative w-full max-w-lg bg-dark-card rounded-t-2xl p-8 shadow-2xl border-t-2 border-neon-cyan flex flex-col items-center text-center space-y-6 pointer-events-auto" // Re-enable pointer events on panel
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200"
              aria-label="Close contact panel"
              data-interactive="true"
            >
              <X size={28} />
            </button>

            <h3 className="text-3xl font-bold text-neon-yellow mb-4">Get in Touch!</h3>

            {/* Twitter/Instagram Handle */}
            <div className="flex items-center space-x-3 text-2xl text-gray-200 group">
              <AtSign size={32} className="text-neon-cyan group-hover:scale-110 transition-transform" />
              <a
                href="https://twitter.com/aarambh2k25" // You can change this to Instagram or other social media
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-neon-cyan transition-colors duration-200"
                data-interactive="true"
              >
                @aarambh2k25
              </a>
            </div>

            {/* Email Address */}
            <div className="flex items-center space-x-3 text-2xl text-gray-200 group">
              <Mail size={32} className="text-neon-purple group-hover:scale-110 transition-transform" />
              <a
                href="mailto:aarambh@iitp.ac.in"
                className="hover:text-neon-purple transition-colors duration-200"
                data-interactive="true"
              >
                aarambh@iitp.ac.in
              </a>
            </div>

            <p className="text-gray-400 text-sm mt-4">
              Connect with us for inquiries, collaborations, or just to say hello!
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactSlideIn;