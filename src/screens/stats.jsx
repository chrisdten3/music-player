import React, {useState, useEffect} from "react";
import apiClient from "../spotify";

const Stats = () => {

    const TopArtists = () => {
        const [topArtists, setTopArtists] = useState([]);
        useEffect(() => {
          const fetchTopArtists = async () => {
            try {
              const response = await apiClient.get('/me/top/artists');
              setTopArtists(response.data.items);
            } catch (error) {
              console.error('Error fetching top artists:', error);
            }
          };
      
          fetchTopArtists();
        }, []);
      
        return (
          <div>
            <div className="grid grid-cols-3 gap-4">
            <h1 className="col-span-3 text-white text-3xl mb-4 flex items-center justify-center">Your Top Artists</h1>
              {topArtists?.map((artist, index) => {
                const hasImages = artist.images && artist.images.length > 0;
                const stockPhotoURL =
                  'https://community.spotify.com/t5/image/serverpage/image-id/55829iC2AD64ADB887E2A5?v=v2';
                return (
                  <div
                    key={artist.id}
                    className="flex flex-col bg-slate-800 rounded-lg p-6 w-48 h-60 hover:bg-teal-600 shadow-black justify-center"
                  >
                    <div className="flex flex-col items-center justify-center">
                      {hasImages ? (
                        <img
                          src={artist.images[0].url || stockPhotoURL}
                          className="rounded-lg w-36 h-36"
                          alt={artist.name}
                        />
                      ) : (
                        <img
                          src={stockPhotoURL}
                          className="rounded-lg w-36 h-36"
                          alt="Stock Playlist"
                        />
                      )}
                      <h1 className="text-white text-md pt-4 font-bold">{artist.name}</h1>
                      <p className="text-gray-400 mt-2">Rank: {index + 1}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      };

      const TopSongs = () => {
        const [topSongs, setTopSongs] = useState([]);
      
        useEffect(() => {
          const fetchTopSongs = async () => {
            try {
              const response = await apiClient.get('/me/top/tracks');
              setTopSongs(response.data.items);
            } catch (error) {
              console.error('Error fetching top songs:', error);
            }
          };
      
          fetchTopSongs();
        }, []);
      
        return (
          <div>
            <div className="grid grid-cols-3 gap-4">
              <h1 className="col-span-3 text-white text-3xl mb-4 flex items-center justify-center">Your Top Songs</h1>
              {topSongs?.map((song, index) => {
                const hasImages = song.album.images && song.album.images.length > 0;
                const stockPhotoURL =
                  'https://community.spotify.com/t5/image/serverpage/image-id/55829iC2AD64ADB887E2A5?v=v2';
                return (
                  <div
                    key={song.id}
                    className="flex flex-col bg-slate-800 rounded-lg p-6 w-48 h-60 hover:bg-teal-600 shadow-black justify-center"
                  >
                    <div className="flex flex-col items-center justify-center">
                      {hasImages ? (
                        <img
                          src={song.album.images[0].url || stockPhotoURL}
                          className="rounded-lg w-36 h-36"
                          alt={song.name}
                        />
                      ) : (
                        <img
                          src={stockPhotoURL}
                          className="rounded-lg w-36 h-36"
                          alt="Stock Playlist"
                        />
                      )}
                      <h1 className="text-white text-md pt-4 font-bold">{song.name}</h1>
                      <p className="text-gray-400 mt-2">Rank: {index + 1}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      };

    return (
        <div className="flex flex-col">
            <TopArtists />
            <div className="pt-10">
              <TopSongs />
            </div>
        </div>
    )
}
export default Stats