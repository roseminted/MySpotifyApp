require('dotenv').config();
// Send to spotify to log into account, then bring back to my app
// first point of the endpoint
export const authEndpoint = "https://accounts.spotify.com/authorize";

// insert my client id from spotify (second point)
const clientId = process.env.REACT_APP_SPOTIFY_KEY;

// redirect to my app once logged in (third point)
const redirectUri = "http://localhost:3000/";

// set up scopes to get permissions (fourth point)
const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
    "playlist-modify-public",
    "playlist-modify-private",
    "user-follow-modify",
    "user-library-modify",
];

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;

// Get the access token from the redirected url after the user is authenticated
export const getTokenFromUrl = () => {
    // go to the point where the hash symbol is in the returned access token url
    return window.location.hash
        .substring(1)
        // split at the & becuase we only want the access token
        .split("&")
        .reduce((initial, item) => {
            // split at the = equal sign to get the access token itself
            var parts = item.split("=");
            initial[parts[0]] = decodeURIComponent(parts[1])

            return initial;
        }, {});
}