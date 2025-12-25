"use client"

import { CheckCircle2 } from "lucide-react"

interface PlanFeaturesProps {
  features: string[]
}

export function PlanFeatures({ features }: PlanFeaturesProps) {
  if (!features || features.length === 0) return null

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-white mb-3">Key Features</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {features.map((feature, featureIndex) => (
          <div
            key={featureIndex}
            className="flex items-center gap-2 text-white/70"
          >
            <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0" />
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

