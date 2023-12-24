import axios from 'axios'; //using axios to make http requests to spotify api

const authEndpoint = "https://accounts.spotify.com/authorize";
const clientId = "326e311dd5194e27b4e0b0301e4f1adf"; 
const redirectUri = "https://chrisdten3.github.io/music-player/";
const scopes = ["user-library-read", "playlist-read-private", "user-read-currently-playing", "user-read-playback-state", "user-modify-playback-state", "user-top-read", "streaming"];

export const loginEndpoint = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;

const apiClient = axios.create({
    baseURL: 'https://api.spotify.com/v1',
}); 


export const setClientToken = (token) => {
    apiClient.interceptors.request.use(async function (config) {
        config.headers.Authorization = "Bearer " + token;
        return config;
    }); 
};

export default apiClient; // Export your apiClient if not already exported
