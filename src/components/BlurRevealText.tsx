import React from 'react';
import { motion } from 'motion/react';

interface BlurRevealTextProps {
  key?: React.Key;
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
  duration?: number;
  stagger?: number;
}

export default function BlurRevealText({
  text,
  className = "",
  delay = 0,
  once = true,
  duration = 0.5,
  stagger = 0.03,
}: BlurRevealTextProps) {
  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 12,
      filter: "blur(12px)",
      scale: 0.96,
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: {
        type: "spring",
        damping: 24,
        stiffness: 140,
        duration: duration,
      },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.1 }}
      className={`inline-block ${className}`}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={wordVariants}
          className="inline-block mr-[0.25em] whitespace-nowrap"
        >
          {word === "" ? "\u00A0" : word}
        </motion.span>
      ))}
    </motion.span>
  );
}
