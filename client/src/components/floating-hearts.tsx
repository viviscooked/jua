import { useEffect, useRef } from 'react';

export default function FloatingHearts() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const hearts = ['💖', '💕', '💓', '💗', '🌸', '🦋', '✨', '🌟'];

    const createHeart = () => {
      const heart = document.createElement('div');
      heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
      heart.style.position = 'absolute';
      heart.style.left = Math.random() * 100 + '%';
      heart.style.bottom = '-50px';
      heart.style.fontSize = Math.random() * 10 + 15 + 'px';
      heart.style.pointerEvents = 'none';
      heart.style.zIndex = '5';
      heart.style.userSelect = 'none';
      
      const animationDuration = Math.random() * 3000 + 4000;
      const horizontalMovement = (Math.random() - 0.5) * 100;
      
      heart.animate([
        { 
          transform: `translateY(0) translateX(0) rotate(0deg)`, 
          opacity: 1 
        },
        { 
          transform: `translateY(-100vh) translateX(${horizontalMovement}px) rotate(360deg)`, 
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

    // Create hearts periodically
    const interval = setInterval(createHeart, 2000);
    
    return () => {
      clearInterval(interval);
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-5" />;
}