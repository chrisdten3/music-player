import { createContext, useContext } from 'react';

export const SpotifyPlayerContext = createContext({ player: null, deviceId: null });
export const useSpotifyPlayer = () => useContext(SpotifyPlayerContext);
