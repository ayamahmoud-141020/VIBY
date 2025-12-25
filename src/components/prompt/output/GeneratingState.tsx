"use client"

import { AnimatedLoader } from "@/components/magicui/AnimatedLoader"

export function GeneratingState() {
  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-6">
        <AnimatedLoader />
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Generating Your Website Plan
          </h2>
          <p className="text-white/60 text-base">
            Our AI is analyzing your idea and creating comprehensive plans...
          </p>
        </div>
      </div>
    </div>
  )
}

