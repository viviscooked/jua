import { motion } from 'framer-motion';
import { useState } from 'react';
import { MessageSquareHeart, Heart, Smile, HandHeart, MessageCircle } from 'lucide-react';

interface ResponseSectionProps {
  isVisible: boolean;
}

export default function ResponseSection({ isVisible }: ResponseSectionProps) {
  const [selectedResponse, setSelectedResponse] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const responses = [
    {
      id: 'accepted',
      icon: Heart,
      label: 'I Forgive You ✨',
      feedback: "Princess, your forgiveness means the world to me! 💕 I promise to cherish our friendship even more. - Vivi",
      colors: 'from-green-400 to-emerald-500'
    },
    {
      id: 'touched',
      icon: Smile,
      label: 'This is Beautiful 💕',
      feedback: "I'm so happy this touched your heart! 🌸 You deserve all the beautiful things in life, Princess. - Vivi",
      colors: 'from-purple-400 to-pink-400'
    },
    {
      id: 'grateful',
      icon: HandHeart,
      label: 'Thank You, Vivi 🌟',
      feedback: "Thank YOU for being such an amazing person, Princess! 🌟 Your kindness inspires me every day. - Vivi",
      colors: 'from-yellow-400 to-orange-400'
    },
    {
      id: 'need_talk',
      icon: MessageCircle,
      label: "Let's Talk More 💬",
      feedback: "I'd love to talk more, Princess! 💬 Let's catch up soon and make up for lost time. - Vivi",
      colors: 'from-blue-400 to-indigo-400'
    }
  ];

  const handleResponse = (responseId: string) => {
    setSelectedResponse(responseId);
    setShowFeedback(true);
    createCelebrationEffect();
  };

  const createCelebrationEffect = () => {
    const emojis = ['🎉', '💖', '🌟', '✨', '💕', '🦋'];
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const emoji = document.createElement('div');
        emoji.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.position = 'fixed';
        emoji.style.left = Math.random() * 100 + '%';
        emoji.style.top = '-50px';
        emoji.style.fontSize = Math.random() * 15 + 20 + 'px';
        emoji.style.pointerEvents = 'none';
        emoji.style.zIndex = '1000';
        
        emoji.animate([
          { transform: 'translateY(-50px)', opacity: 1 },
          { transform: 'translateY(100vh)', opacity: 0 }
        ], {
          duration: Math.random() * 2000 + 4000,
          easing: 'ease-out'
        });
        
        document.body.appendChild(emoji);
        
        setTimeout(() => {
          if (emoji.parentNode) {
            emoji.parentNode.removeChild(emoji);
          }
        }, 6000);
      }, i * 150);
    }
  };

  const selectedResponseData = responses.find(r => r.id === selectedResponse);

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
              scale: [1, 1.1, 1, 1.05],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <MessageSquareHeart className="text-5xl text-pink-300 mx-auto" size={80} />
          </motion.div>
          
          <motion.h2
            className="font-playfair text-3xl md:text-4xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Princess, How Do You Feel?
          </motion.h2>
          
          <motion.p
            className="text-yellow-100 text-lg mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Your feelings matter to me more than anything. Please let me know how this makes you feel...
          </motion.p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {responses.map((response, index) => {
              const Icon = response.icon;
              return (
                <motion.button
                  key={response.id}
                  onClick={() => handleResponse(response.id)}
                  className={`bg-gradient-to-r ${response.colors} text-white px-6 py-4 rounded-2xl font-medium text-lg hover:scale-105 transition-transform duration-300`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={showFeedback}
                >
                  <Icon className="text-2xl mb-2 mx-auto" size={32} />
                  {response.label}
                </motion.button>
              );
            })}
          </div>
          
          {showFeedback && selectedResponseData && (
            <motion.div
              className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-yellow-100 text-lg font-dancing">
                {selectedResponseData.feedback}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
