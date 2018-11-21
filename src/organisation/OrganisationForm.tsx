import { dissoc } from "ramda";
import React, { ReactFragment } from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";

import { connect, MapDispatchToProps } from "react-redux";
import Form, { FormInput, FormState } from "../components/Form";
import { ReduxState } from "../store/store";
import { createOrganisation, OrganisationPayload } from "./actions";

interface DispatchProps {
  createOrganisation: (organisation: OrganisationPayload) => any;
}

interface Props extends RouteComponentProps {
  header: ReactFragment;
  // organisation?: OrganisationPayload;
}

type Inputs = "name" | "organisationIdentifier";

class OrganisationForm extends React.Component<Props & DispatchProps> {
  public static inputs: ReadonlyArray<FormInput<Inputs> | [FormInput<Inputs>, FormInput<Inputs>]> = [
    {key: "name", props: {autoFocus: true}, validate: {required: true, minLength: 3}},
    {key: "organisationIdentifier", validate: {required: true}},
  ];

  public handleSubmit = async (state: FormState<Inputs>) => {
    const organisation = await this.props.createOrganisation(dissoc("errors", state));
    if (organisation) {
      this.props.history.push(`/${organisation.id}`);
    }
  }

  public render() {
    return (
      <Form
        inputs={OrganisationForm.inputs}
        secondary={<Link to={"/"}>Cancel</Link>}
        header={this.props.header}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

const mapDispatchToProps: MapDispatchToProps<DispatchProps, Props> = {createOrganisation};

export default connect<{}, DispatchProps, Props, ReduxState>(
  undefined, mapDispatchToProps
)(OrganisationForm);
