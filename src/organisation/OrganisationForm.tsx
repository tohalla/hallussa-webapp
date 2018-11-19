import { dissoc } from "ramda";
import React from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";

import Form, { FormInput } from "../components/Form";
import { OrganisationPayload } from "./actions";

interface Props extends RouteComponentProps {
  onCancel: () => any;
  organisation?: OrganisationPayload;
}

type Inputs = "name" | "organisationIdentifier";

export default class OrganisationForm extends React.Component<Props> {
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

  public handleSubmit = () => {
    dissoc("errors", this.state);
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
