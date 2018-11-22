import { map } from "ramda";
import React from "react";
import { connect, MapStateToProps } from "react-redux";

import Select from "../../components/Select";
import { MaintainerPayload } from "../../maintainer/actions";
import { getEntitiesByOrganisation } from "../../organisation/state";
import { APIResponsePayload } from "../../store/middleware/api/actions";
import { ReduxState } from "../../store/store";
import { AppliancePayload } from "../actions";

interface StateProps {
  maintainers?: ReadonlyArray<MaintainerPayload> | APIResponsePayload;
}

interface Props {
  appliance: AppliancePayload;
}

const getMaintainerOption = ({firstName, lastName, id}: MaintainerPayload) => ({
  label: `${firstName} ${lastName}`, value: id,
});

class MaintainerAssignment extends React.Component<Props & StateProps> {
  public render() {
    const maintainers = this.props.maintainers as ReadonlyArray<MaintainerPayload>;
    return (
      <>
        <Select
           options={map(getMaintainerOption, maintainers)}
        />
        {}
      </>
    );
  }
}

const mapStateToProps: MapStateToProps<StateProps, Props, ReduxState> = (state) => ({
  maintainers: getEntitiesByOrganisation(state, "maintainers"),
});

export default connect(mapStateToProps)(MaintainerAssignment);
