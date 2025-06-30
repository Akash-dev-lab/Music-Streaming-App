import { getSpotifyToken } from '../utils/authHelpers';

export default function LoginButton({ setToken }) {
  const handleLogin = async () => {
    const token = await getSpotifyToken();
    setToken(token);
  };

  return (
    <div className="text-white text-center p-10">
      <button
        onClick={handleLogin}
        className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-700 text-white font-bold shadow-lg hover:scale-105 transition">
        Get Spotify Access
      </button>
    </div>
  );
}