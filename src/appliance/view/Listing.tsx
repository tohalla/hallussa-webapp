import React from "react";
import { useTranslation } from "react-i18next";
import { connect, MapStateToProps } from "react-redux";
import { AppliancePayload } from "../actions";

import Drawer from "../../component/drawer/Drawer";
import WithSidebar from "../../component/layout/WithSidebar";
import { getEntitiesByOrganisationSelector } from "../../organisation/selectors";
import { APIResponsePayload } from "../../store/middleware/api/actions";
import { ReduxState } from "../../store/store";
import Loadable from "../../util/hoc/Loadable";
import ApplianceList from "../component/ApplianceList";
import Overview from "../drawer/Overview";

interface StateProps {
  appliances: Readonly<AppliancePayload[]> | APIResponsePayload;
}

type Props = StateProps & {
  appliances: Readonly<AppliancePayload[]>;
};

const Listing = ({appliances}: Props) => {
  const {t} = useTranslation();
  return (
    <WithSidebar
      sidebarContent={
        <>
          <Drawer label={t("appliance.drawer.overview.title")}>
            <Overview />
          </Drawer>
        </>
      }
    >
      <h1>{t("organisation.appliances.title")}</h1>
      <ApplianceList appliances={appliances} />
    </WithSidebar>
  );
};

const mapStateToProps: MapStateToProps<StateProps, Props, ReduxState> = (state) => ({
  appliances: getEntitiesByOrganisationSelector<"appliances">("appliances", state.session.activeOrganisation)(state),
});

export default connect(
  mapStateToProps
)(Loadable<StateProps>(Listing));
