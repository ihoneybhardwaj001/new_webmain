import { ReactNode, useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollIndicator } from "./scroll-indicator";

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
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);

  // Handle scroll events (Desktop)
  const handleScroll = useCallback(
    (event: WheelEvent) => {
      if (isScrolling.current) return;
      if (Math.abs(event.deltaY) < 20) return; // Ignore small scrolls

      isScrolling.current = true;
      if (event.deltaY > 0 && activeSection < sections.length - 1) {
        setActiveSection((prev) => prev + 1);
      } else if (event.deltaY < 0 && activeSection > 0) {
        setActiveSection((prev) => prev - 1);
      }

      event.preventDefault(); // Prevent normal scrolling

      setTimeout(() => {
        isScrolling.current = false;
      }, 900);
    },
    [activeSection, sections.length]
  );

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling.current) return;
      isScrolling.current = true;

      if (e.key === "ArrowDown" && activeSection < sections.length - 1) {
        setActiveSection((prev) => prev + 1);
      } else if (e.key === "ArrowUp" && activeSection > 0) {
        setActiveSection((prev) => prev - 1);
      } else {
        isScrolling.current = false;
        return;
      }

      setTimeout(() => {
        isScrolling.current = false;
      }, 900);
    };

    window.addEventListener("wheel", handleScroll, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleScroll, activeSection, sections.length]);

  // Handle touch gestures (Mobile)
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      touchEndY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      if (isScrolling.current) return;
      isScrolling.current = true;

      const deltaY = touchStartY.current - touchEndY.current;
      if (Math.abs(deltaY) > 50) {
        if (deltaY > 0 && activeSection < sections.length - 1) {
          setActiveSection((prev) => prev + 1);
        } else if (deltaY < 0 && activeSection > 0) {
          setActiveSection((prev) => prev - 1);
        }
      }

      setTimeout(() => {
        isScrolling.current = false;
      }, 900);
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [activeSection, sections.length]);

  // Scroll to the active section smoothly
  useEffect(() => {
    if (sectionRefs.current.length !== sections.length) {
      sectionRefs.current = new Array(sections.length).fill(null);
    }

    const currentSection = sectionRefs.current[activeSection];
    if (currentSection) {
      currentSection.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeSection, sections.length]);

  return (
    <>
      <ScrollIndicator
        totalSections={sections.length}
        activeSection={activeSection}
        onSectionClick={(index) => {
          if (index !== activeSection && !isScrolling.current) {
            setActiveSection(index);
          }
        }}
      />

      <div className="h-screen w-full overflow-hidden">
        {sections.map((section, index) => (
          <div
            key={section.id}
            ref={(el) => {
              sectionRefs.current[index] = el; // ✅ FIXED: Ensures ref does not return a value
            }}
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
