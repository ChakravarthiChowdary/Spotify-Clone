import React from "react";

interface IProps {
  track: {
    album: {
      images: any[];
      name: string;
    };
    name: string;
    id: string;
    artists: [
      {
        name: string;
      }
    ];
  };
  playSong: (id: string, item: any) => void;
}

const SongRow: React.FC<IProps> = ({ track, playSong }) => {
  return (
    <div className="songRow" onClick={() => playSong(track.id, track)}>
      <img className="songRow__album" src={track.album.images[0].url} alt="" />
      <div className="songRow__info">
        <h1>{track.name}</h1>
        <p>
          {track.artists
            .map((artist: { name: string }) => artist.name)
            .join(", ")}{" "}
          - {track.album.name}
        </p>
      </div>
    </div>
  );
};

export default SongRow;
