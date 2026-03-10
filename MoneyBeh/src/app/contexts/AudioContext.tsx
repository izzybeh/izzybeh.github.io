import { createContext, useContext, useState, type ReactNode } from 'react';
import type { ContentItem } from '../data/content';

interface AudioContextType {
  currentlyPlaying: ContentItem | null;
  setCurrentlyPlaying: (episode: ContentItem | null) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<ContentItem | null>(null);

  return (
    <AudioContext.Provider value={{ currentlyPlaying, setCurrentlyPlaying }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
