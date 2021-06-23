import React, { useEffect } from "react";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import { Grid, Slider } from "@material-ui/core";

import { useAppDispatch, useAppSelector } from "../store/store";
import { SET_ITEM, SET_PLAYING } from "../store/actions";

const Footer = () => {
  const { item, spotify, playing } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    spotify!.getMyCurrentPlaybackState().then((r) => {
      dispatch({
        type: SET_PLAYING,
        payload: r.is_playing,
      });

      dispatch({
        type: SET_ITEM,
        payload: r.item,
      });
    });
  }, [spotify, dispatch]);

  const handlePlayPause = () => {
    if (playing) {
      spotify!.pause();
      dispatch({
        type: SET_PLAYING,
        payload: false,
      });
    } else {
      spotify!.play();
      dispatch({
        type: SET_PLAYING,
        payload: true,
      });
    }
  };

  const skipNext = () => {
    spotify!.skipToNext();
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
  };

  const skipPrevious = () => {
    spotify!.skipToPrevious();
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
  };

  return (
    <div className="footer">
      <div className="footer__left">
        <img
          className="footer__albumLogo"
          src={item?.album.images[0].url}
          alt={item?.name}
        />
        {item ? (
          <div className="footer__songInfo">
            <h4>{item.name}</h4>
            <p>
              {item.artists
                .map((artist: { name: string }) => artist.name)
                .join(", ")}
            </p>
          </div>
        ) : (
          <div className="footer__songInfo">
            <h4>No song is playing</h4>
            <p>...</p>
          </div>
        )}
      </div>

      <div className="footer__center">
        <ShuffleIcon className="footer__green" />
        <SkipPreviousIcon onClick={skipNext} className="footer__icon" />
        {playing ? (
          <PauseCircleOutlineIcon
            onClick={handlePlayPause}
            fontSize="large"
            className="footer__icon"
          />
        ) : (
          <PlayCircleOutlineIcon
            onClick={handlePlayPause}
            fontSize="large"
            className="footer__icon"
          />
        )}
        <SkipNextIcon onClick={skipPrevious} className="footer__icon" />
        <RepeatIcon className="footer__green" />
      </div>
      <div className="footer__right">
        <Grid container spacing={2}>
          <Grid item>
            <PlaylistPlayIcon />
          </Grid>
          <Grid item>
            <VolumeDownIcon />
          </Grid>
          <Grid item xs>
            <Slider aria-labelledby="continuous-slider" />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Footer;
