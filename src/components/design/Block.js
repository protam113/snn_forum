import React from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

const Block = ({ className, ...rest }) => {
  return (
    <motion.div
      variants={{
        initial: {
          scale: 0.5,
          y: 50,
          opacity: 0,
        },
        animate: {
          scale: 1,
          y: 0,
          opacity: 1,
        },
      }}
      transition={{
        type: "spring",
        mass: 3,
        stiffness: 400,
        damping: 50,
      }}
      className={twMerge("rounded-lg ", className)}
      {...rest}
    />
  );
};

export default Block;
