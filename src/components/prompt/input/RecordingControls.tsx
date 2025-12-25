"use client"

import { Button } from "@/components/ui/button"
import { X, Check } from "lucide-react"

interface RecordingControlsProps {
  onCancel: () => void
  onConfirm: () => void
}

export function RecordingControls({ onCancel, onConfirm }: RecordingControlsProps) {
  return (
    <div className="flex items-center gap-2 ml-4">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onCancel}
        className="h-8 w-8 p-0 text-white hover:text-white hover:bg-zinc-700 rounded-lg transition-all duration-200 hover:scale-110"
      >
        <X className="h-5 w-5" />
      </Button>
      <Button
        type="button"
        size="sm"
        onClick={onConfirm}
        className="h-8 w-8 p-0 rounded-lg transition-all duration-200 hover:scale-110"
        style={{ backgroundColor: "#2DD4BF", color: "#032827" }}
      >
        <Check className="h-5 w-5" />
      </Button>
    </div>
  )
}

