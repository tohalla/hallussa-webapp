import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import "whatwg-fetch"; // fetch polyfill, replaces standard fetch

ReactDOM.render(
  <div/>,
  document.getElementById("app")
);
