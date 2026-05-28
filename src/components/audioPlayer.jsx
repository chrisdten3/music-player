import React, { useState, useEffect } from 'react';
import Controls from './controls';
import { useSpotifyPlayer } from '../SpotifyPlayerContext';

const AudioPlayer = ({ total, currentIndex }) => {
  const { player } = useSpotifyPlayer();
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);

  useEffect(() => {
    if (!player) return;
    const onStateChange = (state) => {
      if (!state) return;
      setIsPlaying(!state.paused);
      setTrackProgress(Math.round(state.position / 1000));
    };
    player.addListener('player_state_changed', onStateChange);
    return () => player.removeListener('player_state_changed', onStateChange);
  }, [player]);

  // Tick progress locally while playing for smooth display
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => setTrackProgress((p) => p + 1), 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleNext = () => player?.nextTrack();
  const handlePrev = () => player?.previousTrack();

  const addZero = (n) => (n > 9 ? '' + n : '0' + n);
  const minutes = Math.floor(trackProgress / 60);
  const seconds = Math.round(trackProgress % 60);

  return (
    <div>
      <div className='flex flex-col items-center'>
        <Controls
          isPlaying={isPlaying}
          setIsPlaying={() => player?.togglePlay()}
          handleNext={handleNext}
          handlePrev={handlePrev}
          total={total}
        />
        <h2 className="duration text-white font-bold text-3xl flex items-center justify-center w-full">
          {addZero(minutes)}:{addZero(seconds)}
        </h2>
      </div>
    </div>
  );
};

export default AudioPlayer;

