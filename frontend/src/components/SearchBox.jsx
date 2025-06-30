import { useState } from 'react';
import axios from 'axios';

export default function SearchBar({ token, setTrack }) {
  const [query, setQuery] = useState('');

  const handleSearch = async e => {
    e.preventDefault();
    if (!query) return;

    try {
      const res = await axios.get(`https://api.spotify.com/v1/search`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          q: query,
          type: 'track',
          limit: 1
        }
      });

      setTrack(res.data.tracks.items[0]);
    } catch (err) {
      console.error('Search failed', err);
    }
  };

  return (
    <form onSubmit={handleSearch} className="text-center mt-6">
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search a song..."
        className="px-4 py-2 w-64 rounded-l-md text-black"
      />
      <button type="submit" className="px-4 py-2 bg-orange-500 rounded-r-md text-white">
        Search
      </button>
    </form>
  );
}
