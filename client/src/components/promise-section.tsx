import { motion } from 'framer-motion';
import { HandHeart, MessageCircleReply, RotateCcw } from 'lucide-react';

interface PromiseSectionProps {
  onShowResponse: () => void;
  onPlayAgain: () => void;
  isVisible: boolean;
}

export default function PromiseSection({ onShowResponse, onPlayAgain, isVisible }: PromiseSectionProps) {
  return (
    <motion.section
      className={`min-h-screen flex items-center justify-center relative z-10 section-transition ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 shadow-xl">
          <motion.div
            className="mb-6"
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <HandHeart className="text-5xl text-yellow-300 mx-auto" size={80} />
          </motion.div>
          
          <motion.h2
            className="font-playfair text-3xl md:text-4xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            My Solemn Promise
          </motion.h2>
          
          <div className="space-y-4 text-yellow-100 text-lg leading-relaxed mb-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Princess, I promise to be more present in your life.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              I'll make time for our conversations, our laughter, and our friendship.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              You deserve someone who shows up, and I want to be that person for you.
            </motion.p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              onClick={onShowResponse}
              className="bg-gradient-to-r from-pink-400 to-red-400 text-white px-6 py-3 rounded-full font-medium hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircleReply className="inline mr-2" size={20} />
              Your Response
            </motion.button>
            <motion.button
              onClick={onPlayAgain}
              className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded-full font-medium hover:bg-white/30 transition-all duration-300"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw className="inline mr-2" size={20} />
              Experience Again
            </motion.button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
