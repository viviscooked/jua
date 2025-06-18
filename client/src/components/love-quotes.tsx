import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

interface LoveQuotesProps {
  isVisible: boolean;
}

export default function LoveQuotes({ isVisible }: LoveQuotesProps) {
  const quotes = [
    "Every moment away from you feels like a lifetime...",
    "Princess, you light up my world in ways you'll never know",
    "Those gaming sessions taught me we're perfect teammates 🎮",
    "I miss our midnight conversations more than anything",
    "Your laugh during our Valorant matches is my favorite sound",
    "Distance means nothing when someone means everything",
    "You're the first thought in my morning and the last in my night",
    "Our late-night talks made me realize how special you are"
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <motion.div
      className={`fixed top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 max-w-md ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
      transition={{ duration: 1, delay: 1 }}
    >
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center">
        <Quote className="text-yellow-300 mx-auto mb-3" size={24} />
        <p className="text-white/90 text-lg font-dancing italic leading-relaxed">
          {randomQuote}
        </p>
        <div className="mt-3 text-white/60 text-sm">
          - Vivi's Heart
        </div>
      </div>
    </motion.div>
  );
}