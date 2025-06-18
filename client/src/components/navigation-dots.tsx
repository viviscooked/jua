import { motion } from 'framer-motion';

interface NavigationDotsProps {
  currentSection: number;
  totalSections: number;
  onSectionChange: (index: number) => void;
}

export default function NavigationDots({ currentSection, totalSections, onSectionChange }: NavigationDotsProps) {
  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-20 hidden md:flex flex-col space-y-3">
      {Array.from({ length: totalSections }, (_, index) => (
        <motion.div
          key={index}
          className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
            index === currentSection ? 'bg-white' : 'bg-white/30 hover:bg-white'
          }`}
          onClick={() => onSectionChange(index)}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        />
      ))}
    </div>
  );
}
