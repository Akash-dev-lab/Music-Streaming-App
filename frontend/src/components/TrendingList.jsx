import { useContext } from "react";
import SplitText from "../SplitText";
import { MusicContext } from '../context/MusicContext';
import ShinyText from "../ShinyText"; '../ShinyText';

export default function TrendingList() {

  const { tracks, error, setActiveTrack } = useContext(MusicContext)

  return (
    <div className="glass p-4">
      <div className="flex justify-between items-center mb-3">
        <SplitText
          text="Searches.."
          className="text-lg font-semibold"
        // animation props...
        />
        <button className="text-primary text-sm">Listen More →</button>
      </div>
      {tracks.length > 0 ? (
        <div className="max-h-64 overflow-y-auto custom-scrollbar">
          <ul>
            {tracks.map((song, idx) => (
              <li
                key={idx}
                className="flex justify-between py-2 border-b border-white/10 cursor-pointer"
                onClick={() => setActiveTrack(song)}
              >
                <div className="flex items-center gap-8">
                  <img className="w-16 h-16" src={song.image[2]?.url} alt={song.name} />
                  <span className="text-sm text-gray-400">{song.name}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        
        
      ) : (
        <div className="text-center">
          <ShinyText text={error ? "No Search Results available" : "Search albums or songs above."} disabled={false} speed={3} className='custom-class text-center' />
        </div>
      )}
    </div>
  );

}
