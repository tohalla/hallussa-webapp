import { filter, path } from "ramda";
import React, { Component } from "react";
import { connect, MapStateToProps } from "react-redux";
import NumberComponent from "../../components/drawers/subcomponents/NumberComponent";
import { getEntitiesByOrganisation } from "../../organisation/state";
import { APIResponsePayload } from "../../store/middleware/api/actions";
import { ReduxState } from "../../store/store";
import loadable from "../../util/hoc/loadable";
import { AppliancePayload } from "../actions";

interface StateProps {
  appliances: ReadonlyArray<AppliancePayload> | APIResponsePayload;
}

class Summary extends Component<StateProps> {
  public render() {
    const appliances = this.props.appliances as ReadonlyArray<AppliancePayload>;
    return (
      <div>
        <h3>Overview</h3>
        <div>
          <NumberComponent
            size={"lg"}
            number={appliances.length}
            label={"Number of appliances"}
          />
          <NumberComponent
            size={"lg"}
            number={
              appliances.length -
              filter((appliance) => Boolean(path(["appliance", "isMalfunctioning"], appliances))).length
            }
            label={"Currently operative"}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps: MapStateToProps<StateProps, {}, ReduxState> = (state: ReduxState) => ({
  appliances: getEntitiesByOrganisation(state, "appliances"),
});

export default connect(
  mapStateToProps
)(loadable(Summary));
