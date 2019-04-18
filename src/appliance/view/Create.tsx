import React from "react";
import { useTranslation } from "react-i18next";
import { connect, MapStateToProps } from "react-redux";
import { RouteComponentProps } from "react-router";

import CancelButton from "../../component/button/CancelButton";
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

const Create = ({appliance, ...props}: Props) => {
  const {t} = useTranslation();
  return (
    <div className={padded}>
      <ApplianceForm
        secondary={<CancelButton history={props.history} />}
        header={<h1>{t("appliance.create.title")}</h1>}
        submitText={t("appliance.create.form.submit")}
        {...props}
      />
    </div>
  );
};

const mapStateToProps: MapStateToProps<StateProps, Props, ReduxState> = (state, ownProps): StateProps => ({
  appliance: state.entities.appliances[ownProps.match.params.appliance],
});

export default connect(mapStateToProps, {})(Create);
