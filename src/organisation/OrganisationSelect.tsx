import { map } from "ramda";
import React from "react";
import { connect, MapStateToProps } from "react-redux";

import Button from "../components/Button";
import Select from "../components/Select";
import { rowContainer } from "../emotion-styles/src/container";
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

const getOrganisationOption = (organisation: OrganisationPayload): OrganisationOption => ({
  label: organisation.name, organisation, value: organisation.id,
});

class OrganisationSelect extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedOrganisationOption: props.activeOrganisation && getOrganisationOption(
        props.activeOrganisation as OrganisationPayload
      ),
    };
  }

  public handleOrganisationSelect = (option: any) => this.setState({
    selectedOrganisationOption: Array.isArray(option) ?
      getOrganisationOption(this.props.activeOrganisation as OrganisationPayload) : option,
  })

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
      <div className={rowContainer}>
        <Select
          onChange={this.handleOrganisationSelect}
          options={map<OrganisationPayload, OrganisationOption>(getOrganisationOption, organisations)}
          value={selectedOrganisationOption}
        />
        {selectedOrganisationOption && activeOrganisation !== selectedOrganisationOption.organisation &&
          <Button onClick={this.handleOrganisationChange}>
            Set as active
          </Button>
        }
      </div>
    );
  }
}

const mapStateToProps: MapStateToProps<StateProps, {}, ReduxState> = (state) => ({
  activeOrganisation: getOrganisation(state),
  organisations: getOrganisations(state),
});

export default connect(
  mapStateToProps, {setActiveOrganisation}
)(loadable<Props>(OrganisationSelect));
