const liked = [
  { title: "Lovely", artist: "When we all..." },
  { title: "Bad Guy", artist: "When we all..." },
  { title: "Ocean Eyes", artist: "Common Culture" },
  { title: "Hostage", artist: "Don’t smile at..." },
  { title: "Bury a Friend", artist: "When we all..." },
];

export default function LikedSongs() {
  return (
    <div className="glass p-4">
      <div className="flex items-center gap-3 mb-4">
        <img src="/billie.jpg" alt="Billie" className="w-14 h-14 rounded-lg" />
        <div>
          <p className="font-semibold">Billie Eilish</p>
          <p className="text-xs text-blue-400">✅ Verified • 18M Listeners</p>
        </div>
      </div>
      <h4 className="mb-2 text-sm font-semibold">Liked Songs</h4>
      <ul className="space-y-2 text-sm">
        {liked.map((song, idx) => (
          <li key={idx} className="flex justify-between items-center">
            <div>
              <p>{song.title}</p>
              <p className="text-gray-400 text-xs">{song.artist}</p>
            </div>
            <span className="text-primary text-lg">❤️</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
