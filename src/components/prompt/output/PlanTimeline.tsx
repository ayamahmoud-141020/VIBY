"use client"

interface PlanTimelineProps {
  timeline: string
}

export function PlanTimeline({ timeline }: PlanTimelineProps) {
  if (!timeline) return null

  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-2">Estimated Timeline</h3>
      <p className="text-white/70">{timeline}</p>
    </div>
  )
}

