import classnames from "classnames";
import React from "react";

import { useTranslation } from "react-i18next";
import { connect, MapStateToProps } from "react-redux";
import { NavLink } from "react-router-dom";
import { AccountPayload } from "../account/actions";
import { signOut } from "../auth/auth";
import Button from "../component/button/Button";
import { ReduxState } from "../store/store";
import { activeItem, navGroup, navItem } from "../style/topbar";

interface StateProps {
  account?: AccountPayload;
}

const AccountMenu = (props: StateProps) => {
  const {t} = useTranslation();
  return (
    <div className={classnames(navGroup)}>
      <NavLink activeClassName={activeItem} className={navItem} to="/profile">
        {t("navigation.item.profile")}
      </NavLink>
      <Button className={navItem} onClick={signOut} plain={true}>
        {t("navigation.user.signOut")}
      </Button>
    </div>
  );
};

const mapStateToProps: MapStateToProps<StateProps, {}, ReduxState> = (state) => ({
  account: state.session.activeAccount ? state.entities.accounts[state.session.activeAccount] : undefined,
});

export default connect(mapStateToProps)(AccountMenu);
