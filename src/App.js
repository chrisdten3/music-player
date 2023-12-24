import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/sidebar';
import Home from './screens/home';
import Feed from './screens/feed';
import Favorites from './screens/favorites';
import Library from './screens/library';
import Player from './screens/player';
import Trending from './screens/trending';
import Stats from './screens/stats';
import Account from './screens/account';
import Login from './screens/login';
import { setClientToken } from './spotify';

function App() {
  const [token, setToken] = useState(""); 
  useEffect(() => {
    const token = window.localStorage.getItem('token');
    const hash = window.location.hash;
    window.location.hash = '';
    if (!token && hash) {
      const _token = hash.split('&')[0].split('=')[1];
      window.localStorage.setItem('token', _token);
      setToken(_token);
      setClientToken(_token);
    } else {
      setToken(token);
      setClientToken(token); 
    }
  }, []);
  return !token ? (
    <Login />
  ) : (
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
  );
}

export default App;
