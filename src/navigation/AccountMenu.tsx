import { navGroup, navItem } from "emotion-styles/topbar";
import { path } from "ramda";
import React from "react";

import { connect, MapStateToProps } from "react-redux";
import { AccountPayload } from "../account/actions";
import { signOut } from "../auth/auth";
import Button from "../components/Button";
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
        <div className={navGroup}>
          Hello, {firstName}
        </div>
        <div className={navGroup}>
          <Button onClick={this.handleLogout} plain={true}>Log out</Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps: MapStateToProps<StateProps, {}, ReduxState> = (state) => ({
  account: typeof state.session.activeAccount === "undefined" ?
    undefined : path(["entities", "accounts", state.session.activeAccount], state),
});

export default connect(mapStateToProps)(AccountMenu);
