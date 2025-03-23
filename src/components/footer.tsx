import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Function to generate a random delay for each letter animation
  const getRandomDelay = (): number => 0.3 + Math.random() * 0.7;

  // Animation variants for each letter
  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        delay: getRandomDelay(),
        ease: "easeOut",
      },
    }),
  };

  // Function to render animated letters
  const renderLetters = (text: string) => (
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
          custom={i} // Pass index as the custom prop
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );

  return (
    <footer className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden px-6 md:px-12">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/img3.jpg"
          alt="Footer Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-black/50"></div> {/* Dark Overlay */}
      </div>

      {/* Footer Content */}
      <div className="relative z-10 text-center text-white space-y-4 sm:space-y-6">
        <motion.h1
          className="didot text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-wide"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {renderLetters("LET'S CONNECT")}
        </motion.h1>

        <motion.p
          className="mt-3 sm:mt-4 text-lg sm:text-xl md:text-2xl opacity-0 px-4 sm:px-0"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          transition={{ delay: 1.5, duration: 1.5, ease: "easeOut" }}
        >
          Drop me a message and let's create something amazing.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 3, duration: 1.5 } }}
        >
          <Link
            href="/contact"
            className="inline-block py-3 px-6 border border-white text-white hover:bg-white hover:text-black transition-colors mt-4 sm:mt-6 text-base sm:text-lg"
          >
            Drop me a line
          </Link>
        </motion.div>
      </div>
    </footer>
  );
}
