import React, { Component } from "react";
import { connect, MapStateToProps } from "react-redux";

import { RouteComponentProps } from "react-router";
import { createTab, TabPayload } from "../../components/tabbed/actions";
import { OrganisationPayload } from "../../organisation/actions";
import { getOrganisation } from "../../organisation/state";
import { APIResponsePayload } from "../../store/middleware/api/actions";
import { ReduxState } from "../../store/store";
import loadable from "../../util/hoc/loadable";
import { AppliancePayload } from "../actions";

interface StateProps {
  organisation?: OrganisationPayload | APIResponsePayload;
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
  public static getDerivedStateFromProps(props: Props, prevState: object) {
    const {tabs, appliance, history, organisation} = props;
    if (
      typeof appliance === "undefined"
      || typeof organisation === "undefined"
      || (organisation as OrganisationPayload).appliances.indexOf(appliance.id) === -1
    ) {
      history.push("/");
      return prevState;
    }
    if (typeof tabs[appliance.id] === "undefined") {
      props.createTab("appliances", {
        key: String(appliance.id),
        label: appliance.name,
        sticky: false,
      });
    }
    return prevState;
  }
  public state = {};

  public render() {
    const {appliance} = this.props;
    return typeof appliance === "object" && (
      <div>Details of an appliance: {appliance.name}</div>
    );
  }
}

const mapStateToProps: MapStateToProps<StateProps, Props, ReduxState> = (state, ownProps): StateProps => ({
  appliance: state.entities.appliances[ownProps.match.params.appliance],
  organisation: getOrganisation(state),
  tabs: state.views.appliances.tabs,
});

export default connect(
  mapStateToProps,
  {createTab}
)(loadable<Props>(Appliance));
