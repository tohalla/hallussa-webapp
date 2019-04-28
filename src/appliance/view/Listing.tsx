import React from "react";
import { connect, MapStateToProps } from "react-redux";
import { AppliancePayload } from "../actions";

import Drawers from "../../component/drawer/Drawers";
import WithSidebar from "../../component/layout/WithSidebar";
import { getEntitiesByOrganisation } from "../../organisation/state";
import { APIResponsePayload } from "../../store/middleware/api/actions";
import { ReduxState } from "../../store/store";
import Loadable from "../../util/hoc/Loadable";
import ApplianceList from "../component/ApplianceList";
import Summary from "../drawer/Summary";

interface StateProps {
  appliances: Readonly<AppliancePayload[]> | APIResponsePayload;
}

type Props = StateProps & {
  appliances: Readonly<AppliancePayload[]>;
};

const Listing = ({appliances}: Props) => {
  return (
    <WithSidebar
      sidebarContent={
        <Drawers
          drawers={{
            summary: {
              content: <Summary />,
              label: "Summary",
            },
          }}
        />
      }
    >
      <ApplianceList appliances={appliances} />
    </WithSidebar>
  );
};

const mapStateToProps: MapStateToProps<StateProps, Props, ReduxState> = (state) => ({
  appliances: getEntitiesByOrganisation(state, "appliances"),
});

export default connect(
  mapStateToProps
)(Loadable<StateProps>(Listing));
