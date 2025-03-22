"use client";

import { useState } from "react";
import { Loader } from "@/components/loader";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import Image from "next/image";

export default function MeetMePage() {
  const [loading, setLoading] = useState(true);

  const handleLoadComplete = () => {
    setLoading(false);
  };

  const letterAnimationVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + i * 0.05,
        duration: 0.8,
        ease: [0.33, 1, 0.68, 1]
      }
    })
  };

  const SplitText = ({ text, className }: { text: string; className?: string }) => {
    return (
      <div className={className}>
        {text.split('').map((char, i) => (
          <motion.span
            key={i}
            className="inline-block"
            custom={i}
            initial="initial"
            animate="animate"
            variants={letterAnimationVariants}
          >
            {char === ' ' ? '\u00A0' : char}
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

          <section className="relative w-full h-screen bg-[#1b1b1c] flex flex-col items-center justify-center overflow-hidden">
            <div className="vertical-lines">
              {[...Array(5)].map((_, i) => (
                <span key={i}></span>
              ))}
            </div>

            <div className="horizontal-lines">
              {[...Array(3)].map((_, i) => (
                <span key={i}></span>
              ))}
            </div>

            <div className="absolute inset-0 z-0">
              <Image
                src="url('/images/my.jpg')"
                alt="Honey Bhardwaj portrait"
                fill
                className="object-cover opacity-40"
                priority
              />
            </div>

            <div className="relative z-10 flex flex-col items-center space-y-12 px-4">
              <div className="absolute -left-24 top-1/2 -translate-y-1/2 rotate-90">
                <span className="bebas tracking-[0.2em] text-sm opacity-80">MEET ME</span>
              </div>

              <SplitText
                text="I'M HONEY"
                className="didot-bold text-center text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-wider"
              />
            </div>

            <motion.div
              className="absolute bottom-12 flex flex-col items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
            >
              <div className="h-12 w-px bg-primary"></div>
              <p className="muli text-xs uppercase tracking-widest text-primary">Scroll to explore</p>
            </motion.div>
          </section>

          <section className="relative w-full py-24 md:py-32 bg-[#1b1b1c]">
            <div className="container mx-auto px-6 md:px-8 max-w-4xl">
              <h2 className="didot text-4xl md:text-5xl mb-12 text-center">True story about Honey Bhardwaj</h2>

              <div className="muli text-lg space-y-6 max-w-3xl mx-auto">
                <p>
                 In the heart of Noida, Uttar Pradesh, I found my passion—not in books or classrooms, but in the real world, behind the camera. I wasn't born with a camera in my hand, but once I picked one up, I knew it was where I belonged.                </p>
                <p>
                It started with small moments—capturing a friend's smile, editing a simple video, experimenting with colors and light..
                </p>
                <p className="didot-bold text-2xl text-center mt-12 mb-12">
                
                </p>
                <p>
                  As a photographer, I've made it my mission to capture those authentic moments of love and connection. My approach is to create a comfortable, relaxed atmosphere that allows your true emotions to shine through.
                </p>
                <p>
                📸🎥 Let’s create something beautiful together.

                </p>
              </div>
            </div>
          </section>

          <Footer />
        </>
      )}
    </main>
  );
}
