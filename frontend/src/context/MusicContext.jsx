import { createContext, useState } from 'react';
import { useRef } from 'react';

export const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
    const [query, setQuery] = useState('');
    const apiBase = 'https://saavn.dev/api'
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




    return (
        <MusicContext.Provider value={{
            error, setError,
            tracks, setTracks,
            loading, setLoading,
            activeTrack, setActiveTrack,
            query, setQuery,
            apiBase, showResults, setShowResults, resultRef,
            audioRef, isPlaying, setIsPlaying, progress, setProgress,
            progressRef, isDragging, setIsDragging, svgRef, handleSeek
        }}>
            {children}
        </MusicContext.Provider>
    );
};
