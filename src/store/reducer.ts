import { AnyAction } from "redux";
import SpotifyWebApi from "spotify-web-api-js";
import {
  SET_TOKEN,
  SET_ITEM,
  SET_PLAYING,
  SET_DISCOVER_WEEKLY,
  SET_TOP_ARTISTS,
  SET_PLAYLISTS,
  SET_USER,
} from "./actions";

interface AppState {
  user: { display_name: string; images: any[] } | null;
  error: { message: string } | null;
  playlists: { items: any[] } | null;
  token: null | string;
  spotify: null | SpotifyWebApi.SpotifyWebApiJs;
  discover_weekly: {
    description: string;
    images: any[];
    tracks: any;
  } | null;
  playing: boolean;
  item: any;
}

const initialState: AppState = {
  user: null,
  error: null,
  playlists: null,
  token: null,
  spotify: null,
  discover_weekly: null,
  item: null,
  playing: false,
};

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload.token,
        spotify: action.payload.spotify,
      };
    case SET_ITEM:
      return {
        ...state,
        item: action.payload,
      };
    case SET_PLAYING:
      return {
        ...state,
        playing: action.payload,
      };
    case SET_DISCOVER_WEEKLY:
      return {
        ...state,
        discover_weekly: action.payload,
      };
    case SET_TOP_ARTISTS:
      return {
        ...state,
        top_artists: action.payload,
      };
    case SET_PLAYLISTS:
      return {
        ...state,
        playlists: action.payload,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
