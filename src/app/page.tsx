"use client"

import HeroSection from "@/components/hero"
import ChatInput from "@/components/prompt/input"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <HeroSection
        badge="Promptify"
        title1="Transform Your"
        title2="Website Ideas"
      />
      <div className="relative z-10 -mt-[14rem] pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <ChatInput />
        </motion.div>
      </div>
    </div>
  )
}
