import React from "react";

import logo from "styles/logo";

type Type = "light" | "dark" | "qr-light";

interface LogoProps {
  type: Type;
}

export default ({type}: LogoProps) => {
  if (type === "light") {
    return <img className={logo} src={require("assets/img/hallussa-light.png")} />;
  } else if (type === "dark") {
    return <img className={logo} src={require("assets/img/hallussa-dark.png")} />;
  } else {
    return <img className={logo} src={require("assets/img/hallussa-qr.png")} />;
  }
};
