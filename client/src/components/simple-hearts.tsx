import { useEffect, useRef } from 'react';

export default function SimpleHearts() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createHeart = () => {
      const heart = document.createElement('div');
      heart.innerHTML = '💕';
      heart.style.position = 'absolute';
      heart.style.left = Math.random() * 100 + '%';
      heart.style.bottom = '-50px';
      heart.style.fontSize = Math.random() * 8 + 16 + 'px';
      heart.style.pointerEvents = 'none';
      heart.style.zIndex = '1';
      heart.style.opacity = '0.6';
      
      const animationDuration = Math.random() * 4000 + 6000;
      
      heart.animate([
        { 
          transform: `translateY(0) rotate(0deg)`, 
          opacity: 0.6 
        },
        { 
          transform: `translateY(-110vh) rotate(360deg)`, 
          opacity: 0 
        }
      ], {
        duration: animationDuration,
        easing: 'ease-out'
      });
      
      container.appendChild(heart);
      
      setTimeout(() => {
        if (heart.parentNode) {
          heart.parentNode.removeChild(heart);
        }
      }, animationDuration);
    };

    // Create hearts less frequently
    const interval = setInterval(createHeart, 4000);
    
    return () => {
      clearInterval(interval);
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-1" />;
}