import React, { Component } from "react";
import { connect, MapStateToProps } from "react-redux";

import { createTab, TabPayload } from "../../components/tabbed/actions";
import { EntityGroup } from "../../store/reducer";
import { ReduxState } from "../../store/store";
import loadable from "../../util/hoc/loadable";
import { AppliancePayload } from "../actions";

interface StateProps {
  appliance: AppliancePayload;
  appliances: EntityGroup<AppliancePayload>;
  tabs: {[key: string]: TabPayload};
}

interface DispatchProps {
  createTab(view: string, payload: TabPayload): any;
}

interface Props {
  match: {
    params: {
      appliance: string
    };
  };
}

type AllProps = Props & DispatchProps & StateProps;

class Appliance extends Component<AllProps> {
  public static getDerivedStateFromProps(props: AllProps) {
    const {tabs, appliances, match: {params: {appliance}}} = props;
    try {
      const applianceId = Number(appliance);
      if (typeof tabs[applianceId] === "undefined") {
        if (typeof appliances[applianceId] === "undefined") {
          // TODO: handle non-existing appliance request (attempt to fetch and on fail throw an error)
        } else {
          props.createTab("appliances", {
            key: appliance,
            label: appliances[applianceId].name,
            sticky: false,
          });
        }
      }
    } catch (e) {
      throw e;
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
  appliances: state.entities.appliances,
  tabs: state.views.appliances.tabs,
});

export default connect(
  mapStateToProps,
  {createTab}
)(loadable<AllProps>(Appliance));
