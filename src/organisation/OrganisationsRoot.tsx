import classNames from "classnames";
import React from "react";
import { Link, Redirect, Route, RouteComponentProps, Switch } from "react-router-dom";

import { useTranslation } from "react-i18next";
import ViewContainer from "../components/layouts/ViewContainer";
import { padded, viewContentContainer } from "../styles/container";
import OrganisationForm from "./OrganisationForm";
import Organisation from "./views/Organisation";

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
      <Route exact={true} path="/organisations/" component={Organisation} />
      <Route exact={true} path="/organisations/new" component={NewOrganisation} />
      <Route exact={true} path="/organisations/:organisation" component={Organisation} />
      <Redirect path="/organisations/*" to="/organisations" />
    </Switch>
  </ViewContainer>
);
