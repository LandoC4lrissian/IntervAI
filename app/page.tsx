"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bot, HelpCircle } from "lucide-react";
import Chatbot from "@/components/chatbot";

export default function Home() {
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleChat = () => {
    setIsChatVisible(!isChatVisible);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <main
      className={`min-h-screen flex items-center justify-center p-4 ${
        isDarkMode ? "dark bg-gray-900" : "bg-gray-100"
      }`}
    >
      {!isChatVisible && (
        <h1
          className={`text-4xl font-bold ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          For try out the chatbot, click the button below.
        </h1>
      )}

      {isChatVisible ? (
        <Chatbot
          onClose={toggleChat}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
        />
      ) : (
        <Button
          className="fixed bottom-4 right-4 rounded-full w-14 h-14 shadow-lg"
          onClick={toggleChat}
          aria-label="Open chat with AI assistant"
        >
          <Bot className="w-6 h-6" />
          <HelpCircle className="w-4 h-4 absolute top-1 right-1" />
        </Button>
      )}
    </main>
  );
}
