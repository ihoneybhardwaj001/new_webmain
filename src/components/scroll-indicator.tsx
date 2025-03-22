import { motion } from 'framer-motion';

interface ScrollIndicatorProps {
  totalSections: number;
  activeSection: number;
  onSectionClick: (index: number) => void;
}

export function ScrollIndicator({ totalSections, activeSection, onSectionClick }: ScrollIndicatorProps) {
  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
      {Array.from({ length: totalSections }).map((_, index) => (
        <button
          key={index}
          onClick={() => onSectionClick(index)}
          className="w-3 h-3 relative rounded-full focus:outline-none"
          aria-label={`Go to section ${index + 1}`}
        >
          <span className={`block w-2 h-2 rounded-full bg-white/30 transition-opacity ${
            activeSection === index ? 'opacity-0' : 'opacity-100'
          }`}></span>

          {activeSection === index && (
            <motion.span
              layoutId="activeDot"
              className="absolute top-0 left-0 w-3 h-3 bg-primary rounded-full"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </button>
      ))}
    </div>
  );
}
