import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/sidebar';
import Library from './screens/library';
import Player from './screens/player';
import Stats from './screens/stats';
import Account from './screens/account';
import Login from './screens/login';
import { setClientToken, exchangeCodeForToken } from './spotify';
import { SpotifyPlayerContext } from './SpotifyPlayerContext';

function App() {
  const [token, setToken] = useState("");
  const [sdkPlayer, setSdkPlayer] = useState(null);
  const [deviceId, setDeviceId] = useState(null);

  useEffect(() => {
    const storedToken = window.localStorage.getItem('token');
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      // Remove the code from the URL
      window.history.replaceState({}, document.title, window.location.pathname);
      exchangeCodeForToken(code).then((_token) => {
        if (_token) {
          window.localStorage.removeItem('code_verifier');
          window.localStorage.setItem('token', _token);
          setToken(_token);
          setClientToken(_token);
        }
      });
    } else if (storedToken) {
      setToken(storedToken);
      setClientToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (!token) return;
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'Music Player',
        getOAuthToken: (cb) => cb(token),
        volume: 0.5,
      });
      player.addListener('ready', ({ device_id }) => setDeviceId(device_id));
      player.connect();
      setSdkPlayer(player);
    };

    return () => {
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, [token]);

  return !token ? (
    <Login />
  ) : (
    <SpotifyPlayerContext.Provider value={{ player: sdkPlayer, deviceId }}>
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-[25%]"> {/* Adding ml-64 (adjust margin as needed) */}
        {        
        <Routes>
          <Route path="/" element={<Library />} />
          <Route path="/library" element={<Library />} />
          <Route path="/player" element={<Player />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/account" element={<Account />} />
        </Routes> 
        }
      </div>
    </div>
    </SpotifyPlayerContext.Provider>
  );
}

export default App;
