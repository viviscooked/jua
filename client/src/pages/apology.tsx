import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ArrowDown, Home, MessageSquare, Camera, Sparkles, Crown, HandHeart, Star, Moon, Zap, Play, Pause, Volume2, VolumeX } from 'lucide-react';

export default function ApologyApp() {
  const [currentStep, setCurrentStep] = useState(0);

  const [showHearts, setShowHearts] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = [
    'intro',
    'message',
    'memories',
    'gaming',
    'promise',
    'response'
  ];

  useEffect(() => {
    const timer = setTimeout(() => setShowHearts(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Start music when user moves to step 1
  useEffect(() => {
    if (currentStep > 0) {
      const audio = document.getElementById('background-music') as HTMLAudioElement;
      if (audio && !isPlaying) {
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch((error) => {
          console.log('Audio play failed:', error);
        });
      }
    }
  }, [currentStep, isPlaying]);

  const nextStep = () => {
    // Try to start music on first interaction
    if (!isPlaying) {
      const audio = document.getElementById('background-music') as HTMLAudioElement;
      if (audio) {
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch((error) => {
          console.log('Audio play failed:', error);
        });
      }
    }
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };



  const handleResponse = (response: string) => {
    // Try to start music on interaction
    if (!isPlaying) {
      const audio = document.getElementById('background-music') as HTMLAudioElement;
      if (audio) {
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch((error) => {
          console.log('Audio play failed:', error);
        });
      }
    }
    
    setSelectedResponse(response);
  };



  const showSurprise = () => {
    // Add sparkle effect
    for (let i = 0; i < 15; i++) {
      setTimeout(() => {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'fixed';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.fontSize = Math.random() * 20 + 20 + 'px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '1000';
        sparkle.style.animation = 'sparkle 3s ease-in-out forwards';

        document.body.appendChild(sparkle);

        setTimeout(() => {
          if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
          }
        }, 3000);
      }, i * 100);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-40 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating Hearts */}
      <AnimatePresence>
        {showHearts && (
          <motion.div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-pink-400 text-2xl"
                initial={{ 
                  x: Math.random() * window.innerWidth, 
                  y: window.innerHeight + 50,
                  opacity: 0.7 
                }}
                animate={{ 
                  y: -100,
                  x: Math.random() * window.innerWidth,
                  rotate: 360
                }}
                transition={{ 
                  duration: Math.random() * 3 + 5,
                  repeat: Infinity,
                  delay: i * 0.8
                }}
              >
                💕
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center max-w-2xl"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mb-8"
              >
                <Heart className="text-red-400 mx-auto" size={120} fill="currentColor" />
              </motion.div>

              <motion.h1 
                className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-6"
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Dear Princess
              </motion.h1>

              <motion.p 
                className="text-xl text-white/80 mb-8 font-light"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
              >
                A heartfelt message from Vivi
              </motion.p>

              <motion.button
                onClick={nextStep}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 group"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                Open My Heart
                <ArrowDown className="inline ml-2 group-hover:translate-y-1 transition-transform" size={20} />
              </motion.button>
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div
              key="message"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="max-w-4xl text-center bg-black/20 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10"
            >
              <Crown className="text-yellow-400 mx-auto mb-6" size={60} />
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">My Sincere Apology</h2>

              <div className="space-y-6 text-lg text-white/90 leading-relaxed">
                <motion.p
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Princess, I've been thinking about us lately, and my heart feels heavy knowing we've had fewer interactions recently. The distance between us makes every missed conversation feel like an eternity.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  I miss our late-night video calls, our gaming sessions that lasted until sunrise, and those moments when we'd talk about everything and nothing despite being miles apart.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  You mean more to me than words can express, and being so far away makes me cherish every digital moment we share even more.
                </motion.p>
              </div>

              <motion.button
                onClick={nextStep}
                className="mt-8 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                Our Beautiful Memories
                <Camera className="inline ml-2" size={20} />
              </motion.button>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="memories"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-6xl"
            >
              <h2 className="text-4xl font-bold text-white text-center mb-12">
                <Camera className="inline mr-3" />
                Moments We Shared
              </h2>

              <div className="grid md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto">
                {[
                  { img: "/attached_assets/Valorant-review-2_1750247273195.jpg", title: "Valorant Sessions", desc: "Gaming together until sunrise" },
                  { img: "/attached_assets/36356809-love-couple-chatting-in-valentines-night-in-vector_1750247273195.jpg", title: "Late Night Chats", desc: "Talking for hours about everything" }
                ].map((memory, i) => (
                  <motion.div
                    key={i}
                    className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 hover:scale-105 transition-transform duration-300"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <img 
                      src={memory.img} 
                      alt={memory.title} 
                      className="w-full h-48 object-cover" 
                      onError={(e) => {
                        console.log('Image failed to load:', memory.img);
                        e.currentTarget.style.display = 'none';
                      }}
                      onLoad={() => console.log('Image loaded successfully:', memory.img)}
                    />
                    <div className="p-4">
                      <h3 className="text-white font-semibold text-lg">{memory.title}</h3>
                      <p className="text-white/70 text-sm">{memory.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="text-center">
                <motion.button
                  onClick={nextStep}
                  className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Our Gaming Adventures
                  <Sparkles className="inline ml-2" size={20} />
                </motion.button>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="gaming"
              initial={{ opacity: 0, rotateY: -20 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: 20 }}
              className="max-w-4xl text-center bg-gradient-to-br from-indigo-900/50 to-purple-900/50 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-purple-500/30"
            >
              <div className="text-6xl mb-6">🎮</div>
              <h2 className="text-4xl font-bold text-white mb-8">Valorant Until Sunrise</h2>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4 text-left">
                  <motion.div 
                    className="bg-green-500/20 p-4 rounded-lg border-l-4 border-green-400"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <p className="text-white">Remember those epic clutches we pulled off together?</p>
                  </motion.div>
                  <motion.div 
                    className="bg-blue-500/20 p-4 rounded-lg border-l-4 border-blue-400"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <p className="text-white">Those 3 AM gaming sessions where we'd forget about time</p>
                  </motion.div>
                  <motion.div 
                    className="bg-purple-500/20 p-4 rounded-lg border-l-4 border-purple-400"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.9 }}
                  >
                    <p className="text-white">Your laughter when we'd make silly mistakes - music to my ears</p>
                  </motion.div>
                </div>

                <motion.div 
                  className="bg-black/30 p-6 rounded-xl"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="text-4xl mb-4">⏰</div>
                  <p className="text-white text-lg">
                    "Just one more game" - we said<br />
                    But we played until dawn instead<br />
                    Those were our golden hours, Princess
                  </p>
                </motion.div>
              </div>

              <motion.button
                onClick={nextStep}
                className="mt-8 bg-gradient-to-r from-red-500 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:shadow-2xl hover:shadow-red-500/25 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                My Promise to You
                <HandHeart className="inline ml-2" size={20} />
              </motion.button>
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div
              key="promise"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="max-w-4xl text-center bg-black/20 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10"
            >
              <HandHeart className="text-red-400 mx-auto mb-6" size={80} />
              <h2 className="text-4xl font-bold text-white mb-8">My Sacred Promise</h2>

              <div className="space-y-6 text-lg text-white/90 leading-relaxed">
                <motion.div
                  className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 p-6 rounded-xl border border-pink-500/30"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <p>Princess, I promise to be more present in your life. No more letting days pass without our conversations.</p>
                </motion.div>
                <motion.div
                  className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 p-6 rounded-xl border border-blue-500/30"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <p>I'll make time for our gaming sessions, our late-night talks, and all the moments that make us... us.</p>
                </motion.div>
                <motion.div
                  className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 p-6 rounded-xl border border-emerald-500/30"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  <p>You deserve someone who shows up, and I want to be that person for you, always.</p>
                </motion.div>
              </div>

              <motion.button
                onClick={nextStep}
                className="mt-8 bg-gradient-to-r from-violet-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:shadow-2xl hover:shadow-violet-500/25 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                Your Response Matters
                <MessageSquare className="inline ml-2" size={20} />
              </motion.button>
            </motion.div>
          )}

          {currentStep === 5 && (
            <motion.div
              key="response"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="max-w-4xl text-center bg-black/20 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10"
            >
              <MessageSquare className="text-blue-400 mx-auto mb-6" size={80} />
              <h2 className="text-4xl font-bold text-white mb-8">Princess, How Do You Feel?</h2>

              <p className="text-xl text-white/80 mb-8">Your feelings matter to me more than anything in this world...</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {[
                  { id: 'forgive', label: 'I Forgive You ✨', color: 'from-green-500 to-emerald-600', response: 'Princess, your forgiveness means everything to me! I promise to cherish our friendship even more. - Vivi 💕' },
                  { id: 'touched', label: 'This is Beautiful 💕', color: 'from-pink-500 to-rose-600', response: 'I\'m so happy this touched your heart! You deserve all the beautiful things in life, Princess. - Vivi 🌸' },
                  { id: 'grateful', label: 'Thank You, Vivi 🌟', color: 'from-yellow-500 to-orange-600', response: 'Thank YOU for being such an amazing person, Princess! Your kindness inspires me every day. - Vivi 🌟' },
                  { id: 'talk', label: "Let's Talk More 💬", color: 'from-blue-500 to-cyan-600', response: 'I\'d love to talk more, Princess! Let\'s catch up soon and make up for lost time. - Vivi 💬' }
                ].map((option) => (
                  <motion.button
                    key={option.id}
                    onClick={() => handleResponse(option.id)}
                    className={`bg-gradient-to-r ${option.color} text-white p-6 rounded-2xl text-lg font-medium hover:shadow-2xl transition-all duration-300 ${selectedResponse === option.id ? 'ring-4 ring-white/50' : ''}`}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 * parseInt(option.id.slice(-1)) }}
                    disabled={!!selectedResponse}
                  >
                    {option.label}
                  </motion.button>
                ))}
              </div>

              {selectedResponse && (
                <motion.div
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <p className="text-white text-lg">
                    {[
                      { id: 'forgive', response: 'Princess, your forgiveness means everything to me! I promise to cherish our friendship even more. - Vivi 💕' },
                      { id: 'touched', response: 'I\'m so happy this touched your heart! You deserve all the beautiful things in life, Princess. - Vivi 🌸' },
                      { id: 'grateful', response: 'Thank YOU for being such an amazing person, Princess! Your kindness inspires me every day. - Vivi 🌟' },
                      { id: 'talk', response: 'I\'d love to talk more, Princess! Let\'s catch up soon and make up for lost time. - Vivi 💬' }
                    ].find(r => r.id === selectedResponse)?.response}
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
        {steps.map((_, index) => (
          <button
            key={index}
            onClick={() => goToStep(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentStep ? 'bg-white scale-125' : 'bg-white/30 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Hidden Audio Element */}
      <audio 
        id="background-music"
        loop
        preload="auto"
        onLoadedData={() => {
          const audio = document.getElementById('background-music') as HTMLAudioElement;
          if (audio) {
            audio.volume = 0.3;
          }
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={(e) => console.log('Audio error:', e)}
      >
        <source src="/attached_assets/Cigarettes out the Window_1750248156965.mp3" type="audio/mpeg" />
        <source src="/attached_assets/Cigarettes out the Window_1750246076507.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>




      {/* Enhanced Watermark */}
      <motion.div 
        className="fixed bottom-4 right-4 bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-sm rounded-full px-4 py-2 border border-pink-400/30 shadow-lg z-40"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
        whileHover={{ scale: 1.05 }}
      >
        <div className="flex items-center space-x-2 text-white/80 text-sm font-medium">
          <span>Made with</span>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Heart className="text-red-400" size={12} fill="currentColor" />
          </motion.div>
          <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent font-bold">by Vivi</span>
        </div>
      </motion.div>

      {/* Floating Sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute text-yellow-300"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0
            }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              rotate: 360
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.8,
              repeatDelay: 2
            }}
          >
            <Sparkles size={16} />
          </motion.div>
        ))}
      </div>

      {/* Long Distance Reminder */}
      {currentStep > 0 && (
        <motion.div
          className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2 border border-blue-400/30"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3 }}
        >
          <div className="flex items-center space-x-2 text-blue-200 text-sm">
            <Moon size={14} />
            <span>Miles apart, hearts together</span>
            <Heart size={12} fill="currentColor" className="text-red-400" />
          </div>
        </motion.div>
      )}
    </div>
  );
}