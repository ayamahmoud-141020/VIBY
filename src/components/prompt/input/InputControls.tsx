"use client"

import { Button } from "@/components/ui/button"
import { Plus, ArrowUp, Settings2, Mic } from "lucide-react"

interface InputControlsProps {
  onMicClick: () => void
  disabled: boolean
  isGenerating: boolean
}

export function InputControls({ onMicClick, disabled, isGenerating }: InputControlsProps) {
  return (
    <div className="flex items-center justify-between mt-8">
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-white hover:text-white hover:bg-zinc-700 rounded-lg transition-all duration-200 hover:scale-110"
        >
          <Plus className="h-5 w-5" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-white hover:text-white hover:bg-zinc-700 rounded-lg transition-all duration-200 hover:scale-110"
        >
          <Settings2 className="h-5 w-5" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onMicClick}
          className="h-8 w-8 p-0 text-white hover:text-white hover:bg-zinc-700 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95 active:bg-red-600/20 active:text-red-400"
        >
          <Mic className="h-5 w-5 transition-transform duration-200" />
        </Button>

        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="h-8 px-3 rounded-lg text-sm font-medium hover:opacity-90 transition-all duration-200 hover:scale-105"
          style={{ backgroundColor: "#032827", color: "#2DD4BF" }}
        >
          Agent
        </Button>
      </div>

      <Button
        type="submit"
        size="sm"
        disabled={disabled || isGenerating}
        className="h-8 w-8 p-0 bg-zinc-700 hover:bg-zinc-600 disabled:bg-zinc-800 disabled:text-zinc-500 text-white rounded-lg transition-all duration-200 hover:scale-110 disabled:hover:scale-100"
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
    </div>
  )
}

