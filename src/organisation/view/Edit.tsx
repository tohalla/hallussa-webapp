import classnames from "classnames";
import React from "react";
import { useTranslation } from "react-i18next";
import { connect, MapStateToProps } from "react-redux";
import { RouteComponentProps } from "react-router";

import { ReduxState } from "../../store/store";
import { padded, viewContentContainer } from "../../style/container";
import { OrganisationPayload } from "../actions";
import OrganisationForm from "../component/OrganisationForm";

interface StateProps {
  organisation: OrganisationPayload;
}

type Props = StateProps & RouteComponentProps & {
  match: {params: {organisation: string}}
};

const Edit = ({organisation, ...props}: Props) => {
  const {t} = useTranslation();
  return (
    <div className={classnames(viewContentContainer, padded)}>
      <OrganisationForm
        state={organisation}
        onSubmit={props.history.goBack}
        header={<h1>{t("organisation.edit.title", {organisation: organisation.name})}</h1>}
        submitText={t("organisation.edit.form.submit")}
        {...props}
      />
    </div>
  );
};

const mapStateToProps: MapStateToProps<StateProps, Props, ReduxState> = (state, ownProps): StateProps => ({
  organisation: state.entities.organisations[ownProps.match.params.organisation],
});

export default connect(mapStateToProps, {})(Edit);
