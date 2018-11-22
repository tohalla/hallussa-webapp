import { dissoc } from "ramda";
import React, { ReactFragment } from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";

import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import Form, { FormInput, FormState } from "../../components/Form";
import { OrganisationPayload } from "../../organisation/actions";
import { getOrganisation } from "../../organisation/state";
import { APIResponsePayload } from "../../store/middleware/api/actions";
import { ReduxState } from "../../store/store";
import loadable from "../../util/hoc/loadable";
import { AppliancePayload, createAppliance } from "../actions";

interface StateProps {
  organisation?: OrganisationPayload | APIResponsePayload;
}

interface DispatchProps {
  createAppliance: (organisation: number, appliance: AppliancePayload) => any;
}

interface Props extends RouteComponentProps, DispatchProps, StateProps {
  onCancel: () => any;
  submitText: string;
  header: ReactFragment;
  appliance?: AppliancePayload;
}

type Inputs = "name" | "description";

class ApplianceForm extends React.Component<Props> {
  public static defaultProps = {
    submitText: "Create Appliance",
  };

  public static inputs: ReadonlyArray<FormInput<Inputs> | [FormInput<Inputs>, FormInput<Inputs>]> = [
    {key: "name", props: {autoFocus: true}, validate: {required: true, minLength: 2}},
    {key: "description"},
  ];

  public handleSubmit = async (state: FormState<Inputs>) => {
    const {id: organisation} = this.props.organisation as OrganisationPayload;
    const appliance = await this.props.createAppliance(organisation, dissoc("errors", state));
    if (appliance) {
      this.props.history.push(`/${appliance.id}`);
    }
  }

  public render() {
    const {header, submitText} = this.props;
    return (
      <Form
        inputs={ApplianceForm.inputs}
        secondary={<Link to={"/"}>Cancel</Link>}
        onSubmit={this.handleSubmit}
        header={header}
        submitText={submitText}
      />
    );
  }
}

const mapDispatchToProps: MapDispatchToProps<DispatchProps, Props> = {createAppliance};

const mapStateToProps: MapStateToProps<StateProps, Props, ReduxState> = (state) => ({
  organisation: getOrganisation(state),
});

export default connect<StateProps, DispatchProps, Props, ReduxState>(
  mapStateToProps, mapDispatchToProps
)(loadable(ApplianceForm));
