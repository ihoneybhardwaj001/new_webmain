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
          <div className="relative flex items-center justify-center w-full h-full">
            {/* Red dot pulse */}
            <div className="red-dot animate-pulse"></div>

            {/* Line animation that grows upwards and downwards */}
            <motion.div
              className="absolute top-1/2 left-1/2 bg-white/20"
              initial={{ width: 0, height: 0, y: '-50%' }}
              animate={{
                width: 2,
                height: '200%',
                y: '-50%',  // Start from the center
                transition: {
                  delay: 0.5,
                  duration: 2.5, // Slower line animation
                  ease: [0.65, 0, 0.35, 1]
                }
              }}
            />

            {/* "HB" Name Animation */}
            <motion.div
              className="absolute flex text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white font-bold"
              initial={{ opacity: 0, scale: 0.5, y: -20 }}
              animate={{
                opacity: 1,
                scale: 1.5,
                y: 0,
                transition: {
                  delay: 0.5,
                  duration: 2, // Slower text scale animation
                  ease: [0.65, 0, 0.35, 1]
                }
              }}
            >
              {/* H stays in center first, then moves left */}
              <motion.span
                className="mr-2"
                initial={{ x: 0 }}
                animate={{
                  x: ['0', '-50vw'], // Start in the center, then move to the left
                  transition: { 
                    duration: 2.5, // Slower movement for H
                    ease: [0.65, 0, 0.35, 1], 
                    delay: 1 // Slight delay before starting to move
                  }
                }}
              >
                H
              </motion.span>

              {/* B stays in center first, then moves right */}
              <motion.span
                initial={{ x: 0 }}
                animate={{
                  x: ['0', '50vw'], // Start in the center, then move to the right
                  transition: { 
                    duration: 2.5, // Slower movement for B
                    ease: [0.65, 0, 0.35, 1], 
                    delay: 1 // Slight delay before starting to move
                  }
                }}
              >
                B
              </motion.span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
