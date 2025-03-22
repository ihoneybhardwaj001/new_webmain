import { ReactNode, useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollIndicator } from './scroll-indicator';

interface Section {
  id: string;
  component: ReactNode;
}

interface FullPageScrollProps {
  sections: Section[];
}

export function FullPageScroll({ sections }: FullPageScrollProps) {
  const [activeSection, setActiveSection] = useState(0);
  const isScrolling = useRef(false);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>(new Array(sections.length).fill(null));

  const handleScroll = useCallback((event: WheelEvent) => {
    if (isScrolling.current) return;
    
    // Ignore small scrolls
    if (Math.abs(event.deltaY) < 20) return;

    isScrolling.current = true;
    if (event.deltaY > 0 && activeSection < sections.length - 1) {
      setActiveSection((prev) => prev + 1);
    } else if (event.deltaY < 0 && activeSection > 0) {
      setActiveSection((prev) => prev - 1);
    }

    event.preventDefault(); // Prevent normal scrolling

    setTimeout(() => {
      isScrolling.current = false;
    }, 900); // Increase delay slightly to prevent double triggers
  }, [activeSection, sections.length]);

  const handleSectionClick = (index: number) => {
    if (index !== activeSection && !isScrolling.current) {
      setActiveSection(index);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling.current) return;
      isScrolling.current = true;

      if (e.key === 'ArrowDown' && activeSection < sections.length - 1) {
        setActiveSection((prev) => prev + 1);
      } else if (e.key === 'ArrowUp' && activeSection > 0) {
        setActiveSection((prev) => prev - 1);
      } else {
        isScrolling.current = false;
        return;
      }

      setTimeout(() => {
        isScrolling.current = false;
      }, 900);
    };

    window.addEventListener('wheel', handleScroll, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleScroll, activeSection]);

  useEffect(() => {
    const currentSection = sectionRefs.current[activeSection];
    if (currentSection) {
      currentSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeSection]);

  return (
    <>
      <ScrollIndicator
        totalSections={sections.length}
        activeSection={activeSection}
        onSectionClick={handleSectionClick}
      />

      <div className="h-screen w-full overflow-hidden">
        {sections.map((section, index) => (
          <div
            key={section.id}
            ref={(el) => (sectionRefs.current[index] = el)}
            className="h-screen w-full flex items-center justify-center"
          >
            <AnimatePresence mode="wait">
              {index === activeSection && (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5 }}
                  className="h-full w-full"
                >
                  {section.component}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </>
  );
}
