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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }
};

const SuggestionGrid: React.FC<SuggestionGridProps> = ({ onSelect }) => {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center h-full px-4 pb-12"
    >
      <motion.div variants={itemVariants} className="mb-8 text-center space-y-2">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          How can I help you?
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-md">
        {SUGGESTIONS.map((suggestion) => (
          <motion.button
            key={suggestion.id}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(suggestion.subtitle)}
            className="flex flex-col items-start p-3 text-left bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg transition-colors group"
          >
            <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {suggestion.title}
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {suggestion.subtitle}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default SuggestionGrid;
