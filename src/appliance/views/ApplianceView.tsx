import React, { Component } from "react";
import { connect } from "react-redux";

import { changeTab, createTab, TabPayload } from "../../components/tabbed/actions";
import { ReduxState } from "../../store/store";
import { AppliancePayload } from "../actions";

interface StateProps {
  appliances: AppliancePayload[];
  tabs: {[key: string]: TabPayload};
}

interface DispatchProps {
  changeTab(view: string, payload: string): any;
  createTab(view: string, payload: string): any;
}

interface Props {
  match: {
    params: {
      appliance: string
    };
  };
}

class ApplianceView extends Component<Props & StateProps & DispatchProps> {
  public constructor(props: Props & StateProps & DispatchProps) {
    super(props);
    const {tabs, appliances, match: {params: {appliance}}} = props;
    try {
      const applianceId = Number(appliance);
      if (typeof tabs[applianceId] === "undefined") {
        if (typeof appliances[applianceId] === "undefined") {
          // TODO: handle non-existing appliance request (attempt to fetch and on fail throw an error)
        } else {
          createTab("appliances", {
            key: applianceId,
            label: appliances[applianceId].name,
            sticky: false,
          });
        }
      } else {
        changeTab("appliances", applianceId);
      }
    } catch (e) {
      throw e;
    }
  }

  public render() {
    return (
      <>
        <div>Details of an appliance</div>
      </>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  appliances: state.entities.appliances,
  tabs: state.views.appliances.tabs,
});

export default connect(
  mapStateToProps,
  {changeTab, createTab}
)(ApplianceView as any);
