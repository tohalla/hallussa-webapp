import classNames from "classnames";
import { pick } from "ramda";
import React, { Component } from "react";
import { connect, MapStateToProps } from "react-redux";

import { format } from "date-fns";
import i18next from "i18next";
import { withTranslation, WithTranslation } from "react-i18next";
import { RouteComponentProps } from "react-router";
import Button from "../../components/Button";
import DoubleClickButton, { deletionConfirmation } from "../../components/DoubleClickButton";
import Drawers from "../../components/drawers/Drawers";
import WithSidebar from "../../components/layouts/WithSidebar";
import { closeTab, createTab, TabPayload } from "../../components/tabbed/actions";
import { apiUrl } from "../../config";
import { OrganisationPayload } from "../../organisation/actions";
import { getOrganisation } from "../../organisation/state";
import { APIResponsePayload } from "../../store/middleware/api/actions";
import { ReduxState } from "../../store/store";
import { padded, spacedHorizontalContainer, spread, stacked } from "../../styles/container";
import { alertIndication, info, link, timestamp } from "../../styles/inline";
import { indicator } from "../../styles/variables/colors";
import { spacer } from "../../styles/variables/spacing";
import loadable from "../../util/hoc/loadable";
import { authenticatedFetch } from "../../util/utilityFunctions";
import { AppliancePayload, deleteAppliance, MaintenanceEventPayload } from "../actions";
import ApplianceForm from "../components/ApplianceForm";
import MaintainerAssignment from "../components/MaintainerAssignment";
import EventList from "../events/EventList";

interface StateProps {
  organisation?: OrganisationPayload | APIResponsePayload;
  appliance: AppliancePayload;
  tabs: {[key: string]: TabPayload};
}

interface DispatchProps {
  createTab(view: string, payload: TabPayload): any;
  closeTab(view: string, payload: string): any;
  deleteAppliance(appliance: AppliancePayload): any;
}

type Props = RouteComponentProps & DispatchProps & StateProps & WithTranslation & {
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
      history.push("/appliances");
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

  public handleDeleteAppliance = async () => {
    if (this.props.match.params.appliance) {
      this.props.history.push("/appliances"); // go back to root
    }
    this.props.closeTab("appliances", String(this.props.appliance.id));
    await this.props.deleteAppliance(this.props.appliance);
  }

  public renderContent = (t: i18next.TFunction) => {
    if (!this.props.appliance) {
      return <div />;
    }
    const {appliance: {
      name,
      description,
      location,
      createdAt,
      updatedAt,
      maintenanceEvents = [],
      status,
    }} = this.props;
    return (
      <div>
        <div className={spread}>
          <h1>{name}</h1>
          <div className={spacedHorizontalContainer}>
            <DoubleClickButton
              plain={true}
              renderSecondaryContent={deletionConfirmation}
              secondaryClassName={alertIndication}
              onClick={this.handleDeleteAppliance}
            >
              {t("appliance.action.delete")}
            </DoubleClickButton>
            <Button plain={true} onClick={this.setAction("edit")}>
              {t("appliance.action.edit")}
            </Button>
          </div>
        </div>
        {description}
        <div className={spacer} />
        <div className={info}><i className="material-icons">info</i>
          {status && status.isMalfunctioning ?
            <span style={{color: indicator.error}}>{t("appliance.status.malfunctioning")}</span>
          : <span style={{color: indicator.success}}>{t("appliance.status.ok")}</span>}
        </div>
        {location &&
          <div className={info}><i className="material-icons">location_on</i><span>{location}</span></div>
        }
        <div className={spacer} />
        <EventList
          header={<h3>{t("appliance.event.list.title")}</h3>}
          maintenanceEvents={maintenanceEvents as MaintenanceEventPayload[]}
        />
        <div className={spacer} />
        <div className={spread}>
          <div className={classNames(stacked, timestamp)} style={{alignSelf: "stretch", justifyContent: "center"}}>
            <span>{t("appliance.createdAt", {createdAt: format(createdAt, "D.M.YYYY")})}</span>
            {
              updatedAt &&
              <span>{t("appliance.updatedAt", {updatedAt: format(updatedAt, "D.M.YYYY – HH:mm")})}</span>
            }
          </div>
          <Button onClick={this.handleFetchQR}>
            {t("appliance.action.downloadQR")}
          </Button>
        </div>
      </div>
    );
  }

  public render() {
    const {appliance, t} = this.props;
    const routerProps: RouteComponentProps = pick(["history", "match", "location"], this.props);
    const {action} = this.state;
    if (action === "edit") {
      return (
        <div className={padded}>
          <ApplianceForm
            state={appliance}
            onSubmit={this.setAction()}
            secondary={
              <Button className={link} plain={true} onClick={this.setAction()}>
                {t("cancel")}
              </Button>
            }
            header={<h1>{t("appliance.edit.title", {appliance: appliance.name})}</h1>}
            submitText={t("appliance.edit.form.submit")}
            {...routerProps}
          />
        </div>
      );
    }
    return (
      <WithSidebar
        content={this.renderContent(t)}
        sidebarContent={
          <Drawers
            drawers={{
              maintainers: {
                content: <MaintainerAssignment appliance={this.props.appliance} />,
                label: t("appliance.drawers.maintainers.title"),
              },
            }}
          />
        }
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
  {createTab, closeTab, deleteAppliance}
)(loadable<Props>(withTranslation()(Appliance)));
