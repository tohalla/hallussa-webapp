import "babel-polyfill";
import defaultContainer, { appContainer, centerContent } from "styles/container";

import React from "react";
import ReactDOM from "react-dom";
import Logo from "../../components/Logo";

ReactDOM.render(
  <div className={centerContent}>
    <div className={defaultContainer}>
      <Logo type="qr-light"/>
      <p>Thank you for submitting the report. The organisations' workers are now informed.</p>
    </div>
  </div>,
  document.getElementById("app")
);
