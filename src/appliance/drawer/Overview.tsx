import { filter, path } from "ramda";
import React from "react";
import { useTranslation } from "react-i18next";
import { connect, MapStateToProps } from "react-redux";
import NumberComponent from "../../component/drawer/subcomponents/NumberComponent";
import { getEntitiesByOrganisationSelector } from "../../organisation/selectors";
import { APIResponsePayload } from "../../store/middleware/api/actions";
import { ReduxState } from "../../store/store";
import Loadable from "../../util/hoc/Loadable";
import { AppliancePayload } from "../actions";

interface StateProps {
  appliances: ReadonlyArray<AppliancePayload> | APIResponsePayload;
}

export const overview = (props: StateProps) => {
  const appliances = props.appliances as ReadonlyArray<AppliancePayload>;
  const {t} = useTranslation();
  return (
    <>
      <NumberComponent
        size={"lg"}
        number={appliances.length}
        label={t("appliance.drawer.overview.numberOfAppliances")}
      />
      <NumberComponent
        size={"lg"}
        number={
          filter((appliance) => !path(["status", "isMalfunctioning"], appliance), appliances).length
        }
        label={t("appliance.drawer.overview.operativeAppliances")}
      />
    </>
  );
};

const mapStateToProps: MapStateToProps<StateProps, {}, ReduxState> = (state: ReduxState) => ({
  appliances: getEntitiesByOrganisationSelector<"appliances">("appliances", state.session.activeOrganisation)(state),
});

export default connect(
  mapStateToProps
)(Loadable(overview));
