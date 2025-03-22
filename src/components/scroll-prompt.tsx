import { motion } from 'framer-motion';

interface ScrollPromptProps {
  onClick?: () => void;
}

export function ScrollPrompt({ onClick }: ScrollPromptProps) {
  return (
    <motion.div
      className="absolute bottom-12 flex flex-col items-center gap-2 cursor-pointer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
      onClick={onClick}
    >
      <motion.div
        className="h-12 w-px bg-primary"
        animate={{
          scaleY: [1, 1.2, 1],
          originY: 0
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      ></motion.div>
      <p className="text-xs uppercase tracking-widest text-primary">Scroll to explore</p>
    </motion.div>
  );
}
