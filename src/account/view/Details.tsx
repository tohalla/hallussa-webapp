import classnames from "classnames";
import React from "react";
import { connect, MapStateToProps } from "react-redux";

import { RouteComponentProps } from "react-router-dom";
import { ReduxState } from "../../store/store";
import { contentVerticalSpacing, stacked } from "../../style/container";
import { info } from "../../style/inline";
import { AccountPayload } from "../actions";

interface StateProps {
  account: AccountPayload;
}

type Props = RouteComponentProps<{organisation?: string}>;

const Details = ({account}: Props & StateProps) => {
  return (
    <>
      <h1>{account.firstName} {account.lastName}</h1>
      <div className={classnames(stacked, contentVerticalSpacing)}>
        {account.email && <div className={info}>
            <i className="material-icons">email</i>
            <a href={`mailto:${account.email}`}>{account.email}</a>
        </div>}
      </div>
    </>
  );
};

const mapStateToProps: MapStateToProps<StateProps, {}, ReduxState> = (state) => ({
  account: state.entities.accounts[state.session.activeAccount as number],
});

export default connect(mapStateToProps)(Details);
