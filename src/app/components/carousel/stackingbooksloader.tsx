import { motion } from "framer-motion";
import React from "react";
import { FaBook } from "react-icons/fa";

const bookVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      type: "spring",
      stiffness: 100,
      repeat: Infinity,
      repeatDelay: 1,
    },
  }), // Custom transition based on index
};

const bookColors = [
  "text-blue-500",
  "text-red-500",
  "text-green-500",
  "text-yellow-500",
  "text-purple-500",
];

export default function StackingBooksLoader() {
  return (
    <div className="flex flex-col items-center justify-center h-32 space-y-1">
      {/* {Animated books} */}
      <div className="relative flex flex-col items-center animate-bounce">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute bottom-0 ${bookColors[i % bookColors.length]}`}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={bookVariants}
          >
            <FaBook className="h-8 w-8" />
          </motion.div>
        ))}
      </div>

      {/* Loading text */}
      <p className="text-sm text-gray-500">
        Gathering top recommendations for you...
      </p>
    </div>
  );
}
