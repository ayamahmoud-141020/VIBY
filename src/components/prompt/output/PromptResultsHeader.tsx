"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { ArrowLeft, CheckCircle2 } from "lucide-react"

interface PromptResultsHeaderProps {
  prompt: string
}

export function PromptResultsHeader({ prompt }: PromptResultsHeaderProps) {
  const router = useRouter()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <button
        onClick={() => router.push("/")}
        className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-6"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Back to Home</span>
      </button>

      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-white/60">
          <CheckCircle2 className="h-5 w-5 text-green-500" />
          <span>Generation Complete</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-white">
          Your Website Plan
        </h1>
        <p className="text-lg text-white/60 max-w-2xl">
          {prompt}
        </p>
      </div>
    </motion.div>
  )
}

