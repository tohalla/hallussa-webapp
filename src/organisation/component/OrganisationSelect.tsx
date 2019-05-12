import { equals, map } from "ramda";
import React from "react";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";

import { History } from "history";
import { useTranslation } from "react-i18next";
import SelectAndSet, { SelectAndSetProps } from "../../component/input/SelectAndSet";
import { APIResponsePayload } from "../../store/middleware/api/actions";
import { ReduxState } from "../../store/store";
import { rowContainer } from "../../style/container";
import Loadable from "../../util/hoc/Loadable";
import { OrganisationPayload, setActiveOrganisation } from "../actions";
import { getOrganisation, getOrganisations } from "../state";

interface StateProps {
  activeOrganisation?: Readonly<OrganisationPayload> | APIResponsePayload;
  organisations: ReadonlyArray<OrganisationPayload> | APIResponsePayload;
}

interface DispatchProps {
  setActiveOrganisation(organisation: number, fetchRelated?: boolean): any;
}

interface Props {
  activeOrganisation?: Readonly<OrganisationPayload>;
  organisations: ReadonlyArray<OrganisationPayload>;
  organisation?: OrganisationPayload;
  history: History;
}

interface OrganisationOption {
  value: number;
  label: string;
}

const getOrganisationOption = (organisation?: OrganisationPayload): undefined | OrganisationOption => organisation && ({
  label: organisation.name,
  value: organisation.id,
});

const OrganisationSelect = ({
  activeOrganisation,
  organisations,
  organisation,
  history,
  ...props
}: StateProps & DispatchProps & Props) => {
  const handleOrganisationSelect = (option: any) => history.push(`/organisations/${option.value}`);
  const handleSet: SelectAndSetProps["onSet"] = ({organisation: org}) =>
    org && !Array.isArray(org) && props.setActiveOrganisation(org.value);

  const {t} = useTranslation();
  const eq = equals(getOrganisationOption(activeOrganisation));

  return (
    <div className={rowContainer}>
      <SelectAndSet
        label={t<string>("organisation.selectOrganisation")}
        equalValue={eq}
        name={"organisation"}
        noOptions={t<string>("organisation.noOrganisations")}
        onChange={handleOrganisationSelect}
        onSet={handleSet}
        options={map(getOrganisationOption, organisations)}
        initialValue={getOrganisationOption(organisation || activeOrganisation)}
        setLabel={t<string>("organisation.action.activate")}
      />
    </div>
  );
};

const mapStateToProps: MapStateToProps<StateProps, Props, ReduxState> = (state) => ({
  activeOrganisation: getOrganisation(state),
  organisations: getOrganisations(state),
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, Props> = {
  setActiveOrganisation,
};

export default connect<StateProps, DispatchProps, Props, ReduxState>(
  mapStateToProps, mapDispatchToProps
)(Loadable<StateProps, Props>(OrganisationSelect));
