import React, { useEffect } from "react";

import "./App.css";
import Login from "./pages/Login";
import Player from "./pages/Player";
import SpotifyWebApi from "spotify-web-api-js";
import { getTokenFromResponse } from "./helpers/spotify";
import { useAppDispatch, useAppSelector } from "./store/store";
import {
  SET_DISCOVER_WEEKLY,
  SET_TOKEN,
  SET_TOP_ARTISTS,
  SET_PLAYLISTS,
  SET_USER,
} from "./store/actions";

const spotify = new SpotifyWebApi();

function App() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.token);

  useEffect(() => {
    const hash = getTokenFromResponse();
    window.location.hash = "";
    let _token = hash.access_token;

    if (_token) {
      spotify.setAccessToken(_token);

      dispatch({
        type: SET_TOKEN,
        payload: { token: _token, spotify: spotify },
      });

      spotify.getPlaylist("38b8gFT5yiH8SB4LHrIHZ1").then((response) =>
        dispatch({
          type: SET_DISCOVER_WEEKLY,
          payload: response,
        })
      );

      spotify.getMyTopArtists().then((response) =>
        dispatch({
          type: SET_TOP_ARTISTS,
          payload: response,
        })
      );

      spotify.getMe().then((user) => {
        dispatch({
          type: SET_USER,
          payload: user,
        });
      });

      spotify.getUserPlaylists().then((playlists) => {
        console.log(playlists);
        dispatch({
          type: SET_PLAYLISTS,
          payload: playlists,
        });
      });
    }
  }, [token, dispatch]);

  return token ? <Player /> : <Login />;
}

export default App;
