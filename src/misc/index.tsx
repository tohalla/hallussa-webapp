import "babel-polyfill";
import defaultContainer, { appContainer, centerContent, noPadContainer } from "emotion-styles/container";

import React from "react";
import ReactDOM from "react-dom";

import MaintenanceRequestForm from "./MaintenanceRequestForm";

ReactDOM.render(
  <div className={centerContent}>
    <div className={noPadContainer}>
      <MaintenanceRequestForm />
    </div>
  </div>,
  document.getElementById("app")
);
