import React from "react";
import { useTranslation } from "react-i18next";
import { connect, MapStateToProps } from "react-redux";
import { RouteComponentProps } from "react-router";

import { ReduxState } from "../../store/store";
import { padded } from "../../style/container";
import { MaintainerPayload } from "../actions";
import MaintainerForm from "../component/MaintainerForm";

interface StateProps {
  maintainer: MaintainerPayload;
}

type Props = StateProps & RouteComponentProps & {
  match: {params: {maintainer: string}}
};

const Edit = ({maintainer, ...props}: Props) => {
  const {t} = useTranslation();
  return (
    <div className={padded}>
      <MaintainerForm
        initialState={maintainer}
        onSubmit={props.history.goBack}
        header={<h1>{t("maintainer.edit.title", {maintainer: `${maintainer.firstName} ${maintainer.lastName}`})}</h1>}
        submitText={t("maintainer.edit.form.submit")}
        {...props}
      />
    </div>
  );
};

const mapStateToProps: MapStateToProps<StateProps, Props, ReduxState> = (state, ownProps): StateProps => ({
  maintainer: state.entities.maintainers[ownProps.match.params.maintainer],
});

export default connect(mapStateToProps, {})(Edit);
