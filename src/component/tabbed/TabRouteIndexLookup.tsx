import { path } from "ramda";
import React from "react";
import { connect, MapStateToProps } from "react-redux";
import { RouteProps } from "react-router";
import { Redirect } from "react-router-dom";

import { getStatus } from "../../organisation/state";
import { EntityGroup } from "../../store/reducer";
import { ReduxState } from "../../store/store";
import Loadable from "../../util/hoc/Loadable";
import { RequirementProps, RestrictedRoute } from "../Restricted";
import { createTab, TabPayload } from "./actions";

interface StateProps {
  tabs: {[key: string]: TabPayload};
  entities: EntityGroup<any>;
}

interface DispatchProps {
  createTab(view: string, payload: TabPayload): any;
}

interface Props extends RouteProps {
  requirements?: RequirementProps;
}

interface HProps<T> {
  context: "appliances" | "maintainers";
  getLabel: (target: T) => string;
  rootPath: string;
  accessor: string;
}

const TabRouteIndexLookup = <T extends {}>({context, getLabel, rootPath, accessor}: HProps<T>) => {
  const RouteComponent = ({
    tabs,
    entities,
    createTab: openTab,
    requirements,
    component,
    path: routePath,
    ...props
  }: Props & StateProps & DispatchProps & DispatchProps) => {
    const requestedIndex = path<number>(["computedMatch", "params", accessor], props);

    if (typeof requestedIndex === "undefined" || typeof entities[requestedIndex] === "undefined") {
      return <Redirect to={rootPath} />;
    }

    if (typeof requestedIndex !== "undefined" && typeof tabs[requestedIndex] === "undefined") {
      openTab(context, {
        key: String(requestedIndex),
        label: getLabel(entities[requestedIndex]),
        sticky: false,
      });
    }

    return (
      <RestrictedRoute
        to={rootPath}
        requirements={requirements}
        component={component}
        path={routePath}
      />
    );
  };

  const mapStateToProps: MapStateToProps<StateProps, Props, ReduxState> = (state) => ({
    entities: state.session.activeOrganisation ? getStatus(state, context) || state.entities[context] : {},
    tabs: state.views[context].tabs,
  });

  return connect<StateProps, DispatchProps, Props, ReduxState>(
    mapStateToProps,
    {createTab}
  )(Loadable(RouteComponent));
};

export default TabRouteIndexLookup;
