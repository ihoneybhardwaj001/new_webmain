import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function AboutSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.4,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
    },
  };

  const headingVariants = {
    hidden: { opacity: 0, y: 20, letterSpacing: "0.1em" },
    visible: {
      opacity: 1,
      y: 0,
      letterSpacing: "0em",
      transition: { duration: 1, ease: [0.25, 1, 0.5, 1] },
    },
  };

  return (
    <section id="about" ref={sectionRef} className="relative w-full min-h-screen flex items-center justify-center text-white">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('/images/home6.jpg')` }}></div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content Container */}
      <div className="container mx-auto px-8 max-w-6xl relative z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Left Section - About Text */}
          <motion.div variants={textVariants} className="space-y-6">
            <motion.h2 variants={headingVariants} className="didot text-3xl md:text-4xl">
              About
            </motion.h2>
            <motion.div variants={textVariants} className="space-y-4">
              {[
                "I'm Honey Bhardwaj, a passionate photographer and cinematographer from Noida, Uttar Pardesh. My journey began with a simple curiosity about capturing the world around me.",
                "Wherever I went, I met incredible people, and the stunning observation was that, despite our evident differences, we all share one specific trait.",
              ].map((text, index) => (
                <p key={index} className="text-base leading-relaxed">{text}</p>
              ))}
              <p className="didot-bold text-xl">Everyone, regardless of their origin, falls in love.</p>
            </motion.div>
          </motion.div>

          {/* Right Section - Upcoming Travel */}
          <motion.div variants={textVariants} className="space-y-6">
            <motion.h2 variants={headingVariants} className="didot text-3xl md:text-4xl">
              Upcoming Projects
            </motion.h2>
            <motion.ul className="space-y-2">
              {[""].map((place, index) => (
                <motion.li key={index} variants={textVariants} className="text-base leading-relaxed">
                  {place}
                </motion.li>
              ))}
            </motion.ul>
            <motion.p variants={textVariants} className="italic">
              more coming soon...
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
