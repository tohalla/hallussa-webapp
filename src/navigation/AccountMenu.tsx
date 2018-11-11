import {
  navGroup,
  navItem,
} from "emotion-styles/topbar";
import React from "react";

import { signOut } from "../auth/auth";

export default class AccountMenu extends React.Component {
  public handleLogout = () => signOut();

  public render() {
    return (
      <div className={navGroup}>
        <a className={navItem} onClick={this.handleLogout}>Log out</a>
      </div>
    );
  }
}
