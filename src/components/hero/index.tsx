"use client"

import { HeroBackground } from "./HeroBackground"
import { HeroBadge } from "./HeroBadge"
import { HeroTitle } from "./HeroTitle"
import { HeroDescription } from "./HeroDescription"

interface HeroGeometricProps {
  badge?: string
  title1?: string
  title2?: string
  description?: string
}

export default function HeroSection({
  badge = "Promptify",
  title1 = "Transform Your",
  title2 = "Website Ideas",
  description = "Describe your website idea and let AI generate comprehensive plans and strategies for you.",
}: HeroGeometricProps) {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
      },
    }),
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303]">
      <HeroBackground />

      <div className="relative z-10 container mx-auto px-4 md:px-6 -mt-[8rem]">
        <div className="max-w-3xl mx-auto text-center">
          <HeroBadge badge={badge} custom={0} variants={fadeUpVariants} />

          <HeroTitle title1={title1} title2={title2} custom={1} variants={fadeUpVariants} />

          <HeroDescription description={description} custom={2} variants={fadeUpVariants} />
        </div>
      </div>
    </div>
  )
}
