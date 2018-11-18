import React, { Component } from "react";
import { connect, MapStateToProps } from "react-redux";

import { RouteComponentProps } from "react-router";
import { createTab, TabPayload } from "../../components/tabbed/actions";
import { ReduxState } from "../../store/store";
import loadable from "../../util/hoc/loadable";
import { AppliancePayload } from "../actions";

interface StateProps {
  appliance: AppliancePayload;
  tabs: {[key: string]: TabPayload};
}

interface DispatchProps {
  createTab(view: string, payload: TabPayload): any;
}

type Props = RouteComponentProps & DispatchProps & StateProps & {
  match: {params: {appliance: string}}
};

class Appliance extends Component<Props> {

  public static getDerivedStateFromProps(props: Props) {
    const {tabs, appliance, history} = props;
    if (typeof appliance === "undefined") {
      history.push("/");
      return null;
    }
    if (typeof tabs[appliance.id] === "undefined") {
      props.createTab("appliances", {
        key: String(appliance.id),
        label: appliance.name,
        sticky: false,
      });
    }
    return {};
  }
  public state = {};

  public render() {
    const {appliance} = this.props;
    return typeof appliance === "object" && (
      <>
        <div>Details of an appliance: {appliance.name}</div>
      </>
    );
  }
}

const mapStateToProps: MapStateToProps<StateProps, Props, ReduxState> = (
  state: ReduxState,
  ownProps: Props
): StateProps => ({
  appliance: state.entities.appliances[ownProps.match.params.appliance],
  tabs: state.views.appliances.tabs,
});

export default connect(
  mapStateToProps,
  {createTab}
)(loadable<Props>(Appliance));
