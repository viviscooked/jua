import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface MusicPlayerProps {
  isVisible: boolean;
}

export default function MusicPlayer({ isVisible }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
      audio.loop = true;
    }
  }, [volume]);

  // Auto-play when component becomes visible
  useEffect(() => {
    const audio = audioRef.current;
    if (audio && isVisible && !isPlaying) {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay prevented, user needs to interact first
        console.log('Autoplay prevented');
      });
    }
  }, [isVisible]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // Handle autoplay restrictions
          console.log('Autoplay prevented');
        });
      }
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <motion.div
      className={`fixed bottom-6 left-6 z-30 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white/10 backdrop-blur-lg rounded-full p-4 border border-white/20 shadow-xl">
        <div className="flex items-center space-x-3">
          <motion.button
            onClick={togglePlay}
            className="bg-white/20 hover:bg-white/30 rounded-full p-3 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isPlaying ? (
              <Pause className="text-white" size={20} />
            ) : (
              <Play className="text-white ml-1" size={20} />
            )}
          </motion.button>
          
          <motion.button
            onClick={toggleMute}
            className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMuted ? (
              <VolumeX className="text-white" size={16} />
            ) : (
              <Volume2 className="text-white" size={16} />
            )}
          </motion.button>
          
          <div className="text-white/80 text-xs font-dancing hidden sm:block">
            Our Song ♪
          </div>
        </div>
      </div>
      
      <audio
        ref={audioRef}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src="/attached_assets/Cigarettes out the Window_1750246076507.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </motion.div>
  );
}