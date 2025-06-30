import Header from "./components/Header";
import MusicPlayer from "./components/MusicPlayer";
import TrendingList from "./components/TrendingList";
import LikedSongs from "./components/LikedSongs";
import { useContext, useEffect } from 'react';
import { MusicContext } from './context/MusicContext';

const App = () => {

  const { error, progress, handleSeek, svgRef, isDragging, setIsDragging, progressRef } = useContext(MusicContext);

  const wavePath = () => {
    const width = 400;
    const height = 50;
    let d = `M 0 ${height / 2}`;
    for (let x = 1; x <= width; x++) {
      const y = height / 2 + Math.sin(x * 0.25) * 10 * Math.random();
      d += ` L ${x} ${y.toFixed(2)}`;
    }
    return d;
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e) => {
    if (!isDragging || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const width = rect.width;
    const newProgress = Math.min(Math.max((offsetX / width) * 100, 0), 100);
    handleSeek(newProgress);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="w-full h-screen bg-black relative overflow-hidden">
      {/* Background iframe */}
      <iframe
        src="https://my.spline.design/genkubgreetingrobotaccentcolor17ffff-mzp5iUjZWh52adOKegGWilhg/"
        width="50%"
        height="50%"
        className="absolute inset-0 w-96 h-96 left-60 top-[10%] z-0"
        title="Background Animation"
      ></iframe>

      {error && (
        <div className="text-red-500 text-center mt-4 animate-pulse">
          ☁️{error}
        </div>
      )}


      {/* Centered Foreground Content */}

      {/* Wave Progress Bar */}

      <div className="flex flex-col gap-40">
        <div className="w-full flex justify-center items-center" onMouseDown={handleMouseDown} ref={progressRef}>
          <svg
            viewBox="0 0 400 40"
            className="w-full h-20 absolute left-1 mt-35"
          >
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#e0531f" />
              </linearGradient>
            </defs>
            <path
              d={wavePath()}
              fill="none"
              stroke="url(#waveGradient)"
              strokeWidth="2"
            />
            <rect
              x="0"
              y="0"
              width={`${progress}%`}
              height="100%"
              fill="url(#waveGradient)"
              opacity="0.2"
            />
          </svg>

        </div>

        <div className="w-1/2 h-auto mx-auto top-[20%] bg-gradient-to-br from-[#111]/70 via-[#222]/70 to-[#000]/70 text-white p-6 rounded-xl shadow-lg relative z-10">
          <Header />

          <div className="grid grid-cols-3 gap-6 mt-6">
            <div className="col-span-2 space-y-6">
              <MusicPlayer />
              {/* <SoundCloudSearch /> */}
              <TrendingList />
            </div>
            <LikedSongs />
          </div>
        </div>
      </div>
    </div>

  )
}



export default App

