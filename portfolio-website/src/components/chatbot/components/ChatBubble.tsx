import React from 'react';
import ReactMarkdown from 'react-markdown';
import { IconBot, IconUser } from './icons';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatBubbleProps {
  message: Message;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';

  if (isUser) {
    return (
      <div className="flex justify-end w-full pl-8">
        <div className="bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 px-4 py-2 rounded-3xl max-w-[85%] text-sm leading-6">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full gap-4 pr-8">
      <div className="flex-shrink-0 w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center justify-center">
        <IconBot className="w-5 h-5 text-zinc-900 dark:text-zinc-100" />
      </div>
      <div className="flex-1 space-y-2">
        <div className="prose prose-sm dark:prose-invert max-w-none text-zinc-800 dark:text-zinc-200 leading-6 bg-zinc-50 dark:bg-zinc-900/50 px-4 py-2 rounded-2xl">
          <ReactMarkdown
            components={{
              // Override default elements to match Vercel style
              p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
              ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>,
              li: ({ children }) => <li>{children}</li>,
              code: ({ className, children, ...props }) => {
                const match = /language-(\w+)/.exec(className || '');
                const isInline = !match;
                return isInline ? (
                  <code className="bg-zinc-200 dark:bg-zinc-800 px-1 py-0.5 rounded font-mono text-sm" {...props}>
                    {children}
                  </code>
                ) : (
                  <div className="my-4 rounded-lg overflow-hidden bg-zinc-950 dark:bg-zinc-900 border border-zinc-800">
                     <div className="px-4 py-2 bg-zinc-900 border-b border-zinc-800 text-xs text-zinc-400">
                        Code
                     </div>
                     <pre className="p-4 overflow-x-auto text-sm text-zinc-50 font-mono">
                        <code className={className} {...props}>
                          {children}
                        </code>
                     </pre>
                  </div>
                );
              },
              a: ({ children, href }) => (
                <a 
                  href={href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {children}
                </a>
              ),
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
