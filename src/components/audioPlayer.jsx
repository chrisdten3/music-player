import React, { useState, useRef, useEffect } from 'react';
import Controls from './controls';

const AudioPlayer = ({ currentTrack, total, currentIndex, setCurrentTrackIndex }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);

  const audioSrc = total[currentIndex]?.track.preview_url;
  const audioRef = useRef(new Audio(audioSrc));
  const intervalRef = useRef();
  const isReady = useRef(false);

  const { duration } = audioRef.current;
  const currentPercentage = duration ? (trackProgress / duration) * 100 : 0;

  const startTimer = () => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        handleNext();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      clearInterval(intervalRef.current);
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.pause();
    audioRef.current = new Audio(audioSrc);

    setTrackProgress(audioRef.current.currentTime);

    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      isReady.current = true;
    }
  }, [currentIndex]);

  useEffect(() => {
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  const handleNext = () => {
    if (currentIndex < total.length - 1) {
      setCurrentTrackIndex(currentIndex + 1);
    } else setCurrentTrackIndex(0);
  };

  const handlePrev = () => {
    if (currentIndex - 1 < 0) setCurrentTrackIndex(total.length - 1);
    else setCurrentTrackIndex(currentIndex - 1);
  };

  const addZero = (n) => {
    return n > 9 ? "" + n : "0" + n;
  };

  return (
    <div>
      <div className='flex flex-col items-center'>
        <Controls
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          handleNext={handleNext}
          handlePrev={handlePrev}
          total={total}
        />

        <h2 className="duration text-white font-bold text-3xl flex items-center justify-center w-full">
          0:{addZero(Math.round(trackProgress))}
        </h2>
        
      </div>
    </div>
  );
};

export default AudioPlayer;
