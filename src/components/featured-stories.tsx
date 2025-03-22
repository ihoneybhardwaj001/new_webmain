import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function FeaturedStories() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      id="featured-stories"
      ref={sectionRef}
      className="relative w-full h-screen flex items-center justify-center"
    >
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60"
        >
          <source src="/videos/videoh.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Title */}
      <motion.h2
        className="relative z-10 text-4xl md:text-6xl font-bold text-white text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      >
        
      </motion.h2>
    </section>
  );
}
