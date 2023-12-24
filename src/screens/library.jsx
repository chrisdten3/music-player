import React, {useEffect, useState} from "react";
import APIkit from '../spotify'
import { setClientToken } from "../spotify";
import Login from "./login";

import { useNavigate } from "react-router-dom";
const Library = () => {
    const [playlists, setPlaylists] = useState([]);
    useEffect(() => {
        APIkit.get('/me/playlists').then(function (res) {
            console.log('success'); 
            console.log(res.data.items);
            setPlaylists(res.data.items);
                    
        })
        .catch(err => {
            console.log('error');
            console.log(err);
            window.location.reload(); 
        })
    }, []);
    const navigate = useNavigate();
    const playPlaylist = (playlistId) => {
        console.log('successfully entered the library page ' + playlistId);
        navigate('/player', {state: {id: playlistId}});
    }; 
    return (
        <div className="flex flex-col items-center py-8">
            <div className="flex justify-center flex-wrap gap-5 p-6">
                {playlists?.map((playlist) => {
                const hasImages = playlist.images && playlist.images.length > 0;
                const stockPhotoURL = 'https://community.spotify.com/t5/image/serverpage/image-id/55829iC2AD64ADB887E2A5?v=v2';
                return (
                    <div 
                    key={playlist.id}
                    onClick={() => playPlaylist(playlist.id)}
                    >
                        <div className="flex flex-col bg-slate-800 rounded-lg p-6 w-48 h-60 hover:bg-teal-600 shadow-black justify-center">
                            <div className="flex flex-col items-center justify-center">
                            {hasImages ? (
                                <img
                                src={playlist.images[0].url || stockPhotoURL}
                                className="rounded-lg w-36 h-36"
                                alt={playlist.name}
                                />
                            ) : (
                                <img
                                src={stockPhotoURL}
                                className="rounded-lg w-36 h-36"
                                alt="Stock Playlist"
                                />
                            )}
                            <h1 className="text-white text-md pt-4 font-bold">{playlist.name}</h1>
                            </div>
                        </div>
                    </div>
                );
                })}
            </div>
        </div>
    )
}

export default Library;




