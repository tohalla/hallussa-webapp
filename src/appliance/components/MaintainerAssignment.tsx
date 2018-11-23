import { groupBy, map } from "ramda";
import React from "react";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";

import Button from "../../components/Button";
import Select from "../../components/Select";
import { rowContainer, stacked } from "../../emotion-styles/src/container";
import { large } from "../../emotion-styles/src/variables/fontSizes";
import { normal } from "../../emotion-styles/src/variables/spacing";
import { MaintainerPayload } from "../../maintainer/actions";
import { getEntitiesByOrganisation } from "../../organisation/state";
import { APIResponsePayload } from "../../store/middleware/api/actions";
import { ReduxAPICall } from "../../store/middleware/api/api";
import { ReduxState } from "../../store/store";
import loadable from "../../util/hoc/loadable";
import { AppliancePayload, assignMaintainerToAppliance, removeMaintainerFromAppliance } from "../actions";

interface StateProps {
  maintainers?: ReadonlyArray<MaintainerPayload> | APIResponsePayload;
}

interface DispatchProps {
  assignMaintainerToAppliance(
    organisation: number,
    appliance: number,
    maintainer: number
  ): ReduxAPICall;
  removeMaintainerFromAppliance(
    organisation: number,
    appliance: number,
    maintainer: number
  ): ReduxAPICall;
}

interface Props {
  appliance: AppliancePayload;
}

interface State {
  maintainer?: null | {value: number, label: string};
}

const getMaintainerOption = ({firstName, lastName, id}: MaintainerPayload) => ({
  label: `${firstName} ${lastName}`, value: id,
});

class MaintainerAssignment extends React.Component<Props & StateProps & DispatchProps, State> {
  public state: State = {
    maintainer: null,
  };

  public setMaintainer = (maintainer?: any) =>
    this.setState({maintainer})

  public assignMaintainer = async () => {
    if (this.state.maintainer) {
      const {appliance} = this.props;
      await this.props.assignMaintainerToAppliance(
        appliance.organisation,
        appliance.id,
        this.state.maintainer.value
      );
    }
    this.setState({maintainer: null});
  }

  public removeMaintainer = (maintainer: number) => () => {
    const {appliance} = this.props;
    this.props.removeMaintainerFromAppliance(
      appliance.organisation,
      appliance.id,
      maintainer
    );
  }

  public render() {
    const {appliance, maintainers} = this.props;
    const {assigned, assignable} = groupBy(
      (maintainer) => appliance.maintainers.indexOf(maintainer.id) === -1 ? "assignable" : "assigned",
      maintainers as ReadonlyArray<MaintainerPayload>
    );
    return (
      <>
        {assignable ?
        <div className={stacked}>
          <Select
            options={map(getMaintainerOption, assignable)}
            onChange={this.setMaintainer}
            value={this.state.maintainer}
            placeholder="Select maintainer to assign"
          />
            {this.state.maintainer &&
              <Button onClick={this.assignMaintainer}>Assign maintainer</Button>
            }
          </div> : "No more maintainers available to add."
        }
        {assigned && <div style={{marginTop: normal}}>
          {map((maintainer: MaintainerPayload) => (
            <div key={maintainer.id} className={rowContainer}>
              {maintainer.firstName} {maintainer.lastName}
              <span
                className="material-icons"
                style={{fontSize: large, cursor: "pointer"}}
                onClick={this.removeMaintainer(maintainer.id)}
              >
                close
              </span>
            </div>
          ), assigned)}
        </div>}
        {}
      </>
    );
  }
}

const mapDispatchToProps: MapDispatchToProps<DispatchProps, Props> = {
  assignMaintainerToAppliance,
  removeMaintainerFromAppliance,
};

const mapStateToProps: MapStateToProps<StateProps, Props, ReduxState> = (state) => ({
  maintainers: getEntitiesByOrganisation(state, "maintainers"),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  loadable(MaintainerAssignment)
);
