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
    let isScrolling = false;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only respond to Page Down/Up and Space, not arrow keys for better control
      if (e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey)) {
        e.preventDefault();
        if (currentSection < totalSections - 1) {
          goToSection(currentSection + 1);
        }
      } else if (e.key === 'PageUp' || (e.key === ' ' && e.shiftKey)) {
        e.preventDefault();
        if (currentSection > 0) {
          goToSection(currentSection - 1);
        }
      }
    };

    // Disable regular scroll behavior and use wheel events with throttling
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      if (isScrolling) return;
      
      const threshold = 100; // Increased threshold for less sensitivity
      
      if (Math.abs(e.deltaY) > threshold) {
        isScrolling = true;
        
        if (e.deltaY > 0 && currentSection < totalSections - 1) {
          // Scroll down - next section
          goToSection(currentSection + 1);
        } else if (e.deltaY < 0 && currentSection > 0) {
          // Scroll up - previous section
          goToSection(currentSection - 1);
        }
        
        // Reset scrolling flag after delay
        setTimeout(() => {
          isScrolling = false;
        }, 800);
      }
    };

    let startY = 0;
    let startX = 0;
    let isTouching = false;

    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
      startX = e.touches[0].clientX;
      isTouching = true;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isTouching) return;
      
      const endY = e.changedTouches[0].clientY;
      const endX = e.changedTouches[0].clientX;
      const diffY = startY - endY;
      const diffX = startX - endX;

      // Increased threshold for less sensitive touch detection
      if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 80) {
        if (diffY > 0 && currentSection < totalSections - 1) {
          // Swipe up - next section
          goToSection(currentSection + 1);
        } else if (diffY < 0 && currentSection > 0) {
          // Swipe down - previous section
          goToSection(currentSection - 1);
        }
      }
      
      isTouching = false;
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('wheel', handleWheel);
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
