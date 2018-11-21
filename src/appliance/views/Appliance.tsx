import React, { Component } from "react";
import { connect, MapStateToProps } from "react-redux";

import { RouteComponentProps } from "react-router";
import Button from "../../components/Button";
import { createTab, TabPayload } from "../../components/tabbed/actions";
import { apiUrl } from "../../config";
import { spread } from "../../emotion-styles/src/container";
import { OrganisationPayload } from "../../organisation/actions";
import { getOrganisation } from "../../organisation/state";
import { APIResponsePayload } from "../../store/middleware/api/actions";
import { ReduxState } from "../../store/store";
import loadable from "../../util/hoc/loadable";
import { authenticatedFetch } from "../../util/utilityFunctions";
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

  public handleFetchQR = async () => {
    const {id: organisation} = this.props.organisation as OrganisationPayload;
    const {id: appliance} = this.props.appliance as AppliancePayload;
    const response = await authenticatedFetch(
      `${apiUrl}/organisations/${organisation}/appliances/qr?appliances=[${appliance}]`
      );
    (window.open("", "_blank") as Window).document.body.innerHTML = await response.text();
  }

  public render() {
    const {appliance} = this.props;
    return typeof appliance === "object" && (
      <>
        <div className={spread}>
          <h1>{appliance.name}</h1>
          <Button onClick={this.handleFetchQR}>Download QR code</Button>
        </div>
        {appliance.description}
      </>
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
