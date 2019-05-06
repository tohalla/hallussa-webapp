import { map, pick, values } from "ramda";
import React from "react";
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
import { OrganisationPayload } from "../../organisation/actions";
import { getOrganisation } from "../../organisation/state";
import { APIResponsePayload } from "../../store/middleware/api/actions";
import { ReduxState } from "../../store/store";
import { padded, spacedHorizontalContainer, spread, stacked } from "../../style/container";
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
  closeTab(view: string, payload: string): any;
  createTab(view: string, payload: TabPayload): any;
  deleteMaintainer(appliance: MaintainerPayload): any;
}

type Props = RouteComponentProps & DispatchProps & StateProps & {
  match: {params: {maintainer: string}}
};

const Maintainer = ({match, history, maintainer, ...props}: Props) => {
  const {t} = useTranslation();

  const handeDeleteMaintainer = async () => {
    if (match.params.maintainer) {
      history.push("/maintainers"); // go back to root
    }
    props.closeTab("maintainers", String(maintainer.id));
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
          <div className={spread}>
            <h1>{firstName} {lastName}</h1>
            <div className={spacedHorizontalContainer}>
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
            {phone && <div className={info}><i className="material-icons">phone</i> <span>{phone}</span></div>}
            {email && <div className={info}>
              <i className="material-icons">email</i>
              <a href={`mailto:${email}`}>{email}</a>
            </div>}
          </div>
          <div className={spacer} />
          <ApplianceList
            appliances={props.appliances}
            header={<h3>{t("maintainer.appliance.list.title")}</h3>}
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
  {createTab, closeTab, deleteMaintainer}
)(Loadable(Maintainer));
