import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

const Navigation = () => (
  <ul>
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
