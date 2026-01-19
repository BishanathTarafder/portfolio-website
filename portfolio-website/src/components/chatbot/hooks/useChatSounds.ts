import { useCallback } from 'react';

export const useChatSounds = () => {
  const playSound = useCallback((soundName: 'open' | 'close' | 'send' | 'reply') => {
    const audio = new Audio(`/sounds/chat-${soundName}.mp3`);
    audio.volume = 0.4;
    audio.play().catch((error) => {
      // Ignore errors (e.g., user hasn't interacted with document yet)
      console.warn('Audio play failed:', error);
    });
  }, []);

  return { playSound };
};
