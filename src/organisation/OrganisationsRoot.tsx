import classNames from "classnames";
import React from "react";
import { Link, Redirect, Route, RouteComponentProps, Switch } from "react-router-dom";

import { useTranslation } from "react-i18next";
import ViewContainer from "../component/layout/ViewContainer";
import { padded, viewContentContainer } from "../style/container";
import OrganisationForm from "./component/OrganisationForm";
import Details from "./view/Details";

const NewOrganisation = (props: RouteComponentProps) => {
  const {t} = useTranslation();
  return (
    <OrganisationForm
      header={<h1>{t("organisation.create.title")}</h1>}
      secondary={<Link to={"/organisations/"}>{t("cancel")}</Link>}
      {...props}
    />
  );
};

export default () => (
  <ViewContainer className={classNames(viewContentContainer, padded)}>
    <Switch>
      <Route exact={true} path="/organisations/" component={Details} />
      <Route exact={true} path="/organisations/new" component={NewOrganisation} />
      <Route path="/organisations/:organisation" component={Details} />
      <Redirect path="/organisations/*" to="/organisations" />
    </Switch>
  </ViewContainer>
);
