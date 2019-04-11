import classNames from "classnames";
import React from "react";
import { Redirect, Route, RouteComponentProps, Switch } from "react-router-dom";

import ViewContainer from "../components/layouts/ViewContainer";
import { padded, viewContentContainer } from "../styles/container";
import OrganisationForm from "./OrganisationForm";
import Organisation from "./views/Organisation";

const NewOrganisation = (props: RouteComponentProps) =>
  <OrganisationForm header={<h1>New organisation</h1>} {...props} />;

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
