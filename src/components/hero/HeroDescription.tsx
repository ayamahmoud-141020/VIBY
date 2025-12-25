"use client"

import { motion } from "framer-motion"

interface HeroDescriptionProps {
  description: string
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

export function HeroDescription({ description, custom = 2, variants }: HeroDescriptionProps) {
  return (
    <motion.div custom={custom} variants={variants} initial="hidden" animate="visible">
      <p className="text-base sm:text-lg md:text-xl text-white/40 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
        {description}
      </p>
    </motion.div>
  )
}

