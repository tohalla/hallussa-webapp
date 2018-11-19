import { map } from "ramda";
import React from "react";
import { connect, MapStateToProps } from "react-redux";
import Select from "react-select";

import Button from "../components/Button";
import { APIResponsePayload } from "../store/middleware/api/actions";
import { ReduxState } from "../store/store";
import loadable from "../util/hoc/loadable";
import { OrganisationPayload, setActiveOrganisation } from "./actions";
import { getOrganisation, getOrganisations } from "./state";

interface StateProps {
  activeOrganisation?: Readonly<OrganisationPayload> | APIResponsePayload;
  organisations: ReadonlyArray<OrganisationPayload> | APIResponsePayload;
}

interface DispatchProps {
  setActiveOrganisation(organisation: number): Promise<any>;
}

type Props = StateProps & DispatchProps;

interface OrganisationOption {
  value: number;
  label: string;
  organisation: Readonly<OrganisationPayload>;
}

interface State {
  selectedOrganisation?: OrganisationOption;
}

class Organisation extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedOrganisation: props.activeOrganisation && {
        label: (props.activeOrganisation as OrganisationPayload).name,
        organisation: (props.activeOrganisation as OrganisationPayload),
        value: (props.activeOrganisation as OrganisationPayload).id,
      },
    };
  }

  public handleOrganisationSelect = (option: any) =>
    this.setState({selectedOrganisation: option})

  public handleOrganisationChange = () =>
    this.props.setActiveOrganisation()

  public render() {
    const {activeOrganisation, organisations} = this.props;
    if (!Array.isArray(organisations) || organisations.length === 0) {
      return "No organisations created.";
    }

    const {selectedOrganisation} = this.state;

    return (
      <>
        <Select
          onChange={this.handleOrganisationSelect}
          options={map<OrganisationPayload, OrganisationOption>(
            (organisation) => ({label: organisation.name, organisation, value: organisation.id}),
            organisations
          )}
          value={this.state.selectedOrganisation}
        />
        {selectedOrganisation && activeOrganisation !== selectedOrganisation.organisation &&
          <Button>Set as active</Button>
        }
      </>
    );
  }
}

const mapStateToProps: MapStateToProps<StateProps, {}, ReduxState> = (state) => ({
  activeOrganisation: getOrganisation(state),
  organisations: getOrganisations(state),
});

export default connect(
  mapStateToProps, {setActiveOrganisation}
)(loadable<Props>(Organisation));
