import { createContext, useState, useRef, useEffect } from 'react';
import { FiPlay, FiPause } from "react-icons/fi";

export const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [query, setQuery] = useState('');
  const apiBase = 'https://saavn.dev/api';
  const [error, setError] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTrack, setActiveTrack] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const resultRef = useRef();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const svgRef = useRef(null);
  const [glowSpeed, setGlowSpeed] = useState('none');
  const [favorites, setFavorites] = useState([]);

  const handleSeek = (e) => {
    if (!progressRef.current || !audioRef.current || !audioRef.current.duration) return;

    const rect = progressRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const width = rect.width;
    const percent = (offsetX / width) * 100;
    const newTime = (percent / 100) * audioRef.current.duration;

    audioRef.current.currentTime = newTime;
    setProgress(percent);
  };

  const handleTrackSelect = track => {
        console.log(track)
        setActiveTrack(track);
        setShowResults(false);
        setIsPlaying(true);
    };

    const toggleFavorite = (track) => {
  const exists = favorites.find(t => t.id === track.id);
  if (exists) {
    setFavorites(favorites.filter(t => t.id !== track.id));
  } else {
    setFavorites([...favorites, track]);
  }
};

 useEffect(() => {
  const fetchTrendingSongs = async () => {
    setLoading(true);
    try {
      // skipping actual trending fetch since API doesn't exist
      // so just leave tracks empty
      setTracks([]);
      // do NOT call setError here
    } catch (err) {
      console.warn('Trending fetch skipped:', err);
      // no setError()
      setTracks([]);
    } finally {
      setLoading(false);
    }
  };
  fetchTrendingSongs();
}, []);



  useEffect(() => {
    if (isPlaying) {
      const speeds = ['slow', 'medium', 'fast'];
      const random = speeds[Math.floor(Math.random() * speeds.length)];
      setGlowSpeed(random);
    } else {
      setGlowSpeed('none');
    }
  }, [isPlaying]);

  return (
    <MusicContext.Provider value={{
      query, setQuery,
      apiBase, error, setError,
      tracks, setTracks,
      loading, setLoading,
      activeTrack, setActiveTrack,
      showResults, setShowResults,
      resultRef, audioRef, isPlaying, setIsPlaying,
      progress, setProgress,
      progressRef, isDragging, setIsDragging,
      svgRef, handleSeek,
      glowSpeed, setGlowSpeed, handleTrackSelect,
      toggleFavorite, favorites, toggleFavorite

    }}>
      {children}
    </MusicContext.Provider>
  );
};
