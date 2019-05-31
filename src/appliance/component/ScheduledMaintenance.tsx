import React from "react";
import { connect, MapStateToProps } from "react-redux";

import { useTranslation } from "react-i18next";
import { ReduxState } from "../../store/store";
import Loadable from "../../util/hoc/Loadable";
import { AppliancePayload } from "../actions";

interface StateProps {
  //
}

interface DispatchProps {
  //
}

interface Props {
  appliance: AppliancePayload;
}

const ScheduledMaintenance = ({
  appliance,
  ...props
}: Props & StateProps & DispatchProps) => {
  const {t} = useTranslation();

  return (
    <>
      {}
    </>
  );
};

const mapStateToProps: MapStateToProps<StateProps, Props, ReduxState> = (state) => ({
});

export default connect(mapStateToProps, {})(
  Loadable(ScheduledMaintenance)
);
