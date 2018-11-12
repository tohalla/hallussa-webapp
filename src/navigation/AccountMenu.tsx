import {
  navGroup,
  navItem,
} from "emotion-styles/topbar";
import { path } from "ramda";
import React from "react";
import { connect } from "react-redux";

import { AccountPayload, fetchAccount } from "../account/actions";
import { signOut } from "../auth/auth";
import { ReduxAPICall } from "../store/middleware/api";
import loadable from "../util/hoc/loadable";

interface AccountStateProps {
  account: AccountPayload;
}

interface AccountDispatchProps {
  fetchAccount(): ReduxAPICall;
}

const mapStateToProps = (state: object) => ({
  account: path(["account"], state),
});

export class AccountMenu extends React.Component<AccountDispatchProps & AccountStateProps> {
  public componentWillMount = () => {
    this.props.fetchAccount();
  }

  public handleLogout = () => signOut();

  public render() {
    const {firstName} = this.props.account;
    return (
      <div className={navGroup}>
        Hello, {firstName}
        <a className={navItem} onClick={this.handleLogout}>Log out</a>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  {fetchAccount}
)(loadable(AccountMenu));
