import { assoc, dissoc, forEachObjIndexed } from "ramda";
import React, { ChangeEvent } from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";

import Form from "../components/Form";
import { getFormInput } from "../components/util";
import { OrganisationPayload } from "./actions";

interface Props extends RouteComponentProps {
  onCancel: () => any;
  organisation?: OrganisationPayload;
}

type Inputs = "name"
  | "organisationIdentifier";

type State = {
  errors: {
      [input in Inputs]?: string | boolean
    };
} & {[input in Inputs]: string};

export default class OrganisationForm extends React.Component<Props, State> {
  public static getDerivedStateFromProps({organisation}: Props, prevState: State) {
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

  public componentDidMount() {
    this.setState(this.validate());
  }

  // returns state given as parameter after validation (errors modified)
  public validate = (state: Readonly<State> = this.state): State => {
    const newState = {...state};
    // all inputs are required, so set error to true if not already set
    forEachObjIndexed((value, key) => {
      if (key !== "errors" && (value as string).length === 0 && typeof newState.errors[key] === "undefined") {
        newState.errors[key] = true;
      }
    }, newState);

    return newState;
  }

  public handleSubmit = () => {
    dissoc("errors", this.state);
  }

  public handleInputChange = (input: Inputs) => (event: ChangeEvent<HTMLInputElement>) => {
    const newState = assoc(input, event.target.value, this.state);
    this.setState(this.validate(newState));
  }
  public renderInput = (
    key: Inputs,
    props?: {placeholder?: string, type?: "text", autoFocus?: boolean}
  ) => getFormInput<Inputs>(this.state, key, this.handleInputChange, {...props, required: true})

  public render() {
    return (
      <Form
        secondary={<Link to={"/"}>Cancel</Link>}
        onSubmit={this.handleSubmit}
      >
        {this.renderInput("name", {autoFocus: true})}
        {this.renderInput("organisationIdentifier")}
      </Form>
    );
  }
}
