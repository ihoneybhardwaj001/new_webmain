import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ScrollPrompt } from "./scroll-prompt";

interface HeroProps {
  onScrollClick?: () => void;
}

export function Hero({ onScrollClick }: HeroProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const letterVariants = {
    hidden: (i: number) => ({
      opacity: 0,
      y: i % 2 === 0 ? -100 : 100, 
      scale: 0.5, 
    }),
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1, 
        delay: i * 0.08, 
        ease: "easeOut",
      },
    }),
  };

  const sentenceVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 2, duration: 1.2, ease: "easeOut" },
    },
  };

  const renderText = (text: string) => (
    <motion.div
      className="inline-flex whitespace-nowrap"
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
      {text.split("").map((letter, i) => (
        <motion.span
          key={i}
          className="inline-flex"
          variants={letterVariants}
          custom={i}
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );

  return (
    <section
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-cover bg-center px-6"
      style={{ backgroundImage: `url('/images/img.jpg')` }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="absolute top-0 left-0 w-full h-full grid grid-cols-5">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-full border-r border-white/10 relative">
            {i === 0 && <div className="absolute left-0 top-0 h-full border-l border-white/10"></div>}
          </div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center text-center text-white space-y-3">
        <motion.h1 className="didot text-6xl sm:text-7xl md:text-8xl tracking-wide">
          {renderText("HONEY BHARDWAJ TO")}
        </motion.h1>
        <motion.h2 className="didot text-6xl sm:text-7xl md:text-8xl tracking-wide">
          {renderText("HB PHOYOGRAPHY")}
        </motion.h2>

        <motion.p
          className="mt-4 text-xl sm:text-2xl opacity-0"
          variants={sentenceVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          Capturing the moments that tell your story.
        </motion.p>
      </div>

      <ScrollPrompt onClick={onScrollClick} />
    </section>
  );
}
