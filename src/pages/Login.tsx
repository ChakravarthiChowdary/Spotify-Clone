import React from "react";

import { access_Url } from "../helpers/spotify";

const Login = () => {
  return (
    <div className="login">
      <img
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt=""
      />
      <a href={access_Url}>LOGIN TO SPOTIFY</a>
    </div>
  );
};

export default Login;
