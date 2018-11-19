import { dissoc } from "ramda";
import React from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { Dispatch } from "redux";
import Form, { FormInput, FormState } from "../components/Form";
import { createOrganisation, OrganisationPayload } from "./actions";

interface DispatchProps {
  createOrganisation: (organisation: OrganisationPayload) => (dispatch: Dispatch) => any;
}

interface Props extends RouteComponentProps, DispatchProps {
  onCancel: () => any;
  organisation?: OrganisationPayload;
}

type Inputs = "name" | "organisationIdentifier";

class OrganisationForm extends React.Component<Props> {
  public static inputs: ReadonlyArray<FormInput<Inputs> | [FormInput<Inputs>, FormInput<Inputs>]> = [
    {key: "name", props: {autoFocus: true}, validate: {required: true, minLength: 3}},
    {key: "organisationIdentifier", validate: {required: true}},
  ];

  public static getDerivedStateFromProps({organisation}: Props, prevState: object) {
    if (typeof organisation === "undefined") {
      return prevState;
    }
    return organisation;
  }

  public state = {
    errors: {},
    name: "",
    organisationIdentifier: "",
  };

  public handleSubmit = (state: FormState<Inputs>) => {
    this.props.createOrganisation(dissoc("errors", state));
  }

  public render() {
    return (
      <Form
        inputs={OrganisationForm.inputs}
        secondary={<Link to={"/"}>Cancel</Link>}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

export default connect(
  undefined, {createOrganisation}
)(OrganisationForm);
