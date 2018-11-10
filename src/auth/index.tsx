import "babel-polyfill";
import defaultContainer, { appContainer, centerContent } from "emotion-styles/container";
import React from "react";
import ReactDOM from "react-dom";
import "whatwg-fetch"; // fetch polyfill, replaces standard fetch

import { baseUrl } from "../config";
import { authenticate } from "./auth";
import AuthenticationForm from "./AuthenticationForm";

// TODO: nginx jwt check
(async () => {
  const token = localStorage.getItem("token");
  if (token && (await authenticate(token))) {
    window.location.href = baseUrl;
    return;
  }

  (document.getElementById("app") as HTMLElement).className = appContainer;

  ReactDOM.render(
    <div className={centerContent}>
      <div className={defaultContainer}>
        <AuthenticationForm />
      </div>
    </div>,
    document.getElementById("app")
  );
})();
