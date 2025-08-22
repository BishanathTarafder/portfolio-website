import React from 'react';
import styles from '../ChatWidget.module.css';

const ChatToggle = ({ isOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ${isOpen ? 'scale-0 opacity-0' : `scale-100 opacity-100 ${styles.pulse}`}`}
      aria-label={isOpen ? 'Close chat' : 'Open chat'}
    >
      {!isOpen && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      )}
    </button>
  );
};

export default ChatToggle;