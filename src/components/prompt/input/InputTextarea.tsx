"use client"

import type React from "react"
import { useEffect, useRef } from "react"

interface InputTextareaProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  disabled?: boolean
  autoFocus?: boolean
}

export function InputTextarea({ 
  value, 
  onChange, 
  onKeyDown,
  placeholder = "Describe your website idea...", 
  disabled,
  autoFocus = false
}: InputTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (autoFocus && textareaRef.current && !disabled) {
      textareaRef.current.focus()
    }
  }, [autoFocus, disabled])

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement
    target.style.height = "auto"
    target.style.height = target.scrollHeight + "px"
  }

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={onChange}
      onInput={handleInput}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      className="w-full bg-transparent text-gray-300 placeholder-gray-500 resize-none border-none outline-none text-base leading-relaxed min-h-[24px] max-h-32 transition-all duration-200"
      rows={1}
      disabled={disabled}
    />
  )
}

