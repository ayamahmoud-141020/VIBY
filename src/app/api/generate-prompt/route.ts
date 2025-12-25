import { NextResponse } from "next/server";
import { savePromptResult } from "@/lib/prompt-store";

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // Get n8n webhook URL from environment variable
    const n8nWebhookUrl =
      process.env.N8N_WEBHOOK_URL || '';
      if (!n8nWebhookUrl) {
        throw new Error("N8N_WEBHOOK_URL is not set");
      }
    // Call n8n workflow
    const response = await fetch(n8nWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const responseText = await response.text();

    if (!response.ok) {
      console.error(
        "n8n workflow failed:",
        response.status,
        response.statusText
      );
      console.error("Error response:", responseText);
      throw new Error("Failed to generate prompt via n8n workflow");
    }

    let data;
    try {
      // Handle case where response might be an array
      const parsed = JSON.parse(responseText);
      // If n8n returns an array, get the first item
      data = Array.isArray(parsed) ? parsed[0] : parsed;

      // Log for debugging
      console.log("Parsed n8n response:", JSON.stringify(data, null, 2));
    } catch (parseError) {
      console.error("Failed to parse n8n response:", parseError);
      console.error("Response text:", responseText);
      throw new Error("Invalid response from n8n workflow");
    }

    // Validate data structure
    if (!data || typeof data !== "object") {
      console.error("Invalid data structure from n8n:", data);
      throw new Error("Invalid data structure from n8n workflow");
    }

    // Check if the response contains an error
    if (data.status === "error" || data.error) {
      console.error("n8n workflow returned error:", data.error);
      return NextResponse.json(
        {
          error: data.error || "Failed to generate prompt",
          id: data.id || `error-${Date.now()}`,
        },
        { status: 500 }
      );
    }

    // Extract prompt ID from response - use the ID from n8n response
    const promptId =
      data.id ||
      `prompt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    console.log("Extracted prompt ID:", promptId);
    console.log("Data ID from n8n:", data.id);
    console.log("Data status from n8n:", data.status);

    // Ensure plans is an array
    const plans = Array.isArray(data.plans)
      ? data.plans
      : data.plans
      ? [data.plans]
      : [];

    // Determine status - if n8n returned "generating", keep it, otherwise mark as completed
    const status =
      data.status === "generating" ? "generating" : data.status || "completed";

    // Prepare the result object
    const resultToStore = {
      id: promptId,
      prompt: data.prompt || prompt,
      status: status,
      plans: plans,
      error: data.error,
    };

    console.log("Result to store:", {
      id: resultToStore.id,
      prompt: resultToStore.prompt,
      status: resultToStore.status,
      plansCount: resultToStore.plans?.length || 0,
    });

    // Store the result IMMEDIATELY (even if generating, so frontend can poll)
    try {
      savePromptResult(resultToStore);
      console.log("Successfully stored prompt result with ID:", promptId);

      // Verify it was stored
      const { getPromptResult: verifyGet } = await import("@/lib/prompt-store");
      const verify = verifyGet(promptId);
      if (verify) {
        console.log("Verified: Result is in store with status:", verify.status);
      } else {
        console.error("ERROR: Result was NOT stored properly!");
      }
    } catch (storeError) {
      console.error("Error storing prompt result:", storeError);
      // Continue anyway, the result might still be accessible
    }

    // Return both ID and full result so frontend can use it immediately
    // This helps when the in-memory store is cleared between requests
    return NextResponse.json({
      id: promptId,
      result: resultToStore, // Include full result in response
    });
  } catch (error) {
    console.error("Error generating prompt:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    console.error("Error details:", {
      message: errorMessage,
      stack: error instanceof Error ? error.stack : undefined,
    });
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
