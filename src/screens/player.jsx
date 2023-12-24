import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import apiClient from "../spotify";
import AudioPlayer from "../components/audioPlayer";
import Widgets from "../components/widgets";

const AlbumImage = ({ imageSrc }) => {
    return (
        <div className="h-[80%] w-[80%]">
            <img src={imageSrc} alt="album cover" className="rounded-2xl" />
        </div>
    );
};

const AlbumInfo = ({ info }) => {
    return (
        <div className="h-[30%] flex flex-col justify-center pt-5">
            <h1 className="text-white text-3xl">{info?.name}</h1>
            <h2 className="text-gray-400 text-xl">{info?.artists[0]?.name}</h2>
        </div>
    );
}; 

const Queue = ({ tracks, setCurrentTrackIndex }) => {
    console.log(tracks);
    
    // Slice the tracks array to display the next 10 songs
    const nextTenTracks = tracks.slice(0, 100);
  
    return (
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-white text-3xl">Queue</h1>
          <div className="h-[80%] w-full overflow-y-auto">
            {nextTenTracks.map((track, index) => (
            <div onClick={() => setCurrentTrackIndex(index)} >
                <p key={index}
                className="text-white pb-3 pl-5 hover:scale-90 transition-transform duration-200 ease-in-out"
                >{track?.track?.name}</p>
              </div>
            ))}
          </div>
        </div>
    );
  };
  


const Player = () => {
    const location = useLocation();
    const [tracks, setTracks] = useState([]);
    const [currentTrack, setCurrentTrack] = useState({});
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    console.log(currentTrack?.album?.artists[0])
    useEffect(() => {
        if (location.state) {
            apiClient.get("playlists/" + location.state?.id + "/tracks")
                .then((response) => {
                    setTracks(response.data.items);
                    setCurrentTrack(response.data.items[0].track);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [location.state]);

    useEffect (() => {
        setCurrentTrack(tracks[currentTrackIndex]?.track);
    }, [currentTrackIndex, tracks]); 
    
    return (
        <div className="flex flex-row pt-5 h-screen">
            <div className="flex flex-col w-[68%] mr-[2%] h-full gap-8">
                <div className="rounded-xl w-full h-[40%] mb-[10%] bg-slate-700">
                    {currentTrack && currentTrack.album?.images[0]?.url ? (
                        <div>
                        <AudioPlayer
                                currentTrack={currentTrack}
                                currentIndex={currentTrackIndex}
                                setCurrentTrackIndex={setCurrentTrackIndex}
                                total={tracks}   
                            />
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
                <div className="h-[full] ">
                    {currentTrack && currentTrack.album?.artists[0]?.id ? (
                    <Widgets artistID={currentTrack?.album?.artists[0]?.id} />
                        ): (
                        <div></div>
                        )}
                </div>
            </div>
            <div className="w-[30%] pr-5 flex flex-col h-full gap-6">
                <div className="h-[60%] pb-5 bg-slate-800 rounded-2xl flex justify-center items-center hover:scale-105 hover:bg-cyan-900">
                    {currentTrack && currentTrack.album?.images[0]?.url ? (
                    <div className="flex flex-col justify-center items-center">
                        <AlbumImage imageSrc={currentTrack.album.images[0].url} />
                        <AlbumInfo info={currentTrack} />
                    </div>
                    ) : (
                        <p className="text-white">Select a playlist from library</p>
                    )}
                </div>
                <div className="h-[30%] bg-yellow-500 rounded-2xl overflow-y-auto drop-shadow-lg">
                    <div className="pt-5 h-[35%] bg- rounded-2xl ">
                        <Queue 
                        tracks={tracks}
                        setCurrentTrackIndex={setCurrentTrackIndex}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Player;
