"use client"

import { forwardRef, useRef } from "react"
import { cn } from "@/lib/utils"
import { AnimatedBeam } from "./AnimatedBeam"
import { Sparkles } from "lucide-react"

const Circle = forwardRef<HTMLDivElement, { className?: string; children?: React.ReactNode }>(
  ({ className, children }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-[#141415] border-zinc-700 p-3 shadow-[0_0_20px_-12px_rgba(255,255,255,0.1)]",
          className,
        )}
      >
        {children}
      </div>
    )
  },
)

Circle.displayName = "Circle"

export function AnimatedLoader() {
  const containerRef = useRef<HTMLDivElement>(null)
  const div1Ref = useRef<HTMLDivElement>(null)
  const div2Ref = useRef<HTMLDivElement>(null)
  const div3Ref = useRef<HTMLDivElement>(null)
  const div4Ref = useRef<HTMLDivElement>(null)
  const div5Ref = useRef<HTMLDivElement>(null)
  const div6Ref = useRef<HTMLDivElement>(null)
  const div7Ref = useRef<HTMLDivElement>(null)

  return (
    <div
      className="relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-lg p-10"
      ref={containerRef}
    >
      <div className="flex size-full max-h-[200px] max-w-lg flex-col items-stretch justify-between gap-10">
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div1Ref}>
            <Sparkles className="h-6 w-6 text-indigo-400" />
          </Circle>
          <Circle ref={div5Ref}>
            <Sparkles className="h-6 w-6 text-rose-400" />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div2Ref}>
            <Sparkles className="h-6 w-6 text-violet-400" />
          </Circle>
          <Circle ref={div4Ref} className="size-16 border-indigo-500/50">
            <Sparkles className="h-8 w-8 text-indigo-300" />
          </Circle>
          <Circle ref={div6Ref}>
            <Sparkles className="h-6 w-6 text-amber-400" />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div3Ref}>
            <Sparkles className="h-6 w-6 text-cyan-400" />
          </Circle>
          <Circle ref={div7Ref}>
            <Sparkles className="h-6 w-6 text-rose-300" />
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div4Ref}
        curvature={-75}
        endYOffset={-10}
        gradientStartColor="#6366f1"
        gradientStopColor="#ec4899"
        pathColor="#6366f1"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div4Ref}
        gradientStartColor="#8b5cf6"
        gradientStopColor="#ec4899"
        pathColor="#8b5cf6"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div4Ref}
        curvature={75}
        endYOffset={10}
        gradientStartColor="#06b6d4"
        gradientStopColor="#ec4899"
        pathColor="#06b6d4"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div4Ref}
        curvature={-75}
        endYOffset={-10}
        reverse
        gradientStartColor="#ec4899"
        gradientStopColor="#6366f1"
        pathColor="#ec4899"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div4Ref}
        reverse
        gradientStartColor="#f59e0b"
        gradientStopColor="#ec4899"
        pathColor="#f59e0b"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div7Ref}
        toRef={div4Ref}
        curvature={75}
        endYOffset={10}
        reverse
        gradientStartColor="#ec4899"
        gradientStopColor="#6366f1"
        pathColor="#ec4899"
      />
    </div>
  )
}

