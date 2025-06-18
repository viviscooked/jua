import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ParticlesBackground from '@/components/particles';
import WelcomeSection from '@/components/welcome-section';
import ConfessionSection from '@/components/confession-section';
import MemoriesSection from '@/components/memories-section';
import PromiseSection from '@/components/promise-section';
import ResponseSection from '@/components/response-section';
import NavigationDots from '@/components/navigation-dots';

export default function ApologyApp() {
  const [currentSection, setCurrentSection] = useState(0);
  const totalSections = 5;

  const sections = [
    'welcome',
    'confession',
    'memories',
    'promise',
    'response'
  ];

  const goToSection = (index: number) => {
    if (index >= 0 && index < totalSections) {
      setCurrentSection(index);
    }
  };

  const nextSection = () => {
    if (currentSection < totalSections - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const resetToStart = () => {
    setCurrentSection(0);
  };

  // Handle keyboard navigation and touch gestures
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' && currentSection < totalSections - 1) {
        goToSection(currentSection + 1);
      } else if (e.key === 'ArrowUp' && currentSection > 0) {
        goToSection(currentSection - 1);
      }
    };

    let startY = 0;
    let startX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
      startX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const endY = e.changedTouches[0].clientY;
      const endX = e.changedTouches[0].clientX;
      const diffY = startY - endY;
      const diffX = startX - endX;

      // Vertical swipe detection
      if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 50) {
        if (diffY > 0 && currentSection < totalSections - 1) {
          // Swipe up - next section
          goToSection(currentSection + 1);
        } else if (diffY < 0 && currentSection > 0) {
          // Swipe down - previous section
          goToSection(currentSection - 1);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentSection, totalSections]);

  return (
    <div className="font-inter gradient-bg min-h-screen overflow-x-hidden">
      <ParticlesBackground />
      
      <motion.div
        className="relative z-10"
        key={currentSection}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <WelcomeSection
          onStartJourney={nextSection}
          isVisible={currentSection === 0}
        />
        
        <ConfessionSection
          onShowMemories={nextSection}
          isVisible={currentSection === 1}
        />
        
        <MemoriesSection
          onShowPromise={nextSection}
          isVisible={currentSection === 2}
        />
        
        <PromiseSection
          onShowResponse={nextSection}
          onPlayAgain={resetToStart}
          isVisible={currentSection === 3}
        />
        
        <ResponseSection
          isVisible={currentSection === 4}
        />
      </motion.div>

      <NavigationDots
        currentSection={currentSection}
        totalSections={totalSections}
        onSectionChange={goToSection}
      />
    </div>
  );
}
