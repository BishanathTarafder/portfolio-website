'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Import the ChatbotWidget with no SSR to avoid hydration issues
const ChatbotWidget = dynamic(
  () => import('./ChatbotWidget'),
  { ssr: false }
);

export default function Chatbot() {
  const [mounted, setMounted] = useState(false);

  // Only show the chatbot after the component has mounted to avoid hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ChatbotWidget initialMessage="Welcome to my portfolio! How can I help you today?" />
  );
}