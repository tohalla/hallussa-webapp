import classNames from "classnames";
import { path } from "ramda";
import React from "react";

import { Trans, useTranslation } from "react-i18next";
import { connect, MapStateToProps } from "react-redux";
import { Link } from "react-router-dom";
import { AccountPayload } from "../account/actions";
import { signOut } from "../auth/auth";
import Button from "../component/button/Button";
import { ReduxState } from "../store/store";
import { light } from "../style/inline";
import { navGroup } from "../style/topbar";

interface StateProps {
  account?: AccountPayload;
}

const AccountMenu = (props: StateProps) => {
  if (typeof props.account === "undefined") {
    return null;
  }

  const {t} = useTranslation();
  return (
    <div className={classNames(navGroup, "horizontal")}>
      <div className={navGroup}>
        <span>
          <Trans i18nKey="navigation.user.greeting" values={{name: props.account.firstName}}>
            a <Link className={light} to="/account">b</Link>
          </Trans>
        </span>
      </div>
      <div className={navGroup}>
        <Button className={light} onClick={signOut} plain={true}>
          {t("navigation.user.signOut")}
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps: MapStateToProps<StateProps, {}, ReduxState> = (state) => ({
  account: state.session.activeAccount ? state.entities.accounts[state.session.activeAccount] : undefined,
});

export default connect(mapStateToProps)(AccountMenu);
