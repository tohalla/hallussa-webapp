import { navGroup, navItem } from "emotion-styles/topbar";
import { path } from "ramda";
import React from "react";

import { connect } from "react-redux";
import { AccountPayload } from "../account/actions";
import { signOut } from "../auth/auth";
import { ReduxState } from "../store/store";

export interface AccountMenuStateProps {
  account: AccountPayload;
}

const mapStateToProps = (state: ReduxState) => ({
  account: state.session.activeAccount && path(["entities", "accounts", state.session.activeAccount], state),
  activeAccount: state.session.activeAccount,
});

class AccountMenu extends React.Component<AccountMenuStateProps> {
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

export default connect(mapStateToProps)(AccountMenu as any);
