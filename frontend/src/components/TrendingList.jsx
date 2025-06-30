const trending = [
  { id: 1, title: "Take on Me", artist: "A-ha", time: "3:45", listens: "1m" },
  { id: 2, title: "A Groovy Kind of Love", artist: "Carole B.", time: "3:30", listens: "2k" },
  { id: 3, title: "Time After Time", artist: "Cyndi L.", time: "4:03", listens: "10k" },
];

export default function TrendingList() {
  return (
    <div className="glass p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">Trending Now</h3>
        <button className="text-primary text-sm">Listen More →</button>
      </div>
      <ul>
        {trending.map((song) => (
          <li key={song.id} className="flex justify-between py-2 border-b border-white/10">
            <span>{song.id}. {song.title}</span>
            <span className="text-sm text-gray-400">{song.time} • {song.listens}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
