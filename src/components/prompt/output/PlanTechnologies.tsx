"use client"

interface PlanTechnologiesProps {
  technologies: string[]
}

export function PlanTechnologies({ technologies }: PlanTechnologiesProps) {
  if (!technologies || technologies.length === 0) return null

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-white mb-3">Recommended Technologies</h3>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech, techIndex) => (
          <span
            key={techIndex}
            className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-sm"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  )
}

