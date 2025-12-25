# Groq API Setup for Promptify

## Why Groq?

Groq provides:
- ⚡ **Ultra-fast inference** - Much faster than traditional APIs
- 🆓 **Generous free tier** - 14,400 requests/day free
- 💰 **Cost-effective** - Very affordable pricing
- 🚀 **High performance** - Optimized for speed

## Getting Your API Key

1. Go to [Groq Console](https://console.groq.com/)
2. Sign up or log in
3. Navigate to **API Keys** section
4. Click **Create API Key**
5. Copy your API key

## Setting Up in n8n

1. Open your n8n instance
2. Go to **Settings** → **Environment Variables**
3. Add new variable:
   - **Name**: `GROQ_API_KEY`
   - **Value**: Your Groq API key
4. Save

## Available Models

The workflow uses `llama-3.1-70b-versatile` by default. You can change it to:

- `llama-3.1-70b-versatile` - Best balance of speed and quality (default)
- `llama-3.1-8b-instant` - Fastest, good for simple tasks
- `mixtral-8x7b-32768` - Good for longer context

To change the model, edit the "Generate with Groq" node and update the `model` field in the JSON body.

## Rate Limits

**Free Tier:**
- 14,400 requests per day
- 30 requests per minute
- No credit card required

**Paid Tier:**
- Higher limits available
- Check [Groq Pricing](https://console.groq.com/docs/pricing) for details

## API Endpoint

The workflow uses:
- **URL**: `https://api.groq.com/openai/v1/chat/completions`
- **Method**: POST
- **Authentication**: Bearer token in Authorization header

## Response Format

Groq returns responses in OpenAI-compatible format:
```json
{
  "choices": [{
    "message": {
      "content": "Your generated response here..."
    }
  }]
}
```

The workflow extracts the content from `choices[0].message.content`.

## Troubleshooting

1. **401 Unauthorized**
   - Check your API key is correct
   - Verify environment variable is set

2. **429 Rate Limit**
   - You've exceeded the free tier limits
   - Wait a few minutes or upgrade your plan

3. **Model not found**
   - Ensure model name is correct
   - Check available models in Groq console

