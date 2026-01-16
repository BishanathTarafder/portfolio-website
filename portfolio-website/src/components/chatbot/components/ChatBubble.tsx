import React, { useState, useEffect } from 'react';
import styles from '../ChatWidget.module.css';

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
  const timestamp = message.timestamp || new Date();
  
  // Animation effect when message appears
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className={`${styles.messageBubbleWrapper} ${isUser ? styles.userBubbleWrapper : styles.botBubbleWrapper}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: `translateY(${visible ? 0 : '10px'})`,
        transition: 'opacity 0.3s ease, transform 0.3s ease'
      }}
    >
      <div className={`${styles.messageBubble} ${isUser ? styles.userBubble : styles.botBubble}`}>
        <div className={styles.messageContent}>{message.content}</div>
        <div className={styles.messageFooter}>
          <span className={styles.timestamp}>{formatTime(timestamp)}</span>
          {!isUser && (
            <button 
              onClick={copyToClipboard} 
              className={styles.copyButton}
              aria-label="Copy message"
              title="Copy to clipboard"
            >
              {copied ? (
                <svg xmlns="http://www.w3.org/2000/svg" className={styles.copyIcon} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className={styles.copyIcon} viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                  <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;