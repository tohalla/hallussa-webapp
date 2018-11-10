import React from "react";

import logo from "emotion-styles/logo";

interface LogoProps {
  type: "light";
}

export default ({type}: LogoProps) => (
  <img className={logo} src={require("assets/img/hallussa-light.png")} />
);
