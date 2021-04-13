import { useEffect, useState } from "react";
import './App.css';
import Login from "./Login";
import { getTokenFromUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";

const spotify = new SpotifyWebApi();

function App() {
  // useState is a short term memory store, store token
  const [token, setToken] = useState(null);

  // useEffect runs code based on a given condition
  // monitor the url to check if anything changes
  useEffect(() => {
    //get token from url
    const hash = getTokenFromUrl();
    // for security, clear hash from url
    window.location.hash = "";
    // temporay token
    const _token = hash.access_token;

    // store the stripped token in the state
    if (_token) {
      setToken(_token)
      // give spotify access to token
      spotify.setAccessToken(_token);
    }

    console.log("I HAVE A TOKEN: ", token);
  }, []);

  return (
    // BEM
    <div className="app">
      {
        // if there's a token, render the app, otherwise, render the login page
        token ? (
          <h1>I am logged in</h1>
        ) : (
          <Login />
        )
      }
    </div>
  );
}

export default App;
