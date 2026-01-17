import React from 'react';
import { motion } from 'framer-motion';

interface SuggestionGridProps {
  onSelect: (text: string) => void;
}

const SUGGESTIONS = [
  {
    id: 'projects',
    title: 'Projects',
    subtitle: 'Tell me about your work'
  },
  {
    id: 'skills',
    title: 'Skills',
    subtitle: 'What tech stack do you use?'
  },
  {
    id: 'experience',
    title: 'Experience',
    subtitle: 'Where have you worked?'
  },
  {
    id: 'contact',
    title: 'Contact',
    subtitle: 'How can I reach you?'
  }
];

const SuggestionGrid: React.FC<SuggestionGridProps> = ({ onSelect }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col items-center justify-center h-full px-4 pb-12"
    >
      <div className="mb-8 text-center space-y-2">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          How can I help you?
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-md">
        {SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion.id}
            onClick={() => onSelect(suggestion.subtitle)}
            className="flex flex-col items-start p-3 text-left bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg transition-colors group"
          >
            <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-950 dark:group-hover:text-white">
              {suggestion.title}
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {suggestion.subtitle}
            </span>
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default SuggestionGrid;
