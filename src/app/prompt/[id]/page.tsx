import { PromptResults } from "@/components/prompt/output"

interface PromptPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function PromptPage({ params }: PromptPageProps) {
  const { id } = await params
  return <PromptResults promptId={id} />
}

