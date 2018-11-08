import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

const Navigation = () => (
  <ul>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/appliances">Appliances</Link>
    </li>
    <li>
      <Link to="/maintainers">Maintainers</Link>
    </li>
    <li>
      <a href="#">Log out</a>
    </li>
  </ul>
);

export default Navigation;
