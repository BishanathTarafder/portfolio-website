import React from 'react';

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
    <div className="flex flex-col items-center justify-center h-full px-4 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 text-center space-y-2">
        <div className="w-12 h-12 mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl flex items-center justify-center shadow-sm">
           <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-zinc-900 dark:text-zinc-100"
          >
            <path d="M16.5 7.5h-9v9h9v-9z" />
            <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
          </svg>
        </div>
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
    </div>
  );
};

export default SuggestionGrid;
