"use client";

import { useState } from "react";
import { Loader } from "@/components/loader";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AllStoriesPage() {
  const [loading, setLoading] = useState(true);

  const handleLoadComplete = () => {
    setLoading(false);
  };

  const letterAnimationVariants = {
    initial: { opacity: 0, y: 20 },
    animate: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + i * 0.05,
        duration: 0.8,
        ease: [0.33, 1, 0.68, 1],
      },
    }),
  };

  const SplitText = ({ text, className }) => {
    return (
      <div className={className}>
        {text.split("").map((char, i) => (
          <motion.span
            key={i}
            className="inline-block"
            custom={i}
            initial="initial"
            animate="animate"
            variants={letterAnimationVariants}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </div>
    );
  };

  return (
    <main className="relative">
      <Loader onLoadComplete={handleLoadComplete} />

      {!loading && (
        <>
          <Navbar />

          {/* Background Image Section with Slow Zoom Effect */}
          <section className="relative w-full h-screen bg-[#1b1b1c] flex flex-col items-center justify-center overflow-hidden">
            <motion.div
              className="absolute inset-0 z-0"
              initial={{ scale: 1 }}
              animate={{ scale: 1.1 }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            >
              <Image
                src="/images/story-1.jpg"
                alt="All Stories Background"
                fill
                className="object-cover opacity-40"
                priority
              />
            </motion.div>

            <div className="relative z-10 flex flex-col items-center space-y-12 px-4">
              <SplitText
                text="ALL STORIES"
                className="didot-bold text-center text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-wider"
              />
            </div>
          </section>

          {/* Story Grid Section */}
          <section className="relative w-full py-24 md:py-32 bg-[#1b1b1c]">
            <div className="container mx-auto px-6 md:px-8 max-w-5xl">
              <h2 className="didot text-4xl md:text-5xl mb-12 text-center">
                Discover My Stories
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="relative group overflow-hidden rounded-lg shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.05, rotateY: 10 }}
                  >
                    <div className="relative w-full h-96 overflow-hidden rounded-lg">
                      <motion.div
                        className="w-full h-full"
                        whileHover={{ scale: 1.15 }} // Zoom-in effect
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                      >
                        <Image
                          src={`/images/story-${i + 1}.jpg`}
                          alt={`Story ${i + 1}`}
                          width={500}
                          height={300}
                          className="w-full h-full object-cover transition-transform duration-500"
                          onError={(e) => {
                            e.target.src = "/images/placeholder.jpg";
                          }}
                        />
                      </motion.div>
                    </div>
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <motion.p
                        className="text-white text-lg font-semibold tracking-wide group-hover:text-glow"
                        whileHover={{ scale: 1.2 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      >
                        Story {i + 1}
                      </motion.p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <Footer />
        </>
      )}
    </main>
  );
}
