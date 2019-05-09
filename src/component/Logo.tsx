import React from "react";

import logo from "style/logo";

type Type = "light" | "dark" | "qr-light";

interface LogoProps {
  type: Type;
}

export default ({type}: LogoProps) => (
  <img
    alt="logo"
    className={logo}
    src={
      type === "dark" ? require("assets/img/hallussa-dark.png")
      : type === "light" ? require("assets/img/hallussa-light.png")
      : require("assets/img/hallussa-qr.png")
    }
  />
);
