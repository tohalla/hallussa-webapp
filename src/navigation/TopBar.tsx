import { topbar } from "emotion-styles/topbar";
import React from "react";
import { Link } from "react-router-dom";

export default class Topbar extends React.Component {
  public render() {
    return (
      <div className={topbar}>
        <Link to="/appliances">Appliances</Link>
        <Link to="/maintainers">Maintainers</Link>
        <a href="#">Log out</a>
      </div>
    );
  }
}
