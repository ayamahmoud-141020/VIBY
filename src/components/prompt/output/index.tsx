"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { LoadingState } from "./LoadingState"
import { ErrorState } from "./ErrorState"
import { GeneratingState } from "./GeneratingState"
import { PromptResultsHeader } from "./PromptResultsHeader"
import { PlanCard } from "./PlanCard"

interface Plan {
  id: string
  title: string
  description: string
  steps?: string[]
  features?: string[]
  technologies?: string[]
  timeline?: string
}

interface PromptResult {
  id: string
  prompt: string
  plans: Plan[]
  status: "generating" | "completed" | "error"
  error?: string
}

interface PromptResultsProps {
  promptId: string
}

export function PromptResults({ promptId }: PromptResultsProps) {
  const [result, setResult] = useState<PromptResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // First, check sessionStorage as a backup
    const checkSessionStorage = () => {
      try {
        const stored = sessionStorage.getItem(`prompt-${promptId}`)
        if (stored) {
          const data = JSON.parse(stored)
          const validatedData = {
            ...data,
            plans: Array.isArray(data.plans) ? data.plans : []
          }
          setResult(validatedData)
          setIsLoading(false)
          return true
        }
      } catch (e) {
        console.warn("Error reading from sessionStorage:", e)
      }
      return false
    }

    const pollForUpdates = async () => {
      const interval = setInterval(async () => {
        try {
          const response = await fetch(`/api/prompt/${promptId}`)
          if (response.ok) {
            const data = await response.json()
            
            // Ensure plans is an array
            const validatedData = {
              ...data,
              plans: Array.isArray(data.plans) ? data.plans : []
            }
            
            // Store in sessionStorage as backup
            try {
              sessionStorage.setItem(`prompt-${promptId}`, JSON.stringify(validatedData))
            } catch (e) {
              console.warn("Could not store in sessionStorage:", e)
            }
            
            setResult(validatedData)
            setIsLoading(false)
            
            if (validatedData.status !== "generating") {
              clearInterval(interval)
            }
          } else if (response.status === 404) {
            // Still generating, keep polling
            console.log("Result not ready yet, continuing to poll...")
          } else {
            // Error occurred
            clearInterval(interval)
            setIsLoading(false)
            setResult({
              id: promptId,
              prompt: "",
              status: "error",
              plans: [],
              error: "Failed to fetch result"
            })
          }
        } catch (error) {
          console.error("Error polling:", error)
          // Don't clear interval on network errors, keep trying
        }
      }, 2000) // Poll every 2 seconds

      return () => clearInterval(interval)
    }

    const fetchResult = async () => {
      // Check sessionStorage first
      if (checkSessionStorage()) {
        // If we have it in sessionStorage, still try to fetch from server to get latest
        // but don't show loading state
        fetch(`/api/prompt/${promptId}`)
          .then(res => res.ok ? res.json() : null)
          .then(data => {
            if (data) {
              const validatedData = {
                ...data,
                plans: Array.isArray(data.plans) ? data.plans : []
              }
              setResult(validatedData)
              try {
                sessionStorage.setItem(`prompt-${promptId}`, JSON.stringify(validatedData))
              } catch (e) {}
            }
          })
          .catch(() => {})
        return
      }

      try {
        const response = await fetch(`/api/prompt/${promptId}`)
        
        if (response.status === 404) {
          // Result not ready yet, start polling
          console.log("Result not found, starting to poll...")
          pollForUpdates()
          return
        }
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.error || "Failed to fetch prompt result")
        }
        
        const data = await response.json()
        
        // Validate data structure
        if (!data || !data.id) {
          console.error("Invalid data structure:", data)
          throw new Error("Invalid response structure")
        }
        
        // Ensure plans is an array
        const validatedData = {
          ...data,
          plans: Array.isArray(data.plans) ? data.plans : []
        }
        
        // Store in sessionStorage as backup
        try {
          sessionStorage.setItem(`prompt-${promptId}`, JSON.stringify(validatedData))
        } catch (e) {
          console.warn("Could not store in sessionStorage:", e)
        }
        
        setResult(validatedData)
        setIsLoading(false)

        // If still generating, start polling
        if (validatedData.status === "generating") {
          pollForUpdates()
        }
      } catch (error) {
        console.error("Error fetching result:", error)
        // If it's a 404, start polling (result might not be ready yet)
        if (error instanceof Error && error.message.includes("not found")) {
          console.log("Result not ready, starting to poll...")
          pollForUpdates()
        } else {
          setResult({
            id: promptId,
            prompt: "",
            status: "error",
            plans: [],
            error: error instanceof Error ? error.message : "Failed to load results"
          })
          setIsLoading(false)
        }
      }
    }

    fetchResult()
  }, [promptId])

  if (isLoading) {
    return <LoadingState />
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-[#030303] flex items-center justify-center">
        <div className="text-center space-y-4">
          <ErrorState error="Failed to load results" />
        </div>
      </div>
    )
  }

  if (result.status === "generating") {
    return <GeneratingState />
  }

  if (result.status === "error") {
    return <ErrorState error={result.error} />
  }

  return (
    <div className="min-h-screen bg-[#030303] p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <PromptResultsHeader prompt={result.prompt} />

        <div className="space-y-6">
          {result.plans.map((plan, index) => (
            <PlanCard key={plan.id} plan={plan} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}
