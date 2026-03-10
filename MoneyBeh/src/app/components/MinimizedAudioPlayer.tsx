import { Play, Pause, SkipBack, SkipForward, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAudio } from '../contexts/AudioContext';
import { contentData } from '../data/content';

export function MinimizedAudioPlayer() {
  const { currentlyPlaying, setCurrentlyPlaying } = useAudio();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    
    const handleEnded = () => {
      setIsPlaying(false);
      // Auto-advance to next episode
      if (currentlyPlaying) {
        const currentIndex = contentData.findIndex(item => item.id === currentlyPlaying.id);
        const nextEpisode = contentData[currentIndex + 1];
        
        if (nextEpisode) {
          // Play next episode
          setCurrentlyPlaying(nextEpisode);
        } else {
          // Last episode - stop playing
          setCurrentlyPlaying(null);
        }
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentlyPlaying, setCurrentlyPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentlyPlaying) return;

    // Load new audio when episode changes and auto-play
    audio.load();
    audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
  }, [currentlyPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const togglePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  const handleSkip = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, Math.min(audio.currentTime + seconds, duration));
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentlyPlaying(null);
    setIsPlaying(false);
  };

  const handlePlayerClick = () => {
    if (currentlyPlaying) {
      navigate(`/learn/${currentlyPlaying.slug}`);
    }
  };

  if (!currentlyPlaying) return null;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <>
      <audio ref={audioRef}>
        {currentlyPlaying.audioUrl && (
          <source src={currentlyPlaying.audioUrl} type="audio/mpeg" />
        )}
      </audio>

      {/* Minimized Player Bar - Sticky at bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-paper border-t border-warm-gray-300 shadow-2xl">
        {/* Progress Bar */}
        <div className="h-1 bg-warm-gray-200 relative">
          <div 
            className="h-full bg-deep-teal-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Player Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between gap-3 sm:gap-4">
            {/* Episode Info - Clickable */}
            <button
              onClick={handlePlayerClick}
              className="flex items-center gap-3 flex-1 min-w-0 text-left hover:opacity-80 transition-opacity"
            >
              {/* Episode Thumbnail */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-deep-teal-500 rounded flex items-center justify-center flex-shrink-0">
                <Play className="w-5 h-5 sm:w-6 sm:h-6 text-paper fill-paper" />
              </div>

              {/* Episode Title & Number */}
              <div className="flex-1 min-w-0">
                <div className="text-sm sm:text-base text-warm-gray-900 truncate leading-tight">
                  {currentlyPlaying.title}
                </div>
                <div className="text-xs sm:text-sm text-warm-gray-600 truncate">
                  Episode {currentlyPlaying.number} • The MoneyBeh Podcast
                </div>
              </div>
            </button>

            {/* Controls */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              {/* Skip Back Button - Hidden on small mobile */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSkip(-15);
                }}
                className="hidden sm:flex w-8 h-8 items-center justify-center text-warm-gray-700 hover:text-deep-teal-600 hover:bg-warm-gray-100 rounded-full transition-colors touch-manipulation"
                aria-label="Skip back 15 seconds"
              >
                <SkipBack className="w-5 h-5" />
              </button>

              {/* Play/Pause Button */}
              <button
                onClick={togglePlayPause}
                className="w-10 h-10 sm:w-11 sm:h-11 bg-deep-teal-500 hover:bg-deep-teal-600 active:bg-deep-teal-700 rounded-full flex items-center justify-center transition-colors touch-manipulation"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 sm:w-6 sm:h-6 text-paper fill-paper" />
                ) : (
                  <Play className="w-5 h-5 sm:w-6 sm:h-6 text-paper fill-paper ml-0.5" />
                )}
              </button>

              {/* Skip Forward Button - Hidden on small mobile */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSkip(15);
                }}
                className="hidden sm:flex w-8 h-8 items-center justify-center text-warm-gray-700 hover:text-deep-teal-600 hover:bg-warm-gray-100 rounded-full transition-colors touch-manipulation"
                aria-label="Skip forward 15 seconds"
              >
                <SkipForward className="w-5 h-5" />
              </button>

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="w-8 h-8 text-warm-gray-500 hover:text-warm-gray-700 hover:bg-warm-gray-100 rounded-full flex items-center justify-center transition-colors touch-manipulation"
                aria-label="Close player"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}