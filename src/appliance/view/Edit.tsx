import React from "react";
import { useTranslation } from "react-i18next";
import { connect, MapStateToProps } from "react-redux";
import { RouteComponentProps } from "react-router";

import { ReduxState } from "../../store/store";
import { padded } from "../../style/container";
import { AppliancePayload } from "../actions";
import ApplianceForm from "../component/ApplianceForm";

interface StateProps {
  appliance: AppliancePayload;
}

type Props = StateProps & RouteComponentProps & {
  match: {params: {appliance: string}}
};

const Edit = ({appliance, ...props}: Props) => {
  const {t} = useTranslation();
  return (
    <div className={padded}>
      <ApplianceForm
        initialState={appliance}
        onSubmit={props.history.goBack}
        header={<h1>{t("appliance.edit.title", {appliance: appliance.name})}</h1>}
        submitText={t("appliance.edit.form.submit")}
        {...props}
      />
    </div>
  );
};

const mapStateToProps: MapStateToProps<StateProps, Props, ReduxState> = (state, ownProps): StateProps => ({
  appliance: state.entities.appliances[ownProps.match.params.appliance],
});

export default connect(mapStateToProps, {})(Edit);
