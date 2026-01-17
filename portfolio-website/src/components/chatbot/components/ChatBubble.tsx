import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

interface ChatBubbleProps {
  message: Message;
  isUser: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, isUser }) => {
  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(false);
  
  // Animation effect when message appears
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className={`flex w-full gap-3 ${isUser ? 'justify-end' : 'justify-start'} transition-all duration-300 ease-in-out`}
      style={{
        opacity: visible ? 1 : 0,
        transform: `translateY(${visible ? 0 : '10px'})`
      }}
    >
      {/* AI Avatar */}
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center border border-zinc-200 dark:border-zinc-700 mt-1">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-zinc-900 dark:text-zinc-100">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
          </svg>
        </div>
      )}

      <div className={`flex flex-col max-w-[85%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div 
          className={`
            relative px-5 py-3.5 text-sm shadow-sm
            ${isUser 
              ? 'bg-blue-600 text-white rounded-2xl rounded-tr-sm' 
              : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-100 rounded-2xl rounded-tl-sm'
            }
          `}
        >
          <div className={`prose dark:prose-invert max-w-none leading-relaxed break-words ${isUser ? 'prose-p:text-white prose-a:text-white' : ''}`}>
            <ReactMarkdown 
              components={{
                p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                a: ({node, ...props}) => <a className={`underline ${isUser ? 'text-white/90' : 'text-blue-600 dark:text-blue-400'}`} target="_blank" rel="noopener noreferrer" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-4 mb-2 space-y-1" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal pl-4 mb-2 space-y-1" {...props} />,
                li: ({node, ...props}) => <li className="" {...props} />,
                code: ({node, className, children, ...props}) => {
                  const match = /language-(\w+)/.exec(className || '');
                  const isInline = !match;
                  return isInline ? (
                    <code className={`${isUser ? 'bg-blue-700 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-pink-500 dark:text-pink-400'} px-1.5 py-0.5 rounded font-mono text-xs`} {...props}>
                      {children}
                    </code>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
                pre: ({node, ...props}) => (
                  <div className="my-3 rounded-lg overflow-hidden bg-zinc-900 dark:bg-zinc-950 border border-zinc-800">
                    <div className="flex items-center justify-between px-3 py-1.5 bg-zinc-800/50 border-b border-zinc-700/50">
                      <span className="text-xs text-zinc-400">Code</span>
                    </div>
                    <pre className="p-3 overflow-x-auto text-sm text-zinc-100 font-mono scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent" {...props} />
                  </div>
                ),
                blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-zinc-300 dark:border-zinc-700 pl-4 italic text-zinc-500 dark:text-zinc-400 my-2" {...props} />,
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        </div>
        
        {/* Actions Row (Copy, etc) - Only for Assistant */}
        {!isUser && (
          <div className="flex items-center gap-2 mt-1 ml-1">
            <button 
              onClick={copyToClipboard} 
              className="p-1 text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors rounded"
              aria-label="Copy message"
              title="Copy to clipboard"
            >
              {copied ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                  <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                </svg>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBubble;