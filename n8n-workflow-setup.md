# n8n Workflow Setup Guide for Promptify

## Overview

This n8n workflow receives website ideas from your backend, processes them through Groq AI (using Llama models), and returns comprehensive website development plans.

## Prerequisites

1. **n8n Installation**

   - Install n8n locally or use n8n cloud
   - Ensure you have n8n version 1.0+ installed

2. **Groq API Key**
   - Get your API key from [Groq Console](https://console.groq.com/keys)
   - You'll need to set it as an environment variable in n8n

## Setup Instructions

### Step 1: Import the Workflow

1. Open your n8n instance
2. Click on "Workflows" in the sidebar
3. Click "Import from File" or "Import from URL"
4. Select the `n8n-workflow.json` file
5. The workflow will be imported with all nodes

### Step 2: Configure Groq API Key

1. In n8n, go to Settings → Environment Variables
2. Add a new environment variable:
   - **Name**: `GROQ_API_KEY`
   - **Value**: Your Groq API key
3. Save the environment variable

**Alternative**: If you prefer to hardcode the API key (not recommended for production):

1. Click on the "Generate with Groq" node
2. Replace `$env.GROQ_API_KEY` with your actual API key in quotes: `'YOUR_API_KEY_HERE'`

### Step 3: Configure the Webhook

1. Click on the "Webhook" node
2. The webhook path is set to `generate-prompt`
3. Note the webhook URL (it will be displayed in the node)
   - Format: `https://your-n8n-instance.com/webhook/generate-prompt`
   - Or: `http://localhost:5678/webhook/generate-prompt` (for local)
   - Your instance: `https://ayamahmoudzaki1410.app.n8n.cloud/webhook/generate-prompt`

### Step 4: Activate the Workflow

1. Toggle the "Active" switch in the top right
2. The workflow is now ready to receive requests

## Workflow Structure

```
Webhook (POST)
  → Extract Prompt
    → Generate with Groq (HTTP Request)
      → Check for Errors
        → Parse Response (success) / Handle Error (error)
          → Format Response / Format Error Response
            → Respond to Webhook
```

## API Integration

### Request Format

Send a POST request to your webhook URL:

```bash
POST https://ayamahmoudzaki1410.app.n8n.cloud/webhook/generate-prompt
Content-Type: application/json

{
  "prompt": "I want to create an e-commerce platform for handmade jewelry with a blog section and customer reviews"
}
```

### Response Format

The workflow returns a JSON object with the following structure:

```json
{
  "id": "plan-1234567890",
  "prompt": "I want to create an e-commerce platform...",
  "status": "completed",
  "plans": [
    {
      "id": "plan-1",
      "title": "E-commerce Platform Architecture",
      "description": "A comprehensive e-commerce solution...",
      "steps": [
        "Set up Next.js project with TypeScript",
        "Configure database (PostgreSQL or MongoDB)",
        "..."
      ],
      "features": ["Product catalog with images", "Shopping cart", "..."],
      "technologies": ["Next.js", "TypeScript", "PostgreSQL", "..."],
      "timeline": "8-12 weeks"
    }
  ]
}
```

## Updating Your Backend

Your backend route (`/api/generate-prompt/route.ts`) is already configured to call the n8n webhook. Make sure you have:

```env
N8N_WEBHOOK_URL=https://ayamahmoudzaki1410.app.n8n.cloud/webhook/generate-prompt
```

## Testing

1. Use the n8n "Test workflow" feature
2. Or use curl:

```bash
curl -X POST https://ayamahmoudzaki1410.app.n8n.cloud/webhook/generate-prompt \
  -H "Content-Type: application/json" \
  -d '{"prompt": "I want to create a blog website"}'
```

## Troubleshooting

1. **Webhook not receiving requests**

   - Check if workflow is activated
   - Verify webhook URL is correct
   - Check n8n logs

2. **Groq API errors**

   - Verify API key is set correctly in environment variables
   - Check API quota/limits at [Groq Console](https://console.groq.com/)
   - Ensure model name is correct (llama-3.1-70b-versatile)
   - Available models: `llama-3.1-70b-versatile`, `llama-3.1-8b-instant`, `mixtral-8x7b-32768`

3. **Response format issues**

   - Check the "Format Response" code node
   - Verify JSON parsing logic
   - Check n8n execution logs

4. **Connection issues**
   - Make sure "Generate with Gemini" node is connected to "Parse Response"
   - Verify all nodes are properly connected in the workflow

## Key Features

- ✅ Uses HTTP Request node to call Groq API
- ✅ Directly calls Groq Chat Completions endpoint
- ✅ Properly extracts response from `choices[0].message.content`
- ✅ All nodes are correctly connected
- ✅ Uses environment variable for API key (more secure)
- ✅ Includes error handling for quota/rate limit issues
- ✅ Uses `llama-3.1-70b-versatile` model (fast and capable)

## Next Steps

1. Set up database storage for prompt results
2. Add error handling and retries
3. Implement rate limiting
4. Add webhook authentication
5. Set up monitoring and logging
