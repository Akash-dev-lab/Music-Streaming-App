import { FiSearch, FiBell, FiSettings } from "react-icons/fi";
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { MusicContext } from '../context/MusicContext';
import FuzzyText from '../FuzzyText';

export default function Header() {

    const { error, tracks, loading, query, setQuery, setError, setTracks, setLoading, setActiveTrack, apiBase, showResults, setShowResults, resultRef } = useContext(MusicContext);

    const [enableHover] = useState(true);
    const [baseIntensity] = useState(0.2);
    const [hoverIntensity] = useState(0.5);


    const handleSearch = async e => {
        e.preventDefault();
        if (!query) return;

        setLoading(true);
        setError(null);
        setTracks([]);
        setActiveTrack(null);

        try {
            const songRes = await axios.get(`${apiBase}/search/songs`, { params: { query } });
            const albumRes = await axios.get(`${apiBase}/search/albums`, { params: { query } });

            const songResults = songRes.data.data.results.filter(
                track => track.downloadUrl && track.downloadUrl.length > 0
            );
            const albumResults = albumRes.data.data.results;

            const combined = [...songResults, ...albumResults];

            if (combined.length > 0) {
                setTracks(combined);
                setShowResults(true);
            } else {
                setError('No playable songs or albums found.');
            }
        } catch (err) {
            console.error('Search failed:', err);
            setError(<FuzzyText className="text-center" baseIntensity={baseIntensity} hoverIntensity={hoverIntensity} enableHover={enableHover}>Failed to fetch songs or albums ☁️</FuzzyText>);
            

        } finally {
            setLoading(false);
        }
    };


    const handleTrackSelect = track => {
        // console.log(track)
        setActiveTrack(track);
        setShowResults(false);
    };

    useEffect(() => {
        const handleClickOutside = e => {
            if (resultRef.current && !resultRef.current.contains(e.target)) {
                setShowResults(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="flex z-10 items-center justify-between px-6 py-3 bg-white/5 backdrop-blur-md border-t border-white/30 rounded-2xl shadow-sm relative">
            {/* Profile Info */}
            <div className="flex items-center gap-4">
                <img
                    src="/avatar.jpg"
                    alt="User"
                    className="w-10 h-10 rounded-full border border-white/20"
                />
                <div>
                    <p className="text-sm font-medium">Steve Smith</p>
                    <p className="text-xs text-primary font-semibold">Pro User 👑</p>
                </div>
            </div>
                        <form
                            onSubmit={handleSearch}
                            className="flex items-center bg-white/10 rounded-full px-4 py-1.5 w-72 shadow-inner"
                        >
                            <input
                                value={query}
                                onChange={e => setQuery(e.target.value)}
                                type="text"
                                placeholder="Search"
                                className="bg-transparent text-amber-500 outline-none w-full text-sm placeholder-amber-500 [caret-color:#f59e42]"
                            />
                            <button className="cursor-pointer" type="submit">
                                <FiSearch className="text-amber-500" />
                            </button>
                        </form>

                        {showResults && (
                            <div
                                ref={resultRef}
                                className="absolute left-1/2 top-20 transform -translate-x-1/2 bg-gray-900 rounded-xl p-4 z-10 mt-2 w-[30rem] max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-amber-400 scrollbar-track-gray-800 scrollbar-thumb-rounded-full"
                                style={{
                                    scrollbarWidth: 'thin',
                                    scrollbarColor: '#f59e42 #2d2d2d',
                                    borderRadius: '1rem'
                                }}
                            >
                                <style>
                                    {`
                                    /* Custom scrollbar for Webkit browsers */
                                    .scrollbar-thin::-webkit-scrollbar {
                                        width: 8px;
                                        border-radius: 8px;
                                        background: #2d2d2d;
                                    }
                                    .scrollbar-thin::-webkit-scrollbar-thumb {
                                        background: #f59e42;
                                        border-radius: 8px;
                                    }
                                    `}
                                </style>
                                {loading ? (
                                    <div className="space-y-4">
                                        {[...Array(4)].map((_, i) => (
                                            <div key={i} className="flex animate-pulse space-x-4">
                                                <div className="w-16 h-16 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] bg-no-repeat" style={{ backgroundSize: '200% 100%' }}></div>
                                                <div className="flex-1 space-y-4 py-1">
                                                    <div className="h-2 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] bg-no-repeat"></div>
                                                    <div className="grid grid-cols-3 gap-4">
                                                        <div className="col-span-2 h-2 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] bg-no-repeat"></div>
                                                        <div className="col-span-1 h-2 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] bg-no-repeat"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {tracks.map((track, index) => (
                                            <div
                                                key={index}
                                                onClick={() => handleTrackSelect(track)}
                                                className="cursor-pointer p-4 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition"
                                            >
                                                <img
                                                    src={track.image[2].url}
                                                    alt={track.name}
                                                    className="w-full rounded"
                                                />
                                                <h3 className="mt-2 text-lg font-semibold">{track.name}</h3>
                                                <p className="text-sm text-orange-300">{track.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Icons */}
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center border border-amber-500 cursor-pointer hover:bg-amber-500 transition">
                    <FiSettings className="text-amber-500 hover:text-white text-lg" />
                </div>
                <div className="w-9 h-9 rounded-full cursor-pointer bg-white/10 flex items-center justify-center border border-amber-500 hover:bg-amber-500 transition">
                    <FiBell className="text-amber-500 hover:text-white text-lg" />
                </div>
            </div>
        </div>
    );
}
