import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Moon, Sun, Cloud, Sparkles } from 'lucide-react';

export default function InteractiveElements() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    setClicks(prev => prev + 1);
    
    // Create click effect
    const effect = document.createElement('div');
    effect.innerHTML = ['💕', '✨', '🌟', '💖', '🦋'][Math.floor(Math.random() * 5)];
    effect.style.position = 'fixed';
    effect.style.left = e.clientX + 'px';
    effect.style.top = e.clientY + 'px';
    effect.style.fontSize = '20px';
    effect.style.pointerEvents = 'none';
    effect.style.zIndex = '1000';
    effect.style.transform = 'translate(-50%, -50%)';
    
    effect.animate([
      { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
      { opacity: 0, transform: 'translate(-50%, -100px) scale(1.5)' }
    ], {
      duration: 1000,
      easing: 'ease-out'
    });
    
    document.body.appendChild(effect);
    setTimeout(() => effect.remove(), 1000);
  };

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-5"
      onClick={handleClick}
      style={{ pointerEvents: 'auto' }}
    >
      {/* Floating interactive elements */}
      <motion.div
        className="absolute pointer-events-none"
        animate={{
          x: mousePos.x - 10,
          y: mousePos.y - 10,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <Star className="text-yellow-300 opacity-60" size={16} />
      </motion.div>
      
      {/* Corner decorations */}
      <motion.div
        className="absolute top-20 left-20"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Moon className="text-blue-300 opacity-40" size={32} />
      </motion.div>
      
      <motion.div
        className="absolute top-32 right-32"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, -10, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Sun className="text-yellow-400 opacity-40" size={28} />
      </motion.div>
      
      <motion.div
        className="absolute bottom-40 left-40"
        animate={{
          x: [0, 30, -30, 0],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Cloud className="text-blue-200 opacity-30" size={36} />
      </motion.div>
      
      {/* Click counter display */}
      {clicks > 5 && (
        <motion.div
          className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          <div className="text-white text-sm font-dancing flex items-center space-x-2">
            <Sparkles className="text-yellow-300" size={16} />
            <span>Princess, you've discovered the magic! ✨</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}