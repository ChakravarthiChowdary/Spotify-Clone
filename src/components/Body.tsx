import React from "react";

import Header from "./Header";
import SongRow from "./SongRow";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useAppDispatch, useAppSelector } from "../store/store";
import { SET_ITEM, SET_PLAYING } from "../store/actions";

const Body = () => {
  const { discover_weekly, spotify } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  console.log(discover_weekly);

  const playPlaylist = () => {
    spotify!
      .play({
        context_uri: `spotify:playlist:38b8gFT5yiH8SB4LHrIHZ1`,
      })
      .then(() => {
        spotify!.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: SET_ITEM,
            payload: r.item,
          });
          dispatch({
            type: SET_PLAYING,
            payload: true,
          });
        });
      });
  };

  const playSong = (id: string, item: any) => {
    spotify!
      .play({
        uris: [`spotify:track:${id}`],
      })
      .then((res) => {
        spotify!.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: SET_ITEM,
            payload: r.item,
          });
          dispatch({
            type: SET_PLAYING,
            payload: true,
          });
        });
      });
    dispatch({
      type: SET_ITEM,
      payload: item,
    });
  };

  return (
    <div className="body">
      <Header />

      <div className="body__info">
        <img src={discover_weekly?.images[0].url} alt="" />
        <div className="body__infoText">
          <strong>PLAYLIST</strong>
          <h2>Discover Weekly</h2>
          <p>{discover_weekly?.description}</p>
        </div>
      </div>

      <div className="body__songs">
        <div className="body__icons">
          <PlayCircleFilledIcon
            className="body__shuffle"
            onClick={playPlaylist}
          />
          <FavoriteIcon fontSize="large" />
          <MoreHorizIcon />
        </div>

        {discover_weekly?.tracks.items.map((item: any) => (
          <SongRow playSong={playSong} track={item.track} key={item.added_at} />
        ))}
      </div>
    </div>
  );
};

export default Body;
