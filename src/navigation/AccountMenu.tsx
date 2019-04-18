import classNames from "classnames";
import { path } from "ramda";
import React from "react";

import { useTranslation } from "react-i18next";
import { connect, MapStateToProps } from "react-redux";
import { AccountPayload } from "../account/actions";
import { signOut } from "../auth/auth";
import Button from "../component/button/Button";
import { ReduxState } from "../store/store";
import { light } from "../style/inline";
import { navGroup, navItem } from "../style/topbar";

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
      <div className={navGroup}>
        {t("navigation.user.greeting", {name: props.account.firstName})}
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
  account: typeof state.session.activeAccount === "undefined" ?
    undefined : path(["entities", "accounts", state.session.activeAccount], state),
});

export default connect(mapStateToProps)(AccountMenu);
