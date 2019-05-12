import classnames from "classnames";
import { groupBy, map } from "ramda";
import React from "react";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Button from "../../component/button/Button";
import SelectAndSet, { SelectAndSetProps } from "../../component/input/SelectAndSet";
import { MaintainerPayload } from "../../maintainer/actions";
import { getEntitiesByOrganisationSelector } from "../../organisation/selectors";
import { APIResponsePayload } from "../../store/middleware/api/actions";
import { ReduxAPICall } from "../../store/middleware/api/api";
import { ReduxState } from "../../store/store";
import { alignCenter, contentHorizontalSpacing, flex1, rowContainer, stacked } from "../../style/container";
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
  const {t} = useTranslation();

  const assignMaintainer: SelectAndSetProps["onSet"] = async ({maintainer}) => {
    await props.assignMaintainerToAppliance(
      appliance.organisation,
      appliance.id,
      maintainer.value
    );
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

  return (
    <>
      {assignable ?
        <SelectAndSet
          formClassName={classnames(flex1, stacked)}
          name="maintainer"
          options={map(getMaintainerOption, assignable)}
          onSet={assignMaintainer}
          placeholder={t("appliance.maintainer.selectMaintainer")}
          setLabel={t("appliance.maintainer.addMaintainer")}
        /> : t("appliance.maintainer.noMaintainers")
      }
      {assigned && <div style={{marginTop: normal}}>
        {map(({id, firstName, lastName}: MaintainerPayload) => (
          <div key={id} className={classnames(rowContainer, alignCenter, contentHorizontalSpacing)}>
            <Link to={`/maintainers/${id}`}>{firstName} {lastName}</Link>
            <Button
              className={classnames("material-icons")}
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
  maintainers: getEntitiesByOrganisationSelector<"maintainers">("maintainers", state.session.activeOrganisation)(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  Loadable(MaintainerAssignment)
);
