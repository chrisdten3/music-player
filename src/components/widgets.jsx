import React, { useState, useEffect } from "react";
import apiClient from "../spotify";
import WidgetCard from "./widgetCard";

const Widgets = ({ artistID }) => {
    const [similar, setSimilar] = useState([]);
    const [topTracks, setTopTracks] = useState([]);
    const [newReleases, setNewReleases] = useState([]);

    useEffect(() => {
        const fetchRelatedArtists = async () => {
            try {
                const artistResponse = await apiClient.get(`/artists/${artistID}`);
                const genres = artistResponse.data?.genres || [];
                if (genres.length === 0) return;
                const genre = genres[0];
                const searchResponse = await apiClient.get(`/search?q=genre:${encodeURIComponent(genre)}&type=artist&limit=5`);
                const artists = (searchResponse.data?.artists?.items || [])
                    .filter((a) => a.id !== artistID)
                    .slice(0, 3);
                setSimilar(artists);
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
