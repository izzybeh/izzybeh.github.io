import { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX
} from 'lucide-react';
import { SkipIcon } from './icons/SkipIcon';

interface AudioPlayerProps {
  audioUrl?: string;
  title: string;
  duration: string;
}

export function AudioPlayer({ audioUrl, title, duration }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isDragging, setIsDragging] = useState(false);

  const playbackSpeeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

  // Initialize audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setTotalDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch(e.code) {
        case 'Space':
          e.preventDefault();
          togglePlay();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          skipBackward();
          break;
        case 'ArrowRight':
          e.preventDefault();
          skipForward();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const skipForward = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(audio.currentTime + 15, audio.duration);
  };

  const skipBackward = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(audio.currentTime - 15, 0);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const bounds = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const percentage = x / bounds.width;
    audio.currentTime = percentage * audio.duration;
  };

  const handleProgressDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    
    const audio = audioRef.current;
    if (!audio) return;

    const bounds = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const percentage = Math.max(0, Math.min(1, x / bounds.width));
    audio.currentTime = percentage * audio.duration;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (newVolume > 0) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = volume;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const changePlaybackSpeed = (speed: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.playbackRate = speed;
    setPlaybackRate(speed);
  };

  const formatTime = (seconds: number): string => {
    if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
    
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatRemainingTime = (seconds: number): string => {
    if (isNaN(seconds) || !isFinite(seconds)) return '-0:00';
    return `-${formatTime(seconds)}`;
  };

  const progressPercentage = totalDuration > 0 ? (currentTime / totalDuration) * 100 : 0;
  const remainingTime = totalDuration - currentTime;

  // Demo audio URL if none provided
  const audioSrc = audioUrl || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

  return (
    <div className="bg-paper rounded-lg overflow-hidden">
      {/* Hidden Audio Element */}
      <audio ref={audioRef} src={audioSrc} preload="metadata" />

      {/* Main Player Container */}
      <div className="p-5 sm:p-6 space-y-5 sm:space-y-6">
        
        {/* Progress Bar - Prominent and Easy to Tap */}
        <div className="space-y-2">
          <div 
            className="cursor-pointer group touch-manipulation"
            onClick={handleProgressClick}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseMove={handleProgressDrag}
            onMouseLeave={() => setIsDragging(false)}
          >
            <div className="h-2.5 sm:h-2 bg-warm-gray-200 rounded-full overflow-hidden active:h-3 sm:hover:h-3 transition-all">
              <div 
                className="h-full bg-deep-teal-500 rounded-full relative transition-all"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-3 sm:h-3 bg-paper border-2 border-deep-teal-600 rounded-full shadow-sm opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity"></div>
              </div>
            </div>
          </div>
          
          {/* Time Display */}
          <div className="flex items-center justify-between text-sm text-warm-gray-600">
            <span className="tabular-nums">{formatTime(currentTime)}</span>
            <span className="tabular-nums">{formatRemainingTime(remainingTime)}</span>
          </div>
        </div>

        {/* Main Controls - Mobile-First Layout */}
        <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6">
          
          {/* Playback Controls */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
            {/* Skip Backward 15s - Large Touch Target */}
            <button
              onClick={skipBackward}
              className="w-12 h-12 sm:w-11 sm:h-11 flex items-center justify-center text-deep-teal-600 hover:bg-deep-teal-50 active:bg-deep-teal-100 rounded-full transition-colors touch-manipulation font-medium text-sm"
              aria-label="Skip back 15 seconds"
            >
              <SkipIcon seconds={15} className="w-11 h-11 sm:w-10 sm:h-10" direction="backward" />
            </button>

            {/* Play/Pause - Hero Element */}
            <button
              onClick={togglePlay}
              className="w-16 h-16 sm:w-14 sm:h-14 flex-shrink-0 bg-deep-teal-500 hover:bg-deep-teal-600 active:bg-deep-teal-700 rounded-full flex items-center justify-center transition-all shadow-md active:shadow-lg touch-manipulation"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-7 h-7 sm:w-6 sm:h-6 text-paper fill-paper" />
              ) : (
                <Play className="w-7 h-7 sm:w-6 sm:h-6 text-paper fill-paper ml-0.5" />
              )}
            </button>

            {/* Skip Forward 15s - Large Touch Target */}
            <button
              onClick={skipForward}
              className="w-12 h-12 sm:w-11 sm:h-11 flex items-center justify-center text-deep-teal-600 hover:bg-deep-teal-50 active:bg-deep-teal-100 rounded-full transition-colors touch-manipulation font-medium text-sm"
              aria-label="Skip forward 15 seconds"
            >
              <SkipIcon seconds={15} className="w-11 h-11 sm:w-10 sm:h-10" direction="forward" />
            </button>
          </div>

          {/* Secondary Controls - Simplified Mobile */}
          <div className="flex items-center justify-center gap-4 sm:gap-5 w-full sm:w-auto sm:ml-auto">
            
            {/* Playback Speed - Compact Selector */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-warm-gray-600 hidden sm:inline">Speed:</span>
              <select
                value={playbackRate}
                onChange={(e) => changePlaybackSpeed(parseFloat(e.target.value))}
                className="text-sm bg-warm-gray-100 text-warm-gray-700 border-none rounded-lg px-3 py-2 cursor-pointer hover:bg-warm-gray-200 focus:outline-none focus:ring-2 focus:ring-deep-teal-500 touch-manipulation"
                aria-label="Playback speed"
              >
                {playbackSpeeds.map(speed => (
                  <option key={speed} value={speed}>
                    {speed}x
                  </option>
                ))}
              </select>
            </div>

            {/* Volume - Desktop Only (Simplified) */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={toggleMute}
                className="text-deep-teal-600 hover:bg-deep-teal-50 active:bg-deep-teal-100 w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20 h-2 accent-deep-teal-500 cursor-pointer"
                aria-label="Volume"
              />
            </div>

            {/* Volume Toggle - Mobile Only */}
            <button
              onClick={toggleMute}
              className="lg:hidden text-deep-teal-600 hover:bg-deep-teal-50 active:bg-deep-teal-100 w-11 h-11 rounded-full flex items-center justify-center transition-colors touch-manipulation"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-6 h-6" />
              ) : (
                <Volume2 className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Hint - Desktop Only */}
      <div className="hidden sm:block px-6 py-3 bg-warm-gray-50 border-t border-warm-gray-200">
        <p className="text-xs text-warm-gray-600 text-center">
          <span className="inline-flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-paper border border-warm-gray-300 rounded text-warm-gray-700">Space</kbd>
            <span>Play/Pause</span>
          </span>
          <span className="mx-2">•</span>
          <span className="inline-flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-paper border border-warm-gray-300 rounded text-warm-gray-700">←</kbd>
            <span>-15s</span>
          </span>
          <span className="mx-2">•</span>
          <span className="inline-flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-paper border border-warm-gray-300 rounded text-warm-gray-700">→</kbd>
            <span>+15s</span>
          </span>
        </p>
      </div>

      {/* Audio Note - Only if using demo */}
      {!audioUrl && (
        <div className="px-5 sm:px-6 pb-5 sm:pb-6">
          <div className="p-3 bg-sand-50 border border-sand-300 rounded-lg">
            <p className="text-xs text-warm-gray-600 text-center leading-relaxed">
              Demo audio playing. Add your podcast URLs to enable your episodes.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}