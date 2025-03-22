import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
  onLoadComplete?: () => void;
}

export function Loader({ onLoadComplete }: LoaderProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (onLoadComplete) onLoadComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onLoadComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-[#1b1b1c] z-50 flex items-center justify-center"
          exit={{
            opacity: 0,
            transition: { duration: 0.8, ease: [0.65, 0, 0.35, 1] }
          }}
        >
          <div className="relative flex items-center justify-center">
            <div className="red-dot animate-pulse"></div>
            <motion.div
              className="absolute h-40 w-px bg-white/20"
              initial={{ scaleY: 0, originY: 1 }}
              animate={{
                scaleY: 1,
                transition: {
                  delay: 0.5,
                  duration: 1.5,
                  ease: [0.65, 0, 0.35, 1]
                }
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
