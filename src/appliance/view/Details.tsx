import React from "react";
import { connect, MapStateToProps } from "react-redux";

import { useTranslation } from "react-i18next";
import { Route, RouteComponentProps, Switch } from "react-router";
import { Link } from "react-router-dom";
import Button from "../../component/button/Button";
import DoubleClickButton from "../../component/button/DoubleClickButton";
import Drawers from "../../component/drawer/Drawers";
import WithSidebar from "../../component/layout/WithSidebar";
import Restricted from "../../component/Restricted";
import { closeTab, createTab, TabPayload } from "../../component/tabbed/actions";
import TabRouteIndexLookup from "../../component/tabbed/TabRouteIndexLookup";
import Timestamps from "../../component/Timestamps";
import { apiUrl } from "../../config";
import { OrganisationPayload } from "../../organisation/actions";
import { getOrganisation } from "../../organisation/state";
import { APIResponsePayload } from "../../store/middleware/api/actions";
import { ReduxState } from "../../store/store";
import { spacedHorizontalContainer, spread } from "../../style/container";
import { alertIndication, info } from "../../style/inline";
import { spacer } from "../../style/variables/spacing";
import Loadable from "../../util/hoc/Loadable";
import { authenticatedFetch } from "../../util/utilityFunctions";
import { AppliancePayload, deleteAppliance } from "../actions";
import MaintainerAssignment from "../component/MaintainerAssignment";
import Status from "../component/Status";
import EventList from "../event/EventList";
import Edit from "./Edit";

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

type Props = RouteComponentProps & DispatchProps & StateProps & {
  match: {params: {appliance: string}}
};

const Details = ({
  tabs,
  appliance,
  history,
  organisation,
  match,
  ...props
}: Props & {organisation: OrganisationPayload}) => {
  const {t} = useTranslation();

  const handleFetchQR = async () => {
    const response = await authenticatedFetch(
      `${apiUrl}/organisations/${organisation.id}/appliances/qr?appliances=[${appliance.id}]`
      );
    (window.open("", "_blank") as Window).document.body.innerHTML = await response.text();
  };

  const handleDeleteAppliance = async () => {
    if (match.params.appliance) {
      history.push("/appliances"); // go back to root
    }
    props.closeTab("appliances", String(appliance.id));
    await props.deleteAppliance(appliance);
  };

  const renderContent = () => {
    return (
      <WithSidebar
        sidebarContent={
          <Drawers
            drawers={{
              maintainers: {
                children: <MaintainerAssignment appliance={appliance} />,
                label: t("appliance.drawer.maintainers.title"),
              },
            }}
          />
        }
      >
        <div className={spread}>
          <h1>{name}</h1>
          <div className={spacedHorizontalContainer}>
            <Restricted requirements={{userRole: {allowDeleteAppliance: true}}}>
              <DoubleClickButton
                plain={true}
                secondaryClassName={alertIndication}
                onClick={handleDeleteAppliance}
              >
                {t("appliance.action.delete")}
              </DoubleClickButton>
            </Restricted>
            <Restricted requirements={{userRole: {allowUpdateAppliance: true}}}>
              <Link to={`/appliances/${appliance.id}/edit`}>
                {t("appliance.action.edit")}
              </Link>
            </Restricted>
          </div>
        </div>
        {appliance.description}
        <div className={spacer} />
        <Status status={appliance.status} />
        {location &&
          <div className={info}><i className="material-icons">location_on</i><span>{appliance.location}</span></div>
        }
        <div className={spacer} />
        <EventList
          header={<h3>{t("appliance.event.list.title")}</h3>}
          maintenanceEvents={appliance.maintenanceEvents || []}
        />
        <div className={spacer} />
        <div className={spread}>
          <Timestamps
            translationKeys={{createdAt: "appliance.createdAt", updatedAt: "appliance.updatedAt"}}
            createdAt={appliance.createdAt}
            updatedAt={appliance.updatedAt}
          />
          <Button onClick={handleFetchQR}>
            {t("appliance.action.downloadQR")}
          </Button>
        </div>
      </WithSidebar>
    );
  };

  const TabRoute = TabRouteIndexLookup<AppliancePayload>({
    accessor: "appliance",
    context: "appliances",
    getLabel: ({name}) => name,
    rootPath: `/appliances/${appliance.id}`,
  });

  return (
    <Switch>
      <Route exact={true} path={match.path} render={renderContent} />
      <TabRoute
        path={`${match.path}/edit`}
        component={Edit}
        requirements={{userRole: {allowUpdateAppliance: true}}}
      />
    </Switch>
  );
};

const mapStateToProps: MapStateToProps<StateProps, Props, ReduxState> = (state, ownProps): StateProps => ({
  appliance: state.entities.appliances[ownProps.match.params.appliance],
  organisation: getOrganisation(state),
  tabs: state.views.appliances.tabs,
});

export default connect(
  mapStateToProps,
  {createTab, closeTab, deleteAppliance}
)(Loadable<Props, {organisation?: OrganisationPayload}>(Details));
