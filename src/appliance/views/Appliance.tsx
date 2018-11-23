import { pick } from "ramda";
import React, { Component } from "react";
import { connect, MapStateToProps } from "react-redux";

import { RouteComponentProps } from "react-router";
import Button from "../../components/Button";
import Drawers from "../../components/drawers/Drawers";
import WithSidebar from "../../components/layouts/WithSidebar";
import { createTab, TabPayload } from "../../components/tabbed/actions";
import { apiUrl } from "../../config";
import { padded, spacedHorizontalContainer, spread } from "../../emotion-styles/src/container";
import { link } from "../../emotion-styles/src/inline";
import { spacer } from "../../emotion-styles/src/variables/spacing";
import { OrganisationPayload } from "../../organisation/actions";
import { getOrganisation } from "../../organisation/state";
import { APIResponsePayload } from "../../store/middleware/api/actions";
import { ReduxState } from "../../store/store";
import loadable from "../../util/hoc/loadable";
import { authenticatedFetch } from "../../util/utilityFunctions";
import { AppliancePayload } from "../actions";
import ApplianceForm from "../components/ApplianceForm";
import MaintainerAssignment from "../components/MaintainerAssignment";

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

type Actions = "default" | "edit";
interface State {
  action: Actions;
}

class Appliance extends Component<Props, State> {
  public static getDerivedStateFromProps(props: Props, prevState: State) {
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

  public state: State = {
    action: "default",
  };

  public setAction = (action: Actions = "default") => () => this.setState({action});

  public handleFetchQR = async () => {
    const {id: organisation} = this.props.organisation as OrganisationPayload;
    const {id: appliance} = this.props.appliance as AppliancePayload;
    const response = await authenticatedFetch(
      `${apiUrl}/organisations/${organisation}/appliances/qr?appliances=[${appliance}]`
      );
    (window.open("", "_blank") as Window).document.body.innerHTML = await response.text();
  }

  public renderSidebar = () => (
    <Drawers
      drawers={{
        maintainers: {
          content: <MaintainerAssignment appliance={this.props.appliance} />,
          label: "Maintainers",
        },
      }}
    />
  )

  public renderContent = () => {
    const {appliance} = this.props;
    return (
      <div>
        <div className={spread}>
          <h1>{appliance.name}</h1>
          <div className={spacedHorizontalContainer}>
            <Button plain={true} onClick={this.setAction("edit")}>Edit appliance</Button>
          </div>
        </div>
        {appliance.description}
        <div className={spacer} />
        <div className={spread}>
          <span />
          <Button onClick={this.handleFetchQR}>Download QR code</Button>
        </div>
      </div>
    );
  }

  public render() {
    const {appliance} = this.props;
    const routerProps: RouteComponentProps = pick(["history", "match", "location"], this.props);
    const {action} = this.state;
    if (action === "edit") {
      return (
        <div className={padded}>
          <ApplianceForm
            state={appliance}
            onSubmit={this.setAction()}
            secondary={<Button className={link} plain={true} onClick={this.setAction()}>Cancel</Button>}
            header={<h1>Edit appliance – {appliance.name}</h1>}
            submitText="Update appliance"
            {...routerProps}
          />
        </div>
      );
    }
    return (
      <WithSidebar
        content={this.renderContent()}
        sidebarContent={this.renderSidebar()}
      />
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
