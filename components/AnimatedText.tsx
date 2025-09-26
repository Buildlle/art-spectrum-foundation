// components/AnimatedText.tsx
"use client";

import { motion } from "framer-motion";
import { ReactNode, ElementType } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: ElementType;
};

export const AnimatedText = ({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: Props) => {
  const MotionTag = motion.create(Tag);

  return (
    <MotionTag
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      className={className}
    >
      {children}
    </MotionTag>
  );
};
