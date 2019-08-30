import classnames from "classnames";
import { parseISO } from "date-fns";
import { map, pick, values } from "ramda";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { connect, MapStateToProps } from "react-redux";

import { RouteComponentProps } from "react-router";
import { AppliancePayload } from "../../appliance/actions";
import ApplianceList from "../../appliance/component/ApplianceList";
import Timestamps from "../../component/Timestamps";
import { fetchMaintainerTasks } from "../../maintenance/task/actions";
import { OrganisationPayload } from "../../organisation/actions";
import { getOrganisation } from "../../organisation/state";
import { APIResponsePayload } from "../../store/middleware/api/actions";
import { ReduxState } from "../../store/store";
import {
  alignFlexStart,
  contentVerticalSpacingMinor,
  padded,
  spread,
} from "../../style/container";
import { info } from "../../style/inline";
import { spacer } from "../../style/variables/spacing";
import Loadable from "../../util/hoc/Loadable";
import { MaintainerPayload } from "../actions";
import Actions from "../component/Actions";

interface StateProps {
  appliances: ReadonlyArray<AppliancePayload>;
  organisation?: OrganisationPayload | APIResponsePayload;
  maintainer: MaintainerPayload;
}

interface DispatchProps {
  fetchMaintainerTasks: typeof fetchMaintainerTasks;
}

interface Props extends RouteComponentProps<{maintainer: string}>, DispatchProps, StateProps {
  organisation: OrganisationPayload;
}

const Maintainer = ({match, history, maintainer, organisation, ...props}: Props) => {
  useEffect(() => {
    props.fetchMaintainerTasks(maintainer);
  }, []);

  const {t} = useTranslation();

  const {phone, firstName, lastName, email, language, createdAt, updatedAt} = maintainer;

  return (
    <div className={padded}>
      <div className={classnames(spread, alignFlexStart)}>
        <h1>{firstName} {lastName}</h1>
        <Actions maintainer={maintainer} match={match} history={history} />
      </div>
      <div className={classnames(contentVerticalSpacingMinor)}>
        {phone && <div className={info}><i className="material-icons">phone</i><span>{phone}</span></div>}
        {email && <div className={info}>
          <i className="material-icons">email</i>
          <a href={`mailto:${email}`}>{email}</a>
        </div>}
        {language && <div className={info}>
          <i className="material-icons">language</i>{t(`language.${language}`)}
        </div>}
      </div>
      <ApplianceList
        columns={["id", "name", "status", "location"]}
        appliances={props.appliances}
        header={<h2>{t("maintainer.appliance.list.title")}</h2>}
      />
      <div className={spacer} />
      <Timestamps
        translationKeys={{createdAt: "maintainer.createdAt", updatedAt: "maintainer.updatedAt"}}
        createdAt={parseISO(createdAt)}
        updatedAt={parseISO(updatedAt || "")}
      />
    </div>
  );
};

const mapStateToProps: MapStateToProps<StateProps, Props, ReduxState> = (state, ownProps): StateProps => {
  const maintainer = state.entities.maintainers[ownProps.match.params.maintainer];
  return {
    appliances: maintainer ? values(pick(map(String, maintainer.appliances), state.entities.appliances)) : [],
    maintainer,
    organisation: getOrganisation(state),
  };
};

export default connect(
  mapStateToProps,
  {fetchMaintainerTasks}
)(Loadable<StateProps, Props>(Maintainer));
