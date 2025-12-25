"use client"

import { useRouter } from "next/navigation"
import { AlertCircle } from "lucide-react"

interface ErrorStateProps {
  error?: string
}

export function ErrorState({ error }: ErrorStateProps) {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-rose-500/10 border border-rose-500/20 mb-4">
          <AlertCircle className="h-10 w-10 text-rose-400" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Generation Failed
          </h2>
          <p className="text-white/60 text-base">
            {error || "An error occurred while generating your plan"}
          </p>
        </div>
        <button
          onClick={() => router.push("/")}
          className="px-6 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white hover:bg-zinc-700 hover:border-zinc-600 transition-all duration-200 font-medium"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}

