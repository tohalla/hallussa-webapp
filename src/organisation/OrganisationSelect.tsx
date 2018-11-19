import { map } from "ramda";
import React from "react";
import { connect, MapStateToProps } from "react-redux";

import Button from "../components/Button";
import Select from "../components/Select";
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
  selectedOrganisationOption?: OrganisationOption;
}

class Organisation extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedOrganisationOption: props.activeOrganisation && {
        label: (props.activeOrganisation as OrganisationPayload).name,
        organisation: (props.activeOrganisation as OrganisationPayload),
        value: (props.activeOrganisation as OrganisationPayload).id,
      },
    };
  }

  public handleOrganisationSelect = (option: any) =>
    this.setState({selectedOrganisationOption: option})

  public handleOrganisationChange = () => {
    const {selectedOrganisationOption} = this.state;
    if (selectedOrganisationOption) {
      this.props.setActiveOrganisation(selectedOrganisationOption.organisation.id);
    }
  }

  public render() {
    const {activeOrganisation, organisations} = this.props;
    if (!Array.isArray(organisations) || organisations.length === 0) {
      return "No organisations created.";
    }

    const {selectedOrganisationOption} = this.state;

    return (
      <>
        <Select
          onChange={this.handleOrganisationSelect}
          options={map<OrganisationPayload, OrganisationOption>(
            (organisation) => ({label: organisation.name, organisation, value: organisation.id}),
            organisations
          )}
          value={this.state.selectedOrganisationOption}
        />
        {selectedOrganisationOption && activeOrganisation !== selectedOrganisationOption.organisation &&
          <Button onClick={this.handleOrganisationChange}>Set as active</Button>
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
