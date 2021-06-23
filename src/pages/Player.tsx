import React from "react";

import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import Body from "../components/Body";

const Player = () => {
  return (
    <div className="player">
      <div className="player__body">
        <Sidebar />
        <Body />
      </div>
      <Footer />
    </div>
  );
};

export default Player;
