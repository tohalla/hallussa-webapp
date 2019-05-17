import classnames from "classnames";
import { map, pick, values } from "ramda";
import React, { useEffect } from "react";
import { connect, MapStateToProps } from "react-redux";

import { useTranslation } from "react-i18next";
import { Route, RouteComponentProps, Switch } from "react-router";
import { Link } from "react-router-dom";
import { AppliancePayload } from "../../appliance/actions";
import ApplianceList from "../../appliance/component/ApplianceList";
import DoubleClickButton from "../../component/button/DoubleClickButton";
import Restricted from "../../component/Restricted";
import { closeTab, createTab, TabPayload } from "../../component/tabbed/actions";
import TabRouteIndexLookup from "../../component/tabbed/TabRouteIndexLookup";
import Timestamps from "../../component/Timestamps";
import { fetchMaintainerTasks } from "../../maintenance/task/actions";
import { OrganisationPayload } from "../../organisation/actions";
import { getOrganisation } from "../../organisation/state";
import { APIResponsePayload } from "../../store/middleware/api/actions";
import { ReduxState } from "../../store/store";
import { alignFlexStart, contentHorizontalSpacing, padded, rowContainer, spread, stacked } from "../../style/container";
import { alertIndication, info } from "../../style/inline";
import { spacer } from "../../style/variables/spacing";
import Loadable from "../../util/hoc/Loadable";
import { deleteMaintainer, MaintainerPayload } from "../actions";
import Edit from "./Edit";

interface StateProps {
  appliances: ReadonlyArray<AppliancePayload>;
  organisation?: OrganisationPayload | APIResponsePayload;
  maintainer: MaintainerPayload;
  tabs: {[key: string]: TabPayload};
}

interface DispatchProps {
  closeTab: typeof closeTab;
  createTab: typeof createTab;
  deleteMaintainer: typeof deleteMaintainer;
  fetchMaintainerTasks: typeof fetchMaintainerTasks;
}

interface Props extends RouteComponentProps<{maintainer: string}>, DispatchProps, StateProps {
  organisation: OrganisationPayload;
}

const Maintainer = ({match, history, maintainer, organisation, ...props}: Props) => {
  useEffect(() => {
    props.fetchMaintainerTasks(organisation.id, maintainer.id);
  }, []);

  const {t} = useTranslation();

  const handeDeleteMaintainer = async () => {
    if (match.params.maintainer) {
      history.push("/maintainers"); // go back to root
    }
    props.closeTab("maintainers", {key: String(maintainer.id)});
    await props.deleteMaintainer(maintainer);
  };

  const {phone, firstName, lastName, email, createdAt, updatedAt} = maintainer;

  const TabRoute = TabRouteIndexLookup<MaintainerPayload>({
    accessor: "maintainer",
    context: "maintainers",
    getLabel: (maintainre) => `${maintainer.firstName} ${maintainer.lastName}`,
    rootPath: `/maintainers/${maintainer.id}`,
  });

  return (
    <Switch>
      <Route exact={true} path={match.path}>
        <div className={padded}>
          <div className={classnames(spread, alignFlexStart)}>
            <h1>{firstName} {lastName}</h1>
            <div className={classnames(rowContainer, contentHorizontalSpacing)}>
              <Restricted requirements={{userRole: {allowDeleteMaintainer: true}}}>
                <DoubleClickButton
                  plain={true}
                  secondaryClassName={alertIndication}
                  onClick={handeDeleteMaintainer}
                >
                  {t("maintainer.action.delete")}
                </DoubleClickButton>
              </Restricted>
              <Restricted requirements={{userRole: {allowUpdateMaintainer: true}}}>
                <Link to={`/maintainers/${maintainer.id}/edit`}>
                  {t("maintainer.action.edit")}
                </Link>
              </Restricted>
            </div>
          </div>
          <div className={stacked}>
            {phone && <div className={info}><i className="material-icons">phone</i><span>{phone}</span></div>}
            {email && <div className={info}>
              <i className="material-icons">email</i>
              <a href={`mailto:${email}`}>{email}</a>
            </div>}
          </div>
          <div className={spacer} />
          <ApplianceList
            columns={["id", "name", "status", "location"]}
            appliances={props.appliances}
            header={<h2>{t("maintainer.appliance.list.title")}</h2>}
          />
          <div className={spacer} />
          <Timestamps
            translationKeys={{createdAt: "maintainer.createdAt", updatedAt: "maintainer.updatedAt"}}
            createdAt={createdAt}
            updatedAt={updatedAt}
          />
        </div>
      </Route>
      <TabRoute
        component={Edit}
        path={`${match.path}/edit`}
        requirements={{userRole: {allowUpdateMaintainer: true}}}
      />
    </Switch>
  );
};

const mapStateToProps: MapStateToProps<StateProps, Props, ReduxState> = (state, ownProps): StateProps => {
  const maintainer = state.entities.maintainers[ownProps.match.params.maintainer];
  return {
    appliances: maintainer ? values(pick(map(String, maintainer.appliances), state.entities.appliances)) : [],
    maintainer,
    organisation: getOrganisation(state),
    tabs: state.views.maintainers.tabs,
  };
};

export default connect(
  mapStateToProps,
  {createTab, closeTab, deleteMaintainer, fetchMaintainerTasks}
)(Loadable<StateProps, Props>(Maintainer));
