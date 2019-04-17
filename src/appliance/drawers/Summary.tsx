import { filter, path } from "ramda";
import React, { Component } from "react";
import { useTranslation } from "react-i18next";
import { connect, MapStateToProps } from "react-redux";
import NumberComponent from "../../components/drawers/subcomponents/NumberComponent";
import { getEntitiesByOrganisation } from "../../organisation/state";
import { APIResponsePayload } from "../../store/middleware/api/actions";
import { ReduxState } from "../../store/store";
import loadable from "../../util/hoc/loadable";
import { AppliancePayload } from "../actions";

interface StateProps {
  appliances: ReadonlyArray<AppliancePayload> | APIResponsePayload;
}

export const Summary = (props: StateProps) => {
  const appliances = props.appliances as ReadonlyArray<AppliancePayload>;
  const {t} = useTranslation();
  return (
    <div>
      <h3>{t("appliances.drawers.overview.title")}</h3>
      <div>
        <NumberComponent
          size={"lg"}
          number={appliances.length}
          label={t("appliances.drawers.overview.numberOfAppliances")}
        />
        <NumberComponent
          size={"lg"}
          number={
            filter((appliance) => !path(["status", "isMalfunctioning"], appliance), appliances).length
          }
          label={t("appliances.drawers.overview.operativeAppliances")}
        />
      </div>
    </div>
  );
};

const mapStateToProps: MapStateToProps<StateProps, {}, ReduxState> = (state: ReduxState) => ({
  appliances: getEntitiesByOrganisation(state, "appliances"),
});

export default connect(
  mapStateToProps
)(loadable(Summary));
