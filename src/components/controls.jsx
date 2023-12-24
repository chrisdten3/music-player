import React from "react";
import { IconContext } from "react-icons";
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from "react-icons/fa";

const Controls = ({ isPlaying, setIsPlaying, handleNext, handlePrev }) => {
  return (
    <IconContext.Provider value={{ size: "65px", color: "#C4D0E3" }}>
      <div className="flex justify-between items-center w-full h-[60%] p-20">
        <FaStepBackward
          onClick={handlePrev}
          className="control-btn transform transition-transform duration-300 hover:scale-125 text-blue-500 hover:text-blue-700"
        />
        <div
          onClick={() => setIsPlaying(!isPlaying)}
          className="control-btn transform transition-transform duration-300 hover:scale-125 text-blue-500 hover:text-blue-700"
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </div>
        <FaStepForward
          onClick={handleNext}
          className="control-btn transform transition-transform duration-300 hover:scale-125 text-blue-500 hover:text-blue-700"
        />
      </div>
    </IconContext.Provider>
  );
};

export default Controls;
