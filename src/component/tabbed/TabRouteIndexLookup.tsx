import { path } from "ramda";
import React, { Dispatch } from "react";
import { connect, MapStateToProps } from "react-redux";
import { RouteProps } from "react-router";
import { Redirect, Route } from "react-router-dom";
import { EntityGroup } from "../../store/reducer";
import { ReduxState } from "../../store/store";
import { createTab, TabPayload } from "./actions";

interface StateProps {
  tabs: {[key: string]: TabPayload};
  entities: EntityGroup<any>;
}

interface DispatchProps {
  createTab(view: string, payload: TabPayload): any;
}

type Props = RouteProps;

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
    ...props
}: Props & StateProps & DispatchProps & DispatchProps) => {
    const requestedIndex = path<number>(["computedMatch", "params", accessor], props);
    const redirect = typeof requestedIndex === "undefined" || typeof entities[requestedIndex] === "undefined";

    if (
      !redirect
      && typeof requestedIndex !== "undefined"
      && typeof tabs[requestedIndex] === "undefined"
    ) {
      openTab(context, {
        key: String(requestedIndex),
        label: getLabel(entities[requestedIndex]),
        sticky: false,
      });
    }

    return redirect ? <Redirect to={rootPath} /> : <Route {...props} />;
  };

  const mapStateToProps: MapStateToProps<StateProps, Props, ReduxState> = (state) => ({
    entities: state.entities[context],
    tabs: state.views[context].tabs,
  });

  return connect<StateProps, DispatchProps, Props, ReduxState>(
    mapStateToProps,
    {createTab}
  )(RouteComponent);
};

export default TabRouteIndexLookup;
