// Simple in-memory store for prompt results
// In production, replace this with a database (PostgreSQL, MongoDB, etc.)

interface PromptResult {
  id: string
  prompt: string
  status: "generating" | "completed" | "error"
  plans?: any[]
  error?: string
}

const promptStore = new Map<string, PromptResult>()

export function savePromptResult(result: PromptResult) {
  console.log("Storing prompt result with ID:", result.id)
  console.log("Store size before:", promptStore.size)
  promptStore.set(result.id, result)
  console.log("Store size after:", promptStore.size)
  console.log("Stored IDs:", Array.from(promptStore.keys()))
}

export function getPromptResult(id: string): PromptResult | undefined {
  console.log("Looking for ID:", id)
  console.log("Available IDs in store:", Array.from(promptStore.keys()))
  const result = promptStore.get(id)
  if (!result) {
    console.log("ID not found in store. Store contents:", Array.from(promptStore.entries()).map(([k, v]) => ({ id: k, prompt: v.prompt })))
  }
  return result
}

export function updatePromptResult(id: string, updates: Partial<PromptResult>) {
  const existing = promptStore.get(id)
  if (existing) {
    promptStore.set(id, { ...existing, ...updates })
  }
}

// Debug function to list all stored IDs
export function getAllStoredIds(): string[] {
  return Array.from(promptStore.keys())
}

