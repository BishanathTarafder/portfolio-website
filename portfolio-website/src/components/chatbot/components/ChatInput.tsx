'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from '../ChatWidget.module.css';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isTyping?: boolean;
}

const MAX_CHARS = 1000;

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isTyping = false }) => {
  const [message, setMessage] = useState('');
  const [charCount, setCharCount] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea as user types
  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to auto to get the correct scrollHeight
      textareaRef.current.style.height = 'auto';
      // Set the height to scrollHeight to fit content
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
    // Update character count
    setCharCount(message.length);
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isTyping) {
      onSendMessage(message);
      setMessage('');
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Send on Enter (without Shift)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  return (
    <div className={styles.inputWrapper}>
      <form onSubmit={handleSubmit} className={styles.inputContainer}>
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message... (Enter to send, Shift+Enter for new line)"
          className={styles.input}
          aria-label="Type a message"
          maxLength={MAX_CHARS}
          disabled={isTyping}
          rows={1}
        />
        {message.length > 0 && (
          <div className={`${styles.charCount} ${charCount > MAX_CHARS * 0.9 ? styles.charCountWarning : ''}`}>
            {charCount}/{MAX_CHARS}
          </div>
        )}
        <button 
          type="submit" 
          className={styles.sendButton}
          disabled={!message.trim() || isTyping}
          aria-label="Send message"
          title="Send message"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className={styles.sendIcon}
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
    </form>
    </div>
    );
};

export default ChatInput;