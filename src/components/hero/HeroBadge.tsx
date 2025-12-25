"use client"

import { motion } from "framer-motion"

interface HeroBadgeProps {
  badge: string
  custom?: number
  variants: {
    hidden: { opacity: number; y: number }
    visible: (i: number) => {
      opacity: number
      y: number
      transition: {
        duration: number
        delay: number
        ease: [number, number, number, number]
      }
    }
  }
}

export function HeroBadge({ badge, custom = 0, variants }: HeroBadgeProps) {
  return (
    <motion.div
      custom={custom}
      variants={variants}
      initial="hidden"
      animate="visible"
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 md:mb-12"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        fill="none"
        className="w-4 h-4"
      >
        <rect width="100" height="100" rx="20" fill="#141415" />
        <path
          d="M35 25 L35 75 M35 25 L55 25 L60 30 L60 45 L55 50 L35 50"
          stroke="#2DD4BF"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="65" cy="60" r="4" fill="#2DD4BF" />
      </svg>
      <span className="text-sm text-white/60 tracking-wide">{badge}</span>
    </motion.div>
  )
}

