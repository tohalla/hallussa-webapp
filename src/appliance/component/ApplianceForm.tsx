import { dissoc } from "ramda";
import React from "react";
import { RouteComponentProps } from "react-router";

import { withTranslation, WithTranslation } from "react-i18next";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import Form, { FormProps, FormState } from "../../component/Form";
import { OrganisationPayload } from "../../organisation/actions";
import { getOrganisation } from "../../organisation/state";
import { APIResponsePayload } from "../../store/middleware/api/actions";
import { ReduxState } from "../../store/store";
import Loadable from "../../util/hoc/Loadable";
import { AppliancePayload, createAppliance, updateAppliance } from "../actions";

interface StateProps {
  organisation?: OrganisationPayload | APIResponsePayload;
}

interface DispatchProps {
  createAppliance: (organisation: number, appliance: AppliancePayload) => any;
  updateAppliance: (appliance: AppliancePayload) => any;
}

type Props = Partial<FormProps<Inputs>> & RouteComponentProps;

type Inputs = "name" | "description" | "location";

class ApplianceForm extends React.Component<Props & DispatchProps & StateProps & WithTranslation> {
  public handleSubmit = async (state: FormState<Inputs>) => {
    const {id: organisation} = this.props.organisation as OrganisationPayload;
    const {state: appliance, onSubmit} = this.props;
    if (appliance) {
      await this.props.updateAppliance({...appliance, ...dissoc("errors", state)});
    } else {
      const newAppliance = await this.props.createAppliance(organisation, dissoc("errors", state));
      if (newAppliance) {
        this.props.history.push(`/appliances/${newAppliance.id}`);
      }
    }
    if (typeof onSubmit === "function") {
      onSubmit(state);
    }
  }

  public render() {
    const {onSubmit, t, ...props} = this.props;
    return (
      <Form
        inputs={[
          {
            key: "name",
            props: {autoFocus: true, placeholder: t("appliance.field.name")},
            validate: {required: true, minLength: 2},
          },
          {
            key: "description",
            props: {
              getInputElement: (p) => <textarea {...p} rows={3} />,
              placeholder: t("appliance.field.description"),
            },
          },
          {key: "location", props: {placeholder: t("appliance.field.location")}},
        ]}
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
)(Loadable(withTranslation()(ApplianceForm)));
