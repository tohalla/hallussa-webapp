import React from "react";
import { Link, Redirect, Route, Switch } from "react-router-dom";

import { useTranslation } from "react-i18next";
import ViewContainer from "../components/layouts/ViewContainer";
import tabbed from "../components/tabbed/tabbed";
import { padded } from "../styles/container";
import MaintainerForm from "./components/MaintainerForm";
import Maintainer from "./views/Maintainer";
import MaintainerListing from "./views/MaintainerListing";

const view = tabbed("maintainers");

export default () => {
  const {t} = useTranslation();
  return (
    <ViewContainer>
      <Switch>
        <Route
          exact={true}
          path="/maintainers"
          component={view(MaintainerListing, {contentContainerClassName: padded})}
        />
        <Route
          exact={true}
          path="/maintainers/new"
          component={view(MaintainerForm, {
            contentComponentProps: {
              header: <h1>{t("maintainer.create.title")}</h1>,
              secondary: <Link to={"/maintainers"}>{t("cancel")}</Link>,
            },
            contentContainerClassName: padded,
          })}
        />
        <Route
          exact={true}
          path="/maintainers/:maintainer"
          component={view(Maintainer, {contentContainerClassName: padded})}
        />
        <Redirect path="/maintainers/*" to="/maintainers" />
      </Switch>
    </ViewContainer>
  );
};
