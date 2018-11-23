import { dissoc } from "ramda";
import React, { ReactFragment } from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";

import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import Form, { FormInput, FormProps, FormState } from "../../components/Form";
import { OrganisationPayload } from "../../organisation/actions";
import { getOrganisation } from "../../organisation/state";
import { APIResponsePayload } from "../../store/middleware/api/actions";
import { ReduxState } from "../../store/store";
import loadable from "../../util/hoc/loadable";
import { AppliancePayload, createAppliance, updateAppliance } from "../actions";

interface StateProps {
  organisation?: OrganisationPayload | APIResponsePayload;
}

interface DispatchProps {
  createAppliance: (organisation: number, appliance: AppliancePayload) => any;
  updateAppliance: (organisation: number, appliance: AppliancePayload) => any;
}

type Props = Partial<FormProps<Inputs>> & RouteComponentProps;

type Inputs = "name" | "description";

class ApplianceForm extends React.Component<Props & DispatchProps & StateProps> {
  public static defaultProps = {
    submitText: "Create Appliance",
  };

  public static inputs: ReadonlyArray<FormInput<Inputs> | [FormInput<Inputs>, FormInput<Inputs>]> = [
    {key: "name", props: {autoFocus: true}, validate: {required: true, minLength: 2}},
    {key: "description", props: {getInputElement: (props) => <textarea {...props} rows={3} />}},
  ];

  public handleSubmit = async (state: FormState<Inputs>) => {
    const {id: organisation} = this.props.organisation as OrganisationPayload;
    const {state: appliance, onSubmit} = this.props;
    if (appliance) {
      await this.props.updateAppliance(organisation, {...appliance, ...dissoc("errors", state)});
    } else {
      const newAppliance = await this.props.createAppliance(organisation, dissoc("errors", state));
      if (newAppliance) {
        this.props.history.push(`/${newAppliance.id}`);
      }
    }
    if (typeof onSubmit === "function") {
      onSubmit(state);
    }
  }

  public render() {
    const {onSubmit, ...props} = this.props;
    return (
      <Form
        inputs={ApplianceForm.inputs}
        onSubmit={this.handleSubmit}
        {...props}
      />
    );
  }
}

const mapDispatchToProps: MapDispatchToProps<DispatchProps, Props> = {
  createAppliance,
  updateAppliance,
};

const mapStateToProps: MapStateToProps<StateProps, Props, ReduxState> = (state) => ({
  organisation: getOrganisation(state),
});

export default connect<StateProps, DispatchProps, Props, ReduxState>(
  mapStateToProps, mapDispatchToProps
)(loadable(ApplianceForm));
