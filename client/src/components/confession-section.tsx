import { motion } from 'framer-motion';
import { Crown, Images } from 'lucide-react';

interface ConfessionSectionProps {
  onShowMemories: () => void;
  isVisible: boolean;
}

export default function ConfessionSection({ onShowMemories, isVisible }: ConfessionSectionProps) {
  const handleShowMemories = () => {
    createSparkleEffect();
    setTimeout(() => {
      onShowMemories();
    }, 800);
  };

  const createSparkleEffect = () => {
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'fixed';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.fontSize = Math.random() * 15 + 15 + 'px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '1000';
        sparkle.style.animation = 'sparkle 2s ease-in-out forwards';
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
          if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
          }
        }, 2000);
      }, i * 200);
    }
  };

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
              y: [0, -20, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Crown className="text-5xl text-yellow-300 mx-auto" size={80} />
          </motion.div>
          
          <motion.h2
            className="font-playfair text-3xl md:text-4xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            My Dearest Princess
          </motion.h2>
          
          <div className="space-y-4 text-yellow-100 text-lg leading-relaxed">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              I've been thinking about us lately, and I realize I owe you the most heartfelt apology...
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              I'm truly sorry that we've had fewer interactions recently. I miss our gaming sessions, our late-night talks, and just... us.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              Remember when we used to play Valorant until sunrise and talk about everything and nothing? Those were the best times.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
            >
              You mean so much to me, Princess, and I never want you to feel forgotten or unimportant.
            </motion.p>
          </div>
          
          <motion.button
            onClick={handleShowMemories}
            className="mt-8 bg-gradient-to-r from-pink-400 to-red-400 text-white px-8 py-4 rounded-full font-medium text-lg hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Images className="inline mr-2" size={20} />
            Our Beautiful Memories
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
}
