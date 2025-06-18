import { motion } from 'framer-motion';
import { Camera, HeartHandshake } from 'lucide-react';

interface MemoriesSectionProps {
  onShowPromise: () => void;
  isVisible: boolean;
}

export default function MemoriesSection({ onShowPromise, isVisible }: MemoriesSectionProps) {
  const memories = [
    {
      image: "/attached_assets/Valorant-review-2_1750247273195.jpg",
      alt: "Valorant gaming",
      caption: "Playing Valorant together until sunrise 🎮"
    },
    {
      image: "/attached_assets/36356809-love-couple-chatting-in-valentines-night-in-vector_1750247273195.jpg",
      alt: "Couple chatting at night",
      caption: "Staying up whole night talking ✨"
    },
    {
      image: "/attached_assets/image_1750246127234.png",
      alt: "Sweet memories",
      caption: "Our deep conversations over coffee ☕"
    },
    {
      image: "/attached_assets/image_1750246127234.png",
      alt: "Sweet messages",
      caption: "Endless texts that made me smile 💕"
    },
    {
      image: "/attached_assets/Valorant-review-2_1750247273195.jpg",
      alt: "Gaming together",
      caption: "Watching sunsets while video calling 🌅"
    },
    {
      image: "/attached_assets/36356809-love-couple-chatting-in-valentines-night-in-vector_1750247273195.jpg",
      alt: "Romantic conversations",
      caption: "Sharing our favorite songs and stories 📚"
    }
  ];

  return (
    <motion.section
      className={`min-h-screen flex items-center justify-center relative z-10 section-transition ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-4xl mx-auto px-6">
        <motion.h2
          className="font-playfair text-3xl md:text-4xl font-bold text-white text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Camera className="inline mr-3 text-yellow-300" size={40} />
          Memories That Matter
        </motion.h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {memories.map((memory, index) => (
            <motion.div
              key={index}
              className="memory-card bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <img
                src={memory.image}
                alt={memory.alt}
                className="w-full h-48 object-cover rounded-xl mb-3"
              />
              <p className="text-yellow-100 text-sm font-dancing">{memory.caption}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.button
            onClick={onShowPromise}
            className="bg-gradient-to-r from-purple-400 to-red-400 text-white px-8 py-4 rounded-full font-medium text-lg hover:scale-105 transition-transform duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <HeartHandshake className="inline mr-2" size={20} />
            My Promise to You
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
}
