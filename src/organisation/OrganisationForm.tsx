import { dissoc } from "ramda";
import React from "react";
import { RouteComponentProps } from "react-router";

import { useTranslation } from "react-i18next";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import Form, { FormProps, FormState } from "../components/Form";
import { APIResponsePayload } from "../store/middleware/api/actions";
import { ReduxState } from "../store/store";
import { createOrganisation, OrganisationPayload, setActiveOrganisation, updateOrganisation } from "./actions";
import { getOrganisation } from "./state";

interface StateProps {
  activeOrganisation?: OrganisationPayload | APIResponsePayload;
}

interface DispatchProps {
  setActiveOrganisation: (organisation: number, fetchRelated: boolean) => any;
  createOrganisation(organisation: OrganisationPayload): any;
  updateOrganisation(organisation: OrganisationPayload): any;
}

type Inputs = "name" | "organisationIdentifier" | "id";

type Props = Partial<FormProps<Inputs>> & RouteComponentProps;

const OrganisationForm = ({
  onSubmit,
  ...props
}: Props & DispatchProps & StateProps) => {
  const handleSubmit = async (state: FormState<Inputs>) => {
    const {activeOrganisation, history, state: organisation} = props;
    if (organisation) {
      await props.updateOrganisation({...organisation, ...dissoc("errors", state)});
    } else {
      const newOrganisation = await props.createOrganisation(dissoc("errors", state));
      if (newOrganisation) {
        if (!activeOrganisation) {// set newly created organistaion active, if no previous organisations
          props.setActiveOrganisation(newOrganisation.id, false);
        }
      }
      history.push(`/organisations/${newOrganisation.id}`);
    }
    if (typeof onSubmit === "function") {
      onSubmit(state);
    }
  };

  const {t} = useTranslation();

  return (
    <Form
      inputs={[
        {
          key: "name",
          props: {autoFocus: true, placeholder: t("organisation.field.name")},
          validate: {required: true, minLength: 3},
        },
        {
          key: "organisationIdentifier",
          props: {placeholder: t("organisation.field.organisationIdentifier")},
          validate: {required: true},
        },
      ]}
      onSubmit={handleSubmit}
      {...props}
    />
  );
};

const mapStateToProps: MapStateToProps<StateProps, Props, ReduxState> = (state) => ({
  activeOrganisation: getOrganisation(state),
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, Props> = {
  createOrganisation,
  setActiveOrganisation,
  updateOrganisation,
};

export default connect<{}, DispatchProps, Props, ReduxState>(
  mapStateToProps, mapDispatchToProps
)(OrganisationForm);
