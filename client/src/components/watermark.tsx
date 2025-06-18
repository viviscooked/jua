import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function Watermark() {
  return (
    <motion.div
      className="fixed bottom-4 right-4 z-20 opacity-70 hover:opacity-100 transition-opacity duration-300"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 0.7, scale: 1 }}
      transition={{ duration: 1, delay: 2 }}
    >
      <div className="bg-black/20 backdrop-blur-sm rounded-full px-3 py-1 border border-white/10">
        <div className="flex items-center space-x-1 text-white/80 text-xs font-dancing">
          <span>Made with</span>
          <Heart className="text-red-400" size={12} fill="currentColor" />
          <span>by Vivi</span>
        </div>
      </div>
    </motion.div>
  );
}