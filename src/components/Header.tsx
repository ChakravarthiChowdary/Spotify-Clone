import React from "react";

import { Avatar } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useAppSelector } from "../store/store";

const Header = () => {
  const { user } = useAppSelector((state) => state);

  return (
    <div className="header">
      <div className="header__left">
        <SearchIcon />
        <input
          placeholder="Search for Artists, Songs, or Podcasts "
          type="text"
        />
      </div>
      <div className="header__right">
        <Avatar
          alt={user?.display_name}
          src={user?.images.length! > 0 ? user?.images[0].url : "CK"}
        />
        <h4>{user?.display_name}</h4>
      </div>
    </div>
  );
};

export default Header;
