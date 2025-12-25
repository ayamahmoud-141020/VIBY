import { NextResponse } from "next/server"
import { getPromptResult, getAllStoredIds } from "@/lib/prompt-store"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    if (!id) {
      return NextResponse.json(
        { error: "Prompt ID is required" },
        { status: 400 }
      )
    }

    // Fetch from store
    const result = getPromptResult(id)

    if (!result) {
      console.error("Prompt result not found for ID:", id)
      console.error("All stored IDs:", getAllStoredIds())
      console.error("Looking for exact match of:", JSON.stringify(id))
      console.error("Available IDs:", getAllStoredIds().map(id => JSON.stringify(id)))
      return NextResponse.json(
        { error: "Prompt result not found" },
        { status: 404 }
      )
    }

    // Ensure plans is always an array
    const response = {
      ...result,
      plans: Array.isArray(result.plans) ? result.plans : (result.plans ? [result.plans] : [])
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error fetching prompt result:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

