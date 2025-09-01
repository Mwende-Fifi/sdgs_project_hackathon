"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, Send, Bot, User } from "lucide-react"
import { continueConversation } from "@/app/actions"
import { readStreamableValue } from "ai/rsc"

interface AiAssistantModalProps {
  isOpen: boolean
  onClose: () => void
}

interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

export function AiAssistantModal({ isOpen, onClose }: AiAssistantModalProps) {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return

    setIsGenerating(true)
    const newHistory: ChatMessage[] = [...chatHistory, { role: "user", content: input }]
    setChatHistory(newHistory)
    setInput("")

    const { newMessages } = await continueConversation(newHistory)

    let assistantResponse = ""
    for await (const chunk of readStreamableValue(newMessages)) {
      assistantResponse += chunk
      setChatHistory([
        ...newHistory,
        {
          role: "assistant",
          content: assistantResponse,
        },
      ])
    }
    setIsGenerating(false)
  }

  const handleClose = () => {
    setChatHistory([])
    setInput("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl h-[70vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-primary" />
            AI Health Assistant
          </DialogTitle>
          <DialogDescription>
            Ask questions about healthcare services in Kenya. I can help you find the right type of facility.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 -mx-6 px-6">
          <div className="space-y-6 pr-4">
            {chatHistory.map((message, index) => (
              <div key={index} className={`flex items-start gap-3 ${message.role === "user" ? "justify-end" : ""}`}>
                {message.role === "assistant" && (
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-5 w-5" />
                  </div>
                )}
                <div
                  className={`rounded-lg px-4 py-3 max-w-[80%] ${
                    message.role === "user"
                      ? "bg-muted text-muted-foreground"
                      : "bg-background border"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
                {message.role === "user" && (
                  <div className="bg-secondary text-secondary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <User className="h-5 w-5" />
                  </div>
                )}
              </div>
            ))}
            {isGenerating && (
                <div className="flex items-start gap-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                        <Bot className="h-5 w-5" />
                    </div>
                    <div className="rounded-lg px-4 py-3 bg-background border">
                        <div className="flex items-center gap-2">
                            <div className="animate-pulse bg-muted-foreground/30 h-2 w-2 rounded-full"></div>
                            <div className="animate-pulse bg-muted-foreground/30 h-2 w-2 rounded-full delay-150"></div>
                            <div className="animate-pulse bg-muted-foreground/30 h-2 w-2 rounded-full delay-300"></div>
                        </div>
                    </div>
                </div>
            )}
          </div>
        </ScrollArea>

        <div className="relative">
          <Textarea
            placeholder="e.g., I have a bad toothache, what kind of place should I go to?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
            className="pr-20 min-h-[60px]"
            disabled={isGenerating}
          />
          <Button
            type="submit"
            size="icon"
            className="absolute right-3 top-1/2 -translate-y-1/2"
            onClick={handleSend}
            disabled={isGenerating || !input.trim()}
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
