# 🚀 Promptify - AI-Powered Website Development Planner

Transform your website ideas into comprehensive development plans with AI-powered assistance. Promptify uses advanced AI models to generate detailed architecture, implementation steps, technology recommendations, and timelines for your web projects.

## 🌐 Live Demo

**Deployed on Vercel:** [https://viby-lemon.vercel.app/](https://viby-lemon.vercel.app/)

<img width="1470" height="905" alt="image" src="https://github.com/user-attachments/assets/266bb948-ef6c-44a2-9feb-9a31d8695960" />


The application features a modern, dark-themed interface with:
- **Elegant Hero Section**: Gradient title "Transform Your Website Ideas" with animated background
- **Interactive Input Area**: Text input with voice recording capabilities
- **Real-time AI Generation**: Watch as comprehensive plans are generated
- **Detailed Plan Cards**: Beautifully designed cards showing architecture, steps, features, technologies, and timelines

## ✨ Features

- 🤖 **AI-Powered Planning**: Generate comprehensive website development plans using Groq AI (Llama models)
- 🎨 **Modern UI/UX**: Beautiful, responsive design with smooth animations
- 🎤 **Voice Input**: Record and transcribe your website ideas
- 📋 **Detailed Plans**: Get structured plans with:
  - Architecture overview
  - Step-by-step implementation guide
  - Feature lists
  - Technology stack recommendations
  - Timeline estimates
- 🔗 **Shareable Links**: Each generated plan gets a unique, shareable URL
- ⚡ **Real-time Status**: Track generation progress with live updates
- 🎯 **Error Handling**: Graceful error handling with user-friendly messages

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 16.1.1](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **UI Library**: React 19.2.3
- **Styling**: Tailwind CSS 3.4.19
- **Animations**: Framer Motion 12.23.26
- **Icons**: Lucide React 0.562.0
- **Utilities**: clsx, tailwind-merge

### Backend & AI
- **Workflow Automation**: n8n
- **AI Provider**: Groq API (Llama 3.1 models)
- **Deployment**: Vercel

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher
- **npm**, **yarn**, **pnpm**, or **bun**
- **Git** (for cloning the repository)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/a-mahmoud-ignteq/VIBE.git
cd VIBE
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Optional: Custom n8n webhook URL
# Default: https://hamdye.app.n8n.cloud/webhook/generate-prompt
N8N_WEBHOOK_URL=https://hamdye.app.n8n.cloud/webhook/generate-prompt
```

> **Note**: The application works out of the box with the default n8n webhook. You only need to set this if you're using your own n8n instance.

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### 5. Open Your Browser

Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
VIBE/
├── public/                 # Static assets
│   └── icon.svg
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── api/           # API routes
│   │   │   ├── generate-prompt/  # Main API endpoint
│   │   │   └── prompt/[id]/      # Individual prompt retrieval
│   │   ├── prompt/[id]/  # Dynamic prompt result pages
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Homepage
│   ├── components/           # React components
│   │   ├── hero/         # Hero section components
│   │   ├── prompt/       # Prompt input/output components
│   │   ├── magicui/      # Animated UI components
│   │   └── ui/           # Reusable UI components
│   └── lib/              # Utilities and stores
│       ├── prompt-store.ts  # In-memory prompt storage
│       └── utils.ts        # Helper functions
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── GROQ-SETUP.md         # Groq API setup guide
└── n8n-workflow-setup.md # n8n workflow configuration
```

## 🔧 Configuration

### n8n Workflow Setup

This project uses n8n for workflow automation. The workflow:
1. Receives prompts via webhook
2. Processes them through Groq AI
3. Returns structured development plans

**Setup Instructions:**
- See [n8n-workflow-setup.md](./n8n-workflow-setup.md) for detailed workflow configuration
- Import `n8n-workflow.json` into your n8n instance
- Configure the Groq API key (see below)

### Groq API Setup

The application uses Groq API for ultra-fast AI inference:

**Why Groq?**
- ⚡ Ultra-fast inference (much faster than traditional APIs)
- 🆓 Generous free tier (14,400 requests/day)
- 💰 Cost-effective pricing
- 🚀 High performance

**Setup:**
1. Get your API key from [Groq Console](https://console.groq.com/)
2. Add it to your n8n environment variables as `GROQ_API_KEY`
3. See [GROQ-SETUP.md](./GROQ-SETUP.md) for detailed instructions

**Available Models:**
- `llama-3.1-70b-versatile` (default) - Best balance of speed and quality
- `llama-3.1-8b-instant` - Fastest, good for simple tasks
- `mixtral-8x7b-32768` - Good for longer context

## 📖 Usage

1. **Enter Your Website Idea**
   - Type your idea in the input field
   - Or use the microphone icon for voice input

2. **Generate Plan**
   - Click the "Agent" button or press Enter
   - Watch as AI generates your comprehensive plan

3. **View Results**
   - See detailed plan cards with:
     - Architecture overview
     - Implementation steps
     - Features list
     - Technology recommendations
     - Timeline estimates

4. **Share Your Plan**
   - Each plan gets a unique URL
   - Share with your team or save for later

## 🚢 Deployment

### Deploy on Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables (if needed)
4. Deploy!

The application is already deployed at: [https://viby-lemon.vercel.app/](https://viby-lemon.vercel.app/)

### Other Deployment Options

- **Netlify**: Similar to Vercel, supports Next.js out of the box
- **Docker**: Build and deploy using containerization
- **Self-hosted**: Run on your own server with Node.js

## 📝 Available Scripts

- `npm run dev` - Start development server (port 3000)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 UI/UX Features

- **Dark Theme**: Modern dark interface with gradient accents
- **Smooth Animations**: Framer Motion powered transitions
- **Responsive Design**: Works on all device sizes
- **Loading States**: Beautiful loading animations
- **Error States**: User-friendly error messages
- **Interactive Elements**: Hover effects and transitions

## 🔌 API Endpoints

### POST `/api/generate-prompt`

Generate a new website development plan.

**Request:**
```json
{
  "prompt": "I want to create an e-commerce platform for handmade jewelry"
}
```

**Response:**
```json
{
  "id": "plan-1234567890",
  "result": {
    "id": "plan-1234567890",
    "prompt": "I want to create an e-commerce platform...",
    "status": "completed",
    "plans": [
      {
        "id": "plan-1",
        "title": "E-commerce Platform Architecture",
        "description": "...",
        "steps": [...],
        "features": [...],
        "technologies": [...],
        "timeline": "8-12 weeks"
      }
    ]
  }
}
```

### GET `/api/prompt/[id]`

Retrieve a previously generated plan by ID.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Groq](https://groq.com/) - Ultra-fast AI inference
- [n8n](https://n8n.io/) - Workflow automation
- [Vercel](https://vercel.com/) - Deployment platform
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

## 📞 Support

For issues, questions, or contributions, please open an issue on the GitHub repository.

---

**Built with ❤️ using Next.js and AI**

Visit the live demo: [https://viby-lemon.vercel.app/](https://viby-lemon.vercel.app/)
