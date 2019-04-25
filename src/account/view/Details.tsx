import React from "react";
import { connect, MapStateToProps } from "react-redux";

import { useTranslation } from "react-i18next";
import { Link, RouteComponentProps } from "react-router-dom";
import { ReduxState } from "../../store/store";
import { actionGroup, padded, spacedHorizontalContainer, spread, stacked } from "../../style/container";
import { info } from "../../style/inline";
import { spacer } from "../../style/variables/spacing";
import { AccountPayload } from "../actions";

interface StateProps {
  account: AccountPayload;
}

type Props = RouteComponentProps<{organisation?: string}>;

const Details = ({
  account: {firstName, lastName, email},
}: Props & StateProps) => {
  const {t} = useTranslation();

  return (
    <div className={padded}>
      <div className={spread}>
        <h1>{firstName} {lastName}</h1>
      </div>
      <div className={stacked}>
        {email && <div className={info}>
            <i className="material-icons">email</i>
            <a href={`mailto:${email}`}>{email}</a>
        </div>}
      </div>
      <div className={spacer} />
    </div>
  );
};

const mapStateToProps: MapStateToProps<StateProps, {}, ReduxState> = (state) => ({
  account: state.entities.accounts[state.session.activeAccount as number],
});

export default connect(mapStateToProps)(Details);
