import { motion } from 'framer-motion';
import { Heart, Mail, Sparkles } from 'lucide-react';

interface WelcomeSectionProps {
  onStartJourney: () => void;
  isVisible: boolean;
}

export default function WelcomeSection({ onStartJourney, isVisible }: WelcomeSectionProps) {
  const handleStart = () => {
    // Create heart explosion effect
    createHeartExplosion();
    setTimeout(() => {
      onStartJourney();
    }, 1000);
  };

  const createHeartExplosion = () => {
    for (let i = 0; i < 15; i++) {
      setTimeout(() => {
        const heart = document.createElement('div');
        heart.innerHTML = '💕';
        heart.style.position = 'fixed';
        heart.style.left = '50%';
        heart.style.top = '50%';
        heart.style.fontSize = Math.random() * 20 + 20 + 'px';
        heart.style.transform = 'translate(-50%, -50%)';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1000';
        
        const angle = (Math.PI * 2 * i) / 15;
        const velocity = Math.random() * 100 + 50;
        const dx = Math.cos(angle) * velocity;
        const dy = Math.sin(angle) * velocity;
        
        heart.animate([
          { transform: 'translate(-50%, -50%)', opacity: 1 },
          { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`, opacity: 0 }
        ], {
          duration: Math.random() * 2000 + 3000,
          easing: 'ease-out'
        });
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
          if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
          }
        }, 4000);
      }, i * 100);
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
      <div className="text-center px-6 max-w-2xl mx-auto">
        {/* Animated heart icon with glow */}
        <motion.div
          className="mb-8 relative"
          animate={{
            scale: [1, 1.1, 1, 1.05],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="absolute inset-0 blur-xl bg-red-400 opacity-30 rounded-full"></div>
          <Heart className="text-6xl text-red-400 mx-auto relative z-10" size={96} fill="currentColor" />
        </motion.div>
        
        <motion.h1
          className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6 relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          For My Princess
          <motion.div
            className="absolute -top-2 -right-2"
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Sparkles className="text-yellow-300" size={24} />
          </motion.div>
        </motion.h1>
        
        <motion.div
          className="typewriter font-dancing text-2xl text-yellow-100 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          A message from Vivi...
        </motion.div>
        
        <motion.button
          onClick={handleStart}
          className="bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white px-8 py-4 rounded-full font-medium text-lg shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 border border-white/20"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <Mail className="inline mr-2" size={20} />
          Open My Heart
        </motion.button>
      </div>
    </motion.section>
  );
}
