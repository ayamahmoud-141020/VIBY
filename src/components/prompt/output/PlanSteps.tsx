"use client"

interface PlanStepsProps {
  steps: string[]
}

export function PlanSteps({ steps }: PlanStepsProps) {
  if (!steps || steps.length === 0) return null

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-white mb-3">Implementation Steps</h3>
      <ul className="space-y-2">
        {steps.map((step, stepIndex) => (
          <li key={stepIndex} className="flex items-start gap-3 text-white/70">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm font-semibold mt-0.5">
              {stepIndex + 1}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

