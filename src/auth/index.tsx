import "babel-polyfill";
import defaultContainer, { centerContent } from "emotion-styles/container";
import React from "react";
import ReactDOM from "react-dom";
import "whatwg-fetch"; // fetch polyfill, replaces standard fetch

import AuthenticationForm from "./AuthenticationForm";

ReactDOM.render(
  <div className={centerContent}>
    <div className={defaultContainer}>
      <AuthenticationForm />
    </div>
  </div>,
  document.getElementById("app")
);
