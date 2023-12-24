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
                const response = await apiClient.get(`/artists/${artistID}/related-artists`);
                const a = response.data?.artists.slice(0, 3);
                if (a) {setSimilar(a);}
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
