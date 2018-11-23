import { dissoc } from "ramda";
import React, { ReactFragment } from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";

import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import Form, { FormInput, FormState } from "../components/Form";
import { APIResponsePayload } from "../store/middleware/api/actions";
import { ReduxState } from "../store/store";
import { createOrganisation, OrganisationPayload, setActiveOrganisation } from "./actions";
import { getOrganisation } from "./state";

interface StateProps {
  activeOrganisation?: OrganisationPayload | APIResponsePayload;
}

interface DispatchProps {
  createOrganisation: (organisation: OrganisationPayload) => any;
  setActiveOrganisation: (organisation: number, fetchRelated: boolean) => any;
}

interface Props extends RouteComponentProps {
  header: ReactFragment;
  submitText: string;
  // organisation?: OrganisationPayload;
}

type Inputs = "name" | "organisationIdentifier";

class OrganisationForm extends React.Component<Props & DispatchProps & StateProps> {
  public static defaultProps = {
    submitText: "Create organisation",
  };

  public static inputs: ReadonlyArray<FormInput<Inputs> | [FormInput<Inputs>, FormInput<Inputs>]> = [
    {key: "name", props: {autoFocus: true}, validate: {required: true, minLength: 3}},
    {key: "organisationIdentifier", validate: {required: true}},
  ];

  public handleSubmit = async (state: FormState<Inputs>) => {
    const {activeOrganisation, history} = this.props;
    const newOrganisation = await this.props.createOrganisation(dissoc("errors", state));
    if (newOrganisation) {
      if (!activeOrganisation) {// set newly created organistaion active, if no previous organisations
        this.props.setActiveOrganisation(newOrganisation.id, false);
      }
      history.push(`/${newOrganisation.id}`);
    }
  }

  public render() {
    const {header, submitText} = this.props;
    return (
      <Form
        inputs={OrganisationForm.inputs}
        secondary={<Link to={"/"}>Cancel</Link>}
        header={header}
        onSubmit={this.handleSubmit}
        submitText={submitText}
      />
    );
  }
}

const mapStateToProps: MapStateToProps<StateProps, Props, ReduxState> = (state) => ({
  activeOrganisation: getOrganisation(state),
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, Props> = { createOrganisation, setActiveOrganisation };

export default connect<{}, DispatchProps, Props, ReduxState>(
  mapStateToProps, mapDispatchToProps
)(OrganisationForm);
