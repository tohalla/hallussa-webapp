import classnames from "classnames";
import { pick } from "ramda";
import React, { useEffect } from "react";
import { connect, MapStateToProps } from "react-redux";
import { useTranslation } from "react-i18next";

import { RouteComponentProps } from "react-router";
import Button from "../../component/button/Button";
import WithSidebar from "../../component/layout/WithSidebar";
import Restricted from "../../component/Restricted";
import Timestamps from "../../component/Timestamps";
import { apiUrl } from "../../config";
import { fetchApplianceEvents, MaintenanceEventPayload } from "../../maintenance/event/actions";
import MaintenanceEventList from "../../maintenance/event/MaintenanceEventList";
import { OrganisationPayload } from "../../organisation/actions";
import { getOrganisation } from "../../organisation/state";
import { APIResponsePayload } from "../../store/middleware/api/actions";
import { ReduxState } from "../../store/store";
import {
  alignFlexStart,
  contentVerticalSpacingMinor,
  spread
} from "../../style/container";
import { info } from "../../style/inline";
import { spacer } from "../../style/variables/spacing";
import Loadable from "../../util/hoc/Loadable";
import { authenticatedFetch } from "../../util/utilityFunctions";
import { AppliancePayload } from "../actions";
import Actions from "../component/Actions";
import Status from "../component/Status";
import ApplianceDrawers from "../drawer/ApplianceDrawers";

interface StateProps {
  organisation?: OrganisationPayload | APIResponsePayload;
  appliance: AppliancePayload;
  maintenanceEvents: Readonly<MaintenanceEventPayload[]>;
}

interface DispatchProps {
  fetchApplianceEvents: typeof fetchApplianceEvents;
}

interface Props extends RouteComponentProps<{appliance: string}>, DispatchProps, StateProps {
  organisation: OrganisationPayload;
}

const Details = ({
  appliance,
  history,
  organisation,
  match,
  maintenanceEvents,
  ...props
}: Props & {organisation: OrganisationPayload}) => {
  useEffect(() => {
    props.fetchApplianceEvents(organisation.id, appliance.id);
  }, []);

  const {t} = useTranslation();

  const handleFetchQR = async () => {
    const response = await authenticatedFetch(
      `${apiUrl}/organisations/${organisation.id}/appliances/qr?appliances=[${appliance.id}]`
      );
    (window.open("", "_blank") as Window).document.body.innerHTML = await response.text();
  };

  return (
    <WithSidebar sidebarContent={<ApplianceDrawers appliance={appliance} />}>
      <div className={classnames(spread, alignFlexStart)}>
        <h1>{appliance.name}</h1>
        <Actions appliance={appliance} match={match} history={history} />
      </div>
      {appliance.description}
      <div className={spacer} />
      <div className={contentVerticalSpacingMinor}>
        <Status status={appliance.status} />
        {appliance.location &&
          <div className={info}><i className="material-icons">location_on</i><span>{appliance.location}</span></div>
        }
      </div>
      <div className={spacer} />
      <MaintenanceEventList
        header={<h2>{t("appliance.event.list.title")}</h2>}
        maintenanceEvents={maintenanceEvents}
      />
      <div className={spacer} />
      <div className={spread}>
        <Timestamps
          translationKeys={{createdAt: "appliance.createdAt", updatedAt: "appliance.updatedAt"}}
          createdAt={appliance.createdAt}
          updatedAt={appliance.updatedAt}
        />
        <Restricted requirements={{organisationPreferences: {qrCodes: true}}}>
          <Button onClick={handleFetchQR}>
            {t("appliance.action.downloadQR")}
          </Button>
        </Restricted>
      </div>
    </WithSidebar>
  );
};

const mapStateToProps: MapStateToProps<StateProps, Props, ReduxState> = (state, ownProps): StateProps => {
  const appliance = state.entities.appliances[ownProps.match.params.appliance];
  return ({
    appliance,
    maintenanceEvents: appliance && Array.isArray(appliance.maintenanceEvents) ? Object.values(
      pick(appliance.maintenanceEvents.map(String), state.entities.maintenanceEvents)
    ) : [],
    organisation: getOrganisation(state),
  });
};

export default connect(
  mapStateToProps,
  {fetchApplianceEvents}
)(Loadable<StateProps, Props>(Details));
