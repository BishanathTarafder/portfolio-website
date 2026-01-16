'use client';

import React from 'react';
import AnimatedChatWidget from '../../components/AnimatedChatWidget';

const ChatbotDemoPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg p-8 mb-20">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Animated Chatbot Demo</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg text-gray-700 mb-4">
            This page demonstrates the new animated chatbot design. The chatbot features smooth animations, 
            transitions, and a modern UI design that enhances user experience.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Features</h2>
          
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Animated chat toggle button with hover effects</li>
            <li>Smooth entrance and exit animations for the chat window</li>
            <li>Message bubbles with subtle animations</li>
            <li>Typing indicators with bounce animations</li>
            <li>Responsive design that works on all devices</li>
            <li>Backend API connection with fallback mode for offline use</li>
            <li>Session management for continuous conversations</li>
          </ul>
          
          <p className="text-lg text-gray-700 mt-6">
            Click the chat button in the bottom right corner to try it out!
          </p>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">API Connection</h2>
          
          <p className="text-gray-700">
            The chatbot attempts to connect to the backend API. If the API is available,
            it processes messages through the API. If not, it switches to offline mode
            with local fallback responses. You'll see an "Offline Mode" indicator in the
            chat header when the API is unavailable.
          </p>
          
          <p className="text-gray-700 mt-4">
            <strong>API Configuration:</strong> The chatbot connects to the API endpoint specified in the
            <code className="bg-gray-100 px-1 py-0.5 rounded">NEXT_PUBLIC_API_URL</code> environment variable.
            If not set, it defaults to <code className="bg-gray-100 px-1 py-0.5 rounded">http://localhost:8000</code>.
          </p>
        </div>
      </div>
      
      {/* The animated chatbot widget */}
      <AnimatedChatWidget initialMessage="Hello! I'm the animated portfolio assistant. How do you like my new design?" />
    </div>
  );
};

export default ChatbotDemoPage;