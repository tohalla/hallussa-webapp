import React from "react";
import { connect, MapStateToProps } from "react-redux";

import { getEntitiesByOrganisation } from "../../organisation/state";
import { APIResponsePayload } from "../../store/middleware/api/actions";
import { ReduxState } from "../../store/store";
import Loadable from "../../util/hoc/Loadable";
import { MaintainerPayload } from "../actions";
import MaintainerList from "../component/MaintainerList";

interface StateProps {
  maintainers: Readonly<MaintainerPayload[]> | APIResponsePayload;
}

type Props = StateProps & {
  maintainers: Readonly<MaintainerPayload[]>;
};

const Listing = ({maintainers}: Props) => {
  return (
    <MaintainerList maintainers={maintainers} />
  );
};

const mapStateToProps: MapStateToProps<StateProps, Props, ReduxState> = (state) => ({
  maintainers: getEntitiesByOrganisation(state, "maintainers"),
});

export default connect(mapStateToProps)(Loadable<StateProps>(Listing));
