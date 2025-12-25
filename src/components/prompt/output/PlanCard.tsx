"use client"

import { motion } from "framer-motion"
import { PlanSteps } from "./PlanSteps"
import { PlanFeatures } from "./PlanFeatures"
import { PlanTechnologies } from "./PlanTechnologies"
import { PlanTimeline } from "./PlanTimeline"

interface Plan {
  id: string
  title: string
  description: string
  steps?: string[]
  features?: string[]
  technologies?: string[]
  timeline?: string
}

interface PlanCardProps {
  plan: Plan
  index: number
}

export function PlanCard({ plan, index }: PlanCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 md:p-8 backdrop-blur-xl"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
        {plan.title}
      </h2>
      <p className="text-white/80 mb-6 leading-relaxed">
        {plan.description}
      </p>

      {plan.steps && <PlanSteps steps={plan.steps} />}
      {plan.features && <PlanFeatures features={plan.features} />}
      {plan.technologies && <PlanTechnologies technologies={plan.technologies} />}
      {plan.timeline && <PlanTimeline timeline={plan.timeline} />}
    </motion.div>
  )
}

