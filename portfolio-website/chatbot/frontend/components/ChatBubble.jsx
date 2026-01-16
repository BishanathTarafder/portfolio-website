import React from 'react';
import ReactMarkdown from 'react-markdown';
import styles from '../ChatWidget.module.css';

const ChatBubble = ({ message, isUser }) => {
  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 ${styles.messageIn}`}
    >
      <div
        className={`max-w-3/4 rounded-lg px-4 py-2 ${
          isUser
            ? 'bg-blue-600 text-white rounded-br-none'
            : 'bg-gray-200 text-gray-800 rounded-bl-none'
        }`}
      >
        {/* Use ReactMarkdown to render markdown content */}
        <ReactMarkdown
          className="prose prose-sm max-w-none break-words"
          components={{
            // Style links
            a: ({ node, ...props }) => (
              <a
                {...props}
                className={`${isUser ? 'text-blue-200' : 'text-blue-600'} underline`}
                target="_blank"
                rel="noopener noreferrer"
              />
            ),
            // Style code blocks
            code: ({ node, ...props }) => (
              <code
                {...props}
                className={`${isUser ? 'bg-blue-700' : 'bg-gray-300'} rounded px-1 py-0.5`}
              />
            ),
            // Style lists
            ul: ({ node, ...props }) => (
              <ul {...props} className="list-disc pl-5 my-2" />
            ),
            ol: ({ node, ...props }) => (
              <ol {...props} className="list-decimal pl-5 my-2" />
            ),
          }}
        >
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default ChatBubble;