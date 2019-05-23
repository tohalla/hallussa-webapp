import classnames from "classnames";
import React from "react";
import { connect, MapStateToProps } from "react-redux";

import { useTranslation } from "react-i18next";
import { RouteComponentProps } from "react-router-dom";
import { ReduxState } from "../../store/store";
import { contentVerticalSpacing, stacked } from "../../style/container";
import { AccountPayload } from "../actions";
import ChangePassword from "../component/ChangePassword";

interface StateProps {
  account: AccountPayload;
}

type Props = RouteComponentProps<{organisation?: string}>;

const Security = ({account}: Props & StateProps) => {
  const {t} = useTranslation();

  return (
    <>
      <h1>{t("tab.profile.security")}</h1>
      <div className={classnames(stacked, contentVerticalSpacing)}>
        <ChangePassword account={account} />
      </div>
    </>
  );
};

const mapStateToProps: MapStateToProps<StateProps, {}, ReduxState> = (state) => ({
  account: state.entities.accounts[state.session.activeAccount as number],
});

export default connect(mapStateToProps)(Security);
