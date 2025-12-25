"use client"

import { useState, useEffect } from "react"

export function WaveAnimation() {
  const [animationKey, setAnimationKey] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationKey((prev) => prev + 1)
    }, 100)

    return () => clearInterval(interval)
  }, [])

  const bars = Array.from({ length: 50 }, (_, i) => {
    const height = Math.random() * 20 + 4
    const delay = Math.random() * 2

    return (
      <div
        key={`${i}-${animationKey}`}
        className="bg-gray-400 rounded-sm animate-pulse"
        style={{
          width: "2px",
          height: `${height}px`,
          animationDelay: `${delay}s`,
          animationDuration: "1s",
        }}
      />
    )
  })

  return (
    <div className="flex items-center w-full gap-1">
      <div className="flex-1 border-t-2 border-dotted border-gray-500"></div>
      <div className="flex items-center gap-0.5 justify-center px-8">{bars}</div>
      <div className="flex-1 border-t-2 border-dotted border-gray-500"></div>
    </div>
  )
}

