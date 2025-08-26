import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

const AnimatedChatBubble = ({ message, isUser }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Animate in when the message is added
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`
        max-w-[80%] p-3 rounded-2xl relative 
        transition-all duration-300 ease-out
        ${isUser ? 'self-end' : 'self-start'}
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        ${isHovered ? 'shadow-md' : 'shadow-sm'}
      `}
      style={{
        backgroundColor: isUser ? '#6049ea' : '#f3f4f6',
        color: isUser ? 'white' : '#1f2937',
        borderBottomRightRadius: isUser ? '4px' : '18px',
        borderBottomLeftRadius: isUser ? '18px' : '4px',
        transform: `${isVisible ? 'scale(1)' : 'scale(0.95)'} ${isHovered ? 'translateY(-2px)' : ''}`,
        animationDelay: '0.1s',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isUser ? (
        <p className="whitespace-pre-wrap break-words">{message.content}</p>
      ) : (
        <div className="markdown-content">
          <ReactMarkdown
            components={{
              a: ({ node, ...props }) => (
                <a 
                  {...props} 
                  className="text-blue-600 underline hover:text-blue-800 transition-colors" 
                  target="_blank" 
                  rel="noopener noreferrer"
                />
              ),
              code: ({ node, inline, ...props }) => (
                inline ? (
                  <code 
                    {...props} 
                    className="bg-gray-200 text-gray-800 px-1 py-0.5 rounded text-sm font-mono"
                  />
                ) : (
                  <code 
                    {...props} 
                    className="block bg-gray-800 text-gray-100 p-3 rounded-md overflow-x-auto text-sm font-mono my-2"
                  />
                )
              ),
              ul: ({ node, ...props }) => (
                <ul {...props} className="list-disc pl-5 my-2" />
              ),
              ol: ({ node, ...props }) => (
                <ol {...props} className="list-decimal pl-5 my-2" />
              ),
              li: ({ node, ...props }) => (
                <li {...props} className="my-1" />
              ),
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      )}
      
      {/* Animated tail for the chat bubble */}
      <div 
        className={`absolute w-3 h-3 ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        style={{
          backgroundColor: isUser ? '#6049ea' : '#f3f4f6',
          bottom: '-3px',
          [isUser ? 'right' : 'left']: '8px',
          transform: 'rotate(45deg)',
        }}
      />
      
      {/* Timestamp (optional) */}
      {message.timestamp && (
        <div 
          className={`text-xs mt-1 ${isUser ? 'text-purple-200 text-right' : 'text-gray-500'}`}
          style={{ opacity: 0.8 }}
        >
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      )}
    </div>
  );
};

export default AnimatedChatBubble;