import classnames from "classnames";
import { findIndex, path } from "ramda";
import React from "react";
import { useTranslation } from "react-i18next";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";

import { Link } from "react-router-dom";
import { UserRolePayload } from "../../account/user-role/actions";
import DoubleClickButton from "../../component/button/DoubleClickButton";
import Restricted from "../../component/Restricted";
import { ReduxState } from "../../store/store";
import { contentHorizontalSpacing, rowContainer } from "../../style/container";
import { alertIndication } from "../../style/inline";
import { deleteOrganisation, OrganisationPayload, setActiveOrganisation } from "../actions";

interface DispatchProps {
  setActiveOrganisation(organisation?: number): any;
  deleteOrganisation(organisation: OrganisationPayload): any;
}

interface Props {
  organisation: OrganisationPayload;
}

interface StateProps {
  userRole?: UserRolePayload;
}

const Actions = (props: Props & StateProps & DispatchProps) => {
  const handleDeleteOrganisation = () => props.deleteOrganisation(props.organisation);

  const {t} = useTranslation();

  return (
    <div className={classnames(rowContainer, contentHorizontalSpacing)}>
      <Restricted userRole={props.userRole} requirements={{userRole: {allowDeleteOrganisation: true}}}>
        <DoubleClickButton
          plain={true}
          secondaryClassName={alertIndication}
          onClick={handleDeleteOrganisation}
        >
          {t("organisation.action.delete")}
        </DoubleClickButton>
      </Restricted>
      <Restricted userRole={props.userRole} requirements={{userRole: {allowUpdateOrganisation: true}}}>
        <Link to={`/organisations/${props.organisation.id}/edit`}>
          {t("organisation.action.edit")}
        </Link>
      </Restricted>
    </div>
  );
};

const mapDispatchToProps: MapDispatchToProps<DispatchProps, Props> = {
  deleteOrganisation,
  setActiveOrganisation,
};

const mapStateToProps: MapStateToProps<StateProps, Props, ReduxState> = (state, ownProps: Props) => {
  return ({
    userRole: state.entities.userRoles[String(path([
      "accounts",
      String(findIndex(
        (account) => String(account.account) === String(state.session.activeAccount),
        ownProps.organisation.accounts || [])
      ),
      "userRole",
    ], ownProps.organisation))],
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Actions);
