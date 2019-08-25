import { filter, path } from "ramda";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { connect, MapStateToProps } from "react-redux";
import NumberComponent from "../../component/drawer/subcomponents/NumberComponent";
import { getEntitiesByOrganisationSelector } from "../../organisation/selectors";
import { ReduxState } from "../../store/store";
import Loadable from "../../util/hoc/Loadable";
import { AppliancePayload } from "../actions";

interface Props {
  appliances: Readonly<{[k: string]: AppliancePayload}>;
}

export const overview = (props: Props) => {
  const {t} = useTranslation();
  const appliances = useMemo(() => Object.values(props.appliances), [props.appliances]);
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

const mapStateToProps: MapStateToProps<Props, {}, ReduxState> = (state: ReduxState) => ({
  appliances: getEntitiesByOrganisationSelector<"appliances">("appliances", state.session.activeOrganisation)(state),
});

export default connect(
  mapStateToProps
)(Loadable(overview));
