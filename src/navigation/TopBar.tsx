import { navGroup, navItem, topbar } from "emotion-styles/topbar";
import React, { MouseEventHandler } from "react";
import { Link } from "react-router-dom";

import { signOut } from "../auth/auth";
import Button from "../components/Button";

export default class Topbar extends React.Component {
  public handleLogout = () => signOut();

  public render() {
    return (
      <div className={topbar}>
        <div className={navGroup}>
          <Link className={navItem} to="/appliances">Appliances</Link>
          <Link className={navItem} to="/maintainers">Maintainers</Link>
        </div>
        <div className={navGroup}>
          <Button plain={true} onClick={this.handleLogout}>Log out</Button>
        </div>
      </div>
    );
  }
}
