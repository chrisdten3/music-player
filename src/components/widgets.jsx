import React, { useState, useEffect } from "react";
import apiClient from "../spotify";
import WidgetCard from "./widgetCard";

const Widgets = ({ artistID }) => {
    const [similar, setSimilar] = useState([]);
    const [topTracks, setTopTracks] = useState([]);
    const [newReleases, setNewReleases] = useState([]);

    useEffect(() => {
        setSimilar([]);
        setTopTracks([]);

        const fetchRelatedArtists = async () => {
            try {
                // Get artist name
                const artistResponse = await apiClient.get(`/artists/${artistID}`);
                const artistName = artistResponse.data?.name;
                if (!artistName) return;

                // Find playlists featuring this artist
                const playlistResponse = await apiClient.get(`/search?q=${encodeURIComponent(artistName)}&type=playlist&limit=3`);
                const playlists = playlistResponse.data?.playlists?.items || [];
                if (playlists.length === 0) return;

                // Get tracks from the first playlist to find co-occurring artists
                const tracksResponse = await apiClient.get(`/playlists/${playlists[0].id}/tracks?limit=30&fields=items(track(artists(id,name)))`);
                const items = tracksResponse.data?.items || [];

                const seen = new Set([artistID]);
                const artistIds = [];
                for (const item of items) {
                    for (const artist of (item.track?.artists || [])) {
                        if (!seen.has(artist.id) && artistIds.length < 5) {
                            seen.add(artist.id);
                            artistIds.push(artist.id);
                        }
                    }
                }
                if (artistIds.length === 0) return;

                // Fetch full artist details (includes images)
                const detailsResponse = await apiClient.get(`/artists?ids=${artistIds.slice(0, 3).join(',')}`);
                setSimilar(detailsResponse.data?.artists || []);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchTopTracks = async () => {
            try {
                const response = await apiClient.get(`/artists/${artistID}/top-tracks?market=US`);
                const a = response.data?.tracks.slice(0, 3);
                if (a) {setTopTracks(a);}
            } catch (error) {
                console.log(error);
            }
        }

        const fetchNewReleases = async () => {
            try {
                const response = await apiClient.get(`/browse/new-releases?country=US`);
                const a = response.data?.albums.items.slice(0, 3);
                if (a) {setNewReleases(a);}
            } catch (error) {
                console.log(error);
            }
        }

        fetchRelatedArtists();
        fetchTopTracks();
        fetchNewReleases();
    }, [artistID]); // Make sure to include artistID in the dependency array


    return (
    <div className="flex flex-row gap-8 justify-center">
            <WidgetCard title="Similar Artists" similar={similar} />
            <WidgetCard title="Top Tracks" featured={topTracks} />
    </div>

    );
};

export default Widgets;
