"use client"

import { AnimatedLoader } from "@/components/magicui/AnimatedLoader"

export function LoadingState() {
  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl text-center space-y-6">
        <AnimatedLoader />
        <p className="text-white/60 text-base">Loading your results...</p>
      </div>
    </div>
  )
}

