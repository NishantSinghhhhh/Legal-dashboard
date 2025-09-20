"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { MessageSquare, Send, Bot, User, ExternalLink, BookOpen, AlertTriangle, CheckCircle } from "lucide-react"

interface ChatMessage {
  id: string
  type: "bot" | "user"
  message: string
  timestamp: Date
}

const initialChatHistory: ChatMessage[] = [
  {
    id: "1",
    type: "bot",
    message:
      "Hello! I'm your AI legal assistant. I can help you understand your contracts, explain legal terms, and provide guidance on document-specific questions. What would you like to know?",
    timestamp: new Date(Date.now() - 300000),
  }
]

const recommendedActions = [
  {
    title: "Review Insurance Requirements",
    description: "Your office lease requires specific insurance coverage that expires soon",
    priority: "high",
    document: "Office Lease Agreement",
  },
  {
    title: "Update Privacy Policy",
    description: "Recent data protection regulations may require policy updates",
    priority: "medium",
    document: "Privacy Policy",
  },
  {
    title: "Negotiate Liability Cap",
    description: "Consider adding liability limitations to your vendor agreement",
    priority: "low",
    document: "Vendor Service Agreement",
  },
]

const resources = [
  {
    title: "Contract Law Basics",
    description: "Understanding fundamental principles of contract formation and enforcement",
    category: "Education",
    link: "#",
  },
  {
    title: "Employment Law Updates",
    description: "Recent changes in employment regulations and compliance requirements",
    category: "Legal Updates",
    link: "#",
  },
  {
    title: "Risk Management Guide",
    description: "Best practices for identifying and mitigating legal risks in contracts",
    category: "Risk Management",
    link: "#",
  },
  {
    title: "Negotiation Strategies",
    description: "Effective techniques for contract negotiation and clause modification",
    category: "Strategy",
    link: "#",
  },
]

export default function GuidancePage() {
  const [message, setMessage] = useState("")
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(initialChatHistory)
  const [isTyping, setIsTyping] = useState(false)
  const [error, setError] = useState("")

  const callOpenAI = async (userMessage: string) => {
    try {
      // Get API key from environment variables
      const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY

      if (!apiKey) {
        throw new Error('OpenAI API key not found')
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: "You are a helpful AI legal assistant. Provide informative guidance about legal topics, contract terms, and general legal concepts. Always remind users that your responses are for informational purposes only and do not constitute legal advice. Be clear, helpful, and professional."
            },
            {
              role: 'user',
              content: userMessage
            }
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('OpenAI API error:', errorData)
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data.choices[0]?.message?.content || 'I apologize, but I couldn\'t generate a response. Please try again.'
    } catch (error) {
      console.error('Error calling OpenAI:', error)
      throw error
    }
  }

  const sendMessage = async () => {
    if (!message.trim()) return

    const userMessage = message.trim()
    const userMessageObj: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      message: userMessage,
      timestamp: new Date(),
    }

    // Add user message to chat
    setChatHistory(prev => [...prev, userMessageObj])
    setMessage("")
    setIsTyping(true)
    setError("")

    try {
      // Call OpenAI API
      const aiResponse = await callOpenAI(userMessage)
      
      const botMessageObj: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        message: aiResponse,
        timestamp: new Date(),
      }

      setChatHistory(prev => [...prev, botMessageObj])
    } catch (error) {
      const errorMessage = "I apologize, but I'm having trouble connecting to the AI service right now. Please try again in a moment."
      const errorMessageObj: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        message: errorMessage,
        timestamp: new Date(),
      }
      setChatHistory(prev => [...prev, errorMessageObj])
      setError("Failed to get AI response. Please check your API configuration.")
    } finally {
      setIsTyping(false)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Legal Guidance Hub</h1>
        <p className="text-muted-foreground">Get AI-powered legal assistance and expert guidance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Chat Interface */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              AI Legal Assistant
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-96 p-4">
              <div className="space-y-4">
                {chatHistory.map((chat) => (
                  <div key={chat.id} className={`flex gap-3 ${chat.type === "user" ? "justify-end" : ""}`}>
                    <div className={`flex gap-3 max-w-[80%] ${chat.type === "user" ? "flex-row-reverse" : ""}`}>
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          chat.type === "bot" ? "bg-blue-100" : "bg-gray-100"
                        }`}
                      >
                        {chat.type === "bot" ? (
                          <Bot className="h-4 w-4 text-blue-600" />
                        ) : (
                          <User className="h-4 w-4 text-gray-600" />
                        )}
                      </div>
                      <div
                        className={`p-3 rounded-lg ${
                          chat.type === "bot" ? "bg-muted text-foreground" : "bg-primary text-primary-foreground"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{chat.message}</p>
                        <p className="text-xs opacity-70 mt-1">{chat.timestamp.toLocaleTimeString()}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <Separator />

            <div className="p-4">
              {error && (
                <div className="mb-2 p-2 bg-red-100 text-red-700 rounded text-xs">
                  {error}
                </div>
              )}
              <div className="flex gap-2">
                <Input
                  placeholder="Ask about your contracts, legal terms, or get guidance..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && !isTyping && sendMessage()}
                  disabled={isTyping}
                />
                <Button onClick={sendMessage} disabled={!message.trim() || isTyping}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                AI responses are for informational purposes only and do not constitute legal advice.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Recommended Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recommended Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recommendedActions.map((action, index) => (
                <div key={index} className="p-3 rounded-lg border border-border">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm text-foreground">{action.title}</h4>
                    <Badge className={getPriorityColor(action.priority)}>{action.priority}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{action.description}</p>
                  <p className="text-xs text-muted-foreground italic">{action.document}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Risk Assessment
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                <CheckCircle className="h-4 w-4 mr-2" />
                Compliance Check
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                <BookOpen className="h-4 w-4 mr-2" />
                Contract Analysis
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Resource Library */}
      <Card>
        <CardHeader>
          <CardTitle>Legal Resource Library</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {resources.map((resource, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border border-border hover:shadow-sm transition-shadow cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-sm text-foreground">{resource.title}</h4>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground mb-3">{resource.description}</p>
                <Badge variant="secondary" className="text-xs">
                  {resource.category}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}