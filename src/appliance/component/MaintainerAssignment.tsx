import classNames from "classnames";
import { groupBy, map } from "ramda";
import React, { useState } from "react";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Button from "../../component/button/Button";
import Select from "../../component/Select";
import { MaintainerPayload } from "../../maintainer/actions";
import { getEntitiesByOrganisation } from "../../organisation/state";
import { APIResponsePayload } from "../../store/middleware/api/actions";
import { ReduxAPICall } from "../../store/middleware/api/api";
import { ReduxState } from "../../store/store";
import { rowContainer, spacedHorizontalContainer, stacked } from "../../style/container";
import { normal } from "../../style/variables/spacing";
import Loadable from "../../util/hoc/Loadable";
import { AppliancePayload, assignMaintainerToAppliance, removeMaintainerFromAppliance } from "../actions";

interface StateProps {
  maintainers?: ReadonlyArray<MaintainerPayload> | APIResponsePayload;
}

interface DispatchProps {
  assignMaintainerToAppliance(
    organisation: number,
    appliance: number,
    maintainer: number
  ): ReduxAPICall;
  removeMaintainerFromAppliance(
    organisation: number,
    appliance: number,
    maintainer: number
  ): ReduxAPICall;
}

interface Props {
  appliance: AppliancePayload;
}

const getMaintainerOption = ({firstName, lastName, id}: MaintainerPayload) => ({
  label: `${firstName} ${lastName}`, value: id,
});

const MaintainerAssignment = ({
  appliance,
  maintainers,
  ...props
}: Props & StateProps & DispatchProps) => {
  const [maintainer, setMaintainer] = useState();
  const {t} = useTranslation();

  const assignMaintainer = async () => {
    if (maintainer) {
      await props.assignMaintainerToAppliance(
        appliance.organisation,
        appliance.id,
        maintainer.value
      );
    }
    setMaintainer(null);
  };

  const removeMaintainer = (maintainerId: number) => () => {
    props.removeMaintainerFromAppliance(
      appliance.organisation,
      appliance.id,
      maintainerId
    );
  };

  const {assigned, assignable} = groupBy(
    ({id}) => appliance.maintainers.indexOf(id) === -1 ? "assignable" : "assigned",
    maintainers as ReadonlyArray<MaintainerPayload>
  );

  const handleSelectMaintainer = (m: MaintainerPayload) => setMaintainer(m);

  return (
    <>
      {assignable ?
      <div className={stacked}>
        <Select
          options={map(getMaintainerOption, assignable)}
          onChange={handleSelectMaintainer}
          value={maintainer}
          placeholder={t("appliance.maintainer.selectMaintainer")}
        />
          {maintainer && <Button onClick={assignMaintainer}>{t("appliance.maintainer.addMaintainer")}</Button>}
        </div> : t("appliance.maintainer.noMaintainers")
      }
      {assigned && <div style={{marginTop: normal}}>
        {map(({id, firstName, lastName}: MaintainerPayload) => (
          <div key={id} className={classNames(spacedHorizontalContainer, rowContainer)}>
            <Link to={`/maintainers/${id}`}>{firstName} {lastName}</Link>
            <Button
              className={classNames("material-icons")}
              onClick={removeMaintainer(id)}
              plain={true}
            >
              close
            </Button>
          </div>
        ), assigned)}
      </div>}
      {}
    </>
  );
};

const mapDispatchToProps: MapDispatchToProps<DispatchProps, Props> = {
  assignMaintainerToAppliance,
  removeMaintainerFromAppliance,
};

const mapStateToProps: MapStateToProps<StateProps, Props, ReduxState> = (state) => ({
  maintainers: getEntitiesByOrganisation(state, "maintainers"),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  Loadable(MaintainerAssignment)
);
