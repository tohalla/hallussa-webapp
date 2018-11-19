import { map, path } from "ramda";
import React from "react";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";

import { RouteComponentProps } from "react-router";
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
  setActiveOrganisation(organisation: number, fetchRelated?: boolean): any;
}

interface Props extends RouteComponentProps {
  organisation?: OrganisationPayload;
}

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

class OrganisationSelect extends React.Component<Props & StateProps & DispatchProps, State> {
  public static getDerivedStateFromProps(props: Props & StateProps & DispatchProps, prevState: State) {
    if (props.organisation && props.organisation !== path(["selectedOrganisationOption", "organisation"], prevState)) {
      return {...prevState, selectedOrganisationOption: getOrganisationOption(props.organisation)};
    }
    return prevState;
  }

  constructor(props: Props & StateProps & DispatchProps) {
    super(props);
    this.state = {
      selectedOrganisationOption: getOrganisationOption(
        props.organisation ? props.organisation : props.activeOrganisation as OrganisationPayload
      ),
    };
  }

  public handleOrganisationSelect = (option: any) =>
    this.props.history.push(`/${option.value}`)

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

const mapStateToProps: MapStateToProps<StateProps, Props, ReduxState> = (state) => ({
  activeOrganisation: getOrganisation(state),
  organisations: getOrganisations(state),
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, Props> = {
  setActiveOrganisation,
};

export default connect<StateProps, DispatchProps, Props, ReduxState>(
  mapStateToProps, mapDispatchToProps
)(loadable(OrganisationSelect));
