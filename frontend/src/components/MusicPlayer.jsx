import { useEffect, useContext, useRef } from 'react';
import { FiPlay, FiPause, FiSkipBack, FiSkipForward } from 'react-icons/fi';
import { MusicContext } from '../context/MusicContext';

export default function MusicPlayer() {
  const {
    activeTrack,
    tracks,
    setActiveTrack,
    audioRef,
    isPlaying,
    setIsPlaying,
    progress,
    setProgress,
    progressRef,
    handleSeek,
  } = useContext(MusicContext);

  

  const title = activeTrack?.name || 'Select a Song';
  const artist = activeTrack?.artists?.primary?.map(a => a.name).join(', ') || 'BotMusic';
  const image = activeTrack?.image?.[2]?.url || '';
  const audioUrl = activeTrack?.downloadUrl?.[4]?.url || '';

  const togglePlayback = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const percentage = (audioRef.current.currentTime / audioRef.current.duration) * 100;
    setProgress(percentage || 0);
  };

  const handleNext = () => {
    if (!tracks?.length) return;
    const currentIndex = tracks.findIndex(t => t.id === activeTrack?.id);
    const nextTrack = tracks[currentIndex + 1] || tracks[0];
    setActiveTrack(nextTrack);
  };

  const handlePrev = () => {
    if (!tracks?.length) return;
    const currentIndex = tracks.findIndex(t => t.id === activeTrack?.id);
    const prevTrack = tracks[currentIndex - 1] || tracks[tracks.length - 1];
    setActiveTrack(prevTrack);
  };

  return (
    <div className="glass p-6 flex flex-col sm:flex-row items-center gap-6 transition-all duration-300">
      <img src={image} alt="cover" className="w-40 rounded-lg object-cover" />
      <div className="w-full">
        <button className="bg-primary text-sm px-4 py-1 rounded-full mb-2">🔥 Now Playing</button>
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="text-sm text-gray-300 mb-2">by {artist}</p>

        <div className="flex gap-3 mt-2">
          <button onClick={handlePrev} className="w-8 h-8 bg-white/10 rounded-full text-white flex items-center justify-center">
            <FiSkipBack />
          </button>
          <button onClick={togglePlayback} className="w-8 h-8 bg-orange-500 rounded-full text-white flex items-center justify-center shadow-lg hover:scale-110 transition">
            {isPlaying ? <FiPause /> : <FiPlay />}
          </button>
          <button onClick={handleNext} className="w-8 h-8 bg-white/10 rounded-full text-white flex items-center justify-center">
            <FiSkipForward />
          </button>
        </div>

        {/* Waveform Progress */}
        <div className="mt-4 w-full h-2 cursor-pointer" onClick={handleSeek}
            ref={progressRef}>
          <svg viewBox="0 0 400 40"  className="w-full h-12">
            <rect
              x="0"
              y="0"
              width={`${progress}%`}
              height="10%"
              fill="url(#waveGradient)"
              opacity="0.15"
            />
             <circle
              cx={(progress * 4).toString()}
              cy="2"
              r="6"
              fill="#e0531f"
              stroke="#fff"
              strokeWidth="1"
            />
          </svg>
        </div>

        {/* Audio Element */}
        <audio
          ref={audioRef}
          src={audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
          autoPlay
        />
      </div>
    </div>
  );
}
