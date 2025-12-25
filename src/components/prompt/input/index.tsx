"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { WaveAnimation } from "./WaveAnimation"
import { RecordingControls } from "./RecordingControls"
import { InputControls } from "./InputControls"
import { InputTextarea } from "./InputTextarea"
import { AnimatedLoader } from "@/components/magicui/AnimatedLoader"

export default function ChatInput() {
  const [input, setInput] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const router = useRouter()

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Submit on Enter, but allow Shift+Enter for new lines
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (input.trim() && !isGenerating) {
        handleSubmit(e as any)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isGenerating) return

    setIsGenerating(true)

    try {
      const response = await fetch("/api/generate-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      })

      const data = await response.json()

      // Check for errors in response body
      if (!response.ok || data.error) {
        throw new Error(data.error || "Failed to generate prompt")
      }

      if (!data.id) {
        throw new Error("No prompt ID returned from server")
      }

      const promptId = data.id
      
      // If we have the full result in the response, store it in sessionStorage
      // as a backup in case the server store is cleared
      if (data.result) {
        try {
          sessionStorage.setItem(`prompt-${promptId}`, JSON.stringify(data.result))
        } catch (e) {
          console.warn("Could not store result in sessionStorage:", e)
        }
      }
      
      router.push(`/prompt/${promptId}`)
    } catch (error) {
      console.error("Error generating prompt:", error)
      const errorMessage = error instanceof Error ? error.message : "Failed to generate prompt. Please try again."
      alert(errorMessage)
      setIsGenerating(false)
    }
  }

  const handleMicClick = () => {
    setIsRecording(true)
    setTimeout(() => {
      setIsRecording(false)
      setInput("When speech to text feature ?")
    }, 5000)
  }

  const handleCancelRecording = () => {
    setIsRecording(false)
  }

  const handleConfirmRecording = () => {
    setIsRecording(false)
    setInput("When speech to text feature ?")
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Loader Overlay */}
      {isGenerating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#030303]/80 backdrop-blur-sm">
          <div className="w-full max-w-md px-4">
            <AnimatedLoader />
            <p className="text-center text-white/60 mt-4 text-sm">
              Generating your website plan...
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="relative">
        <div
          className="border border-zinc-700 rounded-2xl p-4 relative transition-all duration-500 ease-in-out overflow-hidden"
          style={{ backgroundColor: "#141415" }}
        >
          {isRecording ? (
            <div className="flex items-center justify-between h-12 w-full animate-fade-in">
              <WaveAnimation />
              <RecordingControls onCancel={handleCancelRecording} onConfirm={handleConfirmRecording} />
            </div>
          ) : (
            <div className="animate-fade-in">
              <InputTextarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isGenerating}
                autoFocus={true}
              />
              <InputControls
                onMicClick={handleMicClick}
                disabled={!input.trim()}
                isGenerating={isGenerating}
              />
            </div>
          )}
        </div>
      </form>
    </div>
  )
}
