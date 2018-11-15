import { navGroup, navItem } from "emotion-styles/topbar";
import { path } from "ramda";
import React from "react";

import { connect, MapStateToProps } from "react-redux";
import { AccountPayload } from "../account/actions";
import { signOut } from "../auth/auth";
import { ReduxState } from "../store/store";

interface StateProps {
  account?: AccountPayload;
}

class AccountMenu extends React.Component<StateProps> {
  public handleLogout = () => signOut();

  public render() {
    if (typeof this.props.account === "undefined") {
      return false;
    }
    const {firstName} = this.props.account;
    return (
      <div className={navGroup}>
        Hello, {firstName}
        <a className={navItem} onClick={this.handleLogout}>Log out</a>
      </div>
    );
  }
}

const mapStateToProps: MapStateToProps<StateProps, {}, ReduxState> = (
  state: ReduxState
) => ({
  account: typeof state.session.activeAccount === "undefined" ?
    undefined : path(["entities", "accounts", state.session.activeAccount], state),
});

export default connect(mapStateToProps)(AccountMenu);
