import React from 'react';
import styles from '../ChatWidget.module.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatBubbleProps {
  message: Message;
  isUser: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, isUser }) => {
  return (
    <div className={isUser ? styles.userBubble : styles.botBubble}>
      {message.content}
    </div>
  );
};

export default ChatBubble;