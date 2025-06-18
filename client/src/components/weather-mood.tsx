import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cloud, Sun, CloudRain, Snowflake, Wind } from 'lucide-react';

interface WeatherMoodProps {
  isVisible: boolean;
}

export default function WeatherMood({ isVisible }: WeatherMoodProps) {
  const [currentWeather, setCurrentWeather] = useState(0);
  
  const weatherMoods = [
    {
      icon: Sun,
      mood: "Sunny",
      message: "Bright and cheerful like Princess's smile",
      color: "text-yellow-400",
      bg: "from-yellow-400/20 to-orange-400/20"
    },
    {
      icon: Cloud,
      mood: "Cloudy",
      message: "Soft and dreamy like our conversations",
      color: "text-blue-300",
      bg: "from-blue-400/20 to-indigo-400/20"
    },
    {
      icon: CloudRain,
      mood: "Rainy",
      message: "Cozy moments we'd share indoors",
      color: "text-blue-400",
      bg: "from-blue-500/20 to-cyan-400/20"
    },
    {
      icon: Snowflake,
      mood: "Snowy",
      message: "Pure and magical like our friendship",
      color: "text-cyan-300",
      bg: "from-cyan-400/20 to-blue-300/20"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWeather(prev => (prev + 1) % weatherMoods.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const current = weatherMoods[currentWeather];
  const Icon = current.icon;

  return (
    <motion.div
      className={`fixed top-20 right-8 z-10 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
      transition={{ duration: 0.8, delay: 1 }}
    >
      <motion.div
        className={`bg-gradient-to-br ${current.bg} backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-xl`}
        key={currentWeather}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-3">
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Icon className={`${current.color}`} size={32} />
          </motion.div>
          
          <div>
            <div className="text-white font-medium text-sm">{current.mood}</div>
            <div className="text-white/70 text-xs max-w-32 leading-tight">
              {current.message}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}