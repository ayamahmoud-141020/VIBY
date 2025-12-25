"use client"

import { motion } from "framer-motion"
import { Pacifico } from "next/font/google"
import { cn } from "@/lib/utils"

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
})

interface HeroTitleProps {
  title1: string
  title2: string
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

export function HeroTitle({ title1, title2, custom = 1, variants }: HeroTitleProps) {
  return (
    <motion.div custom={custom} variants={variants} initial="hidden" animate="visible">
      <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight">
        <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
          {title1}
        </span>
        <br />
        <span
          className={cn(
            "bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300 ",
            pacifico.className,
          )}
        >
          {title2}
        </span>
      </h1>
    </motion.div>
  )
}

