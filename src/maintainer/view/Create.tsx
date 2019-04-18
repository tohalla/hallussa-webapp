import React from "react";
import { useTranslation } from "react-i18next";
import { connect, MapStateToProps } from "react-redux";
import { RouteComponentProps } from "react-router";

import CancelButton from "../../component/button/CancelButton";
import { ReduxState } from "../../store/store";
import { padded } from "../../style/container";
import { MaintainerPayload } from "../actions";
import MaintainerForm from "../component/MaintainerForm";

interface StateProps {
  maintainer: MaintainerPayload;
}

type Props = StateProps & RouteComponentProps & {
  match: {params: {maintainer: string}}
};

const Create = ({maintainer, ...props}: Props) => {
  const {t} = useTranslation();
  return (
    <div className={padded}>
      <MaintainerForm
        secondary={<CancelButton history={props.history} />}
        header={<h1>{t("maintainer.create.title")}</h1>}
        submitText={t("maintainer.create.form.submit")}
        {...props}
      />
    </div>
  );
};

const mapStateToProps: MapStateToProps<StateProps, Props, ReduxState> = (state, ownProps): StateProps => ({
  maintainer: state.entities.maintainers[ownProps.match.params.maintainer],
});

export default connect(mapStateToProps, {})(Create);
