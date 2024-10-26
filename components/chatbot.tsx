'use client'
import React, { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Moon, Sun } from "lucide-react"

// Bot responses
const botResponses = [
    "That's a unique thought! Can you elaborate a bit more?",
    "I totally get it. What made you feel that way?",
    "Interesting perspective. Have you thought about other possibilities?",
    "That’s a challenging idea! What inspired you to think that way?",
    "Thank you for sharing! Anything else on your mind?",
    "I see where you're coming from. Have you tried a different approach?",
    "Hmm, that’s insightful. What other thoughts do you have on this?",
    "That's an important point. How do you plan to tackle it?",
    "I'm here to listen. What else would you like to discuss?",
    "That’s a great question! I'll need a moment to consider it.",
    "I hear you. How does this situation impact you overall?",
    "That's intriguing. What do you think could be a good next step?",
    "Good point! How long have you felt this way?",
    "Let’s dig deeper. What might be the root cause here?",
    "I appreciate your openness. Is there anything else weighing on you?",
    "Such an interesting thought! How might others view this?",
  ]
  

// Message type definition
type Message = {
  text: string
  isUser: boolean
  timestamp: Date
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputMessage.trim() === '') return

    const newUserMessage: Message = {
      text: inputMessage,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages(prevMessages => [...prevMessages, newUserMessage])
    setInputMessage('')

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        isUser: false,
        timestamp: new Date(),
      }
      setMessages(prevMessages => [...prevMessages, botMessage])
    }, 1000)
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${isDarkMode ? 'dark' : ''}`}>
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">AI Chatbot</h2>
            <Button variant="outline" size="icon" onClick={toggleTheme}>
              {isDarkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
            </Button>
          </div>
          <div className="h-[400px] overflow-y-auto custom-scrollbar mb-4 space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] p-3 rounded-lg ${message.isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                  <p>{message.text}</p>
                  <p className="text-xs mt-1 opacity-70">{message.timestamp.toLocaleTimeString()}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              type="text"
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit">Send</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}