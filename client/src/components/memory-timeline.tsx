import { motion } from 'framer-motion';
import { Clock, MessageCircle, Heart, Gamepad2, Coffee, Moon } from 'lucide-react';

interface MemoryTimelineProps {
  isVisible: boolean;
}

export default function MemoryTimeline({ isVisible }: MemoryTimelineProps) {
  const timelineItems = [
    {
      icon: MessageCircle,
      time: "First Message",
      title: "The Beginning",
      description: "When Vivi first said hello to Princess",
      color: "from-pink-400 to-rose-400"
    },
    {
      icon: Coffee,
      time: "Morning Talks",
      title: "Coffee Conversations",
      description: "Deep talks over virtual coffee dates",
      color: "from-amber-400 to-orange-400"
    },
    {
      icon: Gamepad2,
      time: "Gaming Sessions",
      title: "Valorant Adventures",
      description: "Playing together until sunrise",
      color: "from-purple-400 to-indigo-400"
    },
    {
      icon: Moon,
      time: "Late Nights",
      title: "Midnight Conversations",
      description: "Staying up whole night just talking",
      color: "from-blue-400 to-cyan-400"
    },
    {
      icon: Heart,
      time: "Special Moments",
      title: "Heart Connections",
      description: "Those moments that made Vivi's heart skip",
      color: "from-red-400 to-pink-400"
    }
  ];

  return (
    <motion.div
      className={`fixed left-8 top-1/2 transform -translate-y-1/2 z-10 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-400 via-purple-400 to-blue-400 opacity-60" />
        
        {timelineItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={index}
              className="relative flex items-center mb-8 group"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 + index * 0.2 }}
            >
              {/* Timeline dot */}
              <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="text-white" size={20} />
              </div>
              
              {/* Content */}
              <div className="ml-4 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 group-hover:bg-white/15 transition-all duration-300">
                <div className="text-white/60 text-xs font-medium">{item.time}</div>
                <div className="text-white font-semibold text-sm">{item.title}</div>
                <div className="text-white/80 text-xs mt-1">{item.description}</div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}