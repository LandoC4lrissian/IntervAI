"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Moon, Sun, User, Bot, X } from "lucide-react";

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
];

// Message type definition
type Message = {
  text: string;
  isUser: boolean;
  timestamp: Date;
};

interface ChatboxProps {
  onClose: () => void
  isDarkMode: boolean
  toggleTheme: () => void
}

export default function Chatbot({ onClose, isDarkMode, toggleTheme }: ChatboxProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() === "") return;

    const newUserMessage: Message = {
      text: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInputMessage("");

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }, 1000);
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg lg:max-w-3xl">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">AI Chatbot</h2>
          <div className="flex space-x-2">
            <Button variant="outline" size="icon" onClick={toggleTheme}>
              {isDarkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
            </Button>
            <Button variant="outline" size="icon" onClick={onClose} aria-label="Close chat">
              <X className="h-[1.2rem] w-[1.2rem]" />
            </Button>
          </div>
        </div>
        <div className="h-[400px] overflow-y-auto custom-scrollbar mb-4 space-y-4 pr-2">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-end space-x-2 ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${message.isUser ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}>
                  {message.isUser ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-gray-800 dark:text-gray-200" />}
                </div>
                <div className={`max-w-[90%] p-2 rounded-lg ${
                  message.isUser 
                    ? 'bg-blue-500 text-white rounded-br-none' 
                    : 'bg-gray-200 dark:bg-gray-700 dark:text-white rounded-bl-none'
                }`}>
                  <div className="flex justify-between items-end">
                    <p className="text-sm mr-2">{message.text}</p>
                    <p className="text-[10px] opacity-70 flex-shrink-0">{message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                  </div>
                </div>
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
  )
}
