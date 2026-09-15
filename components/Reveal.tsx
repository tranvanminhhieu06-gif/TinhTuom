"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/* Fade-up dùng chung toàn trang.
   Biên độ y giữ nhỏ (14px) để đọc ra là "hiện dần", không phải "trượt vào".
   once: true — nội dung đã hiện thì không ẩn lại khi cuộn ngược. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Cho phép trễ nhịp khi xếp cạnh nhiều khối cùng lúc */
  delay?: number;
  as?: "div" | "section" | "li" | "article" | "header" | "ol" | "ul";
};

export default function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  // prefers-reduced-motion: dựng thẳng trạng thái cuối, không hoạt hình.
  if (reduce) return <MotionTag className={className}>{children}</MotionTag>;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      variants={{
        hidden: { opacity: 0, y: 14 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </MotionTag>
  );
}

/** Bọc danh sách để các con hiện lần lượt. Con dùng variants={fadeUp}. */
export function RevealGroup({
  children,
  className,
  as = "div",
}: Omit<RevealProps, "delay">) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  if (reduce) return <MotionTag className={className}>{children}</MotionTag>;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={stagger}
    >
      {children}
    </MotionTag>
  );
}
