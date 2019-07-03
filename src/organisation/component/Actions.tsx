import { compose, findIndex, not, path, whereEq } from "ramda";
import React from "react";
import { useTranslation } from "react-i18next";
import { connect, MapStateToProps } from "react-redux";

import { Link } from "react-router-dom";
import { AccountPayload, removeAccount } from "../../account/actions";
import { UserRolePayload } from "../../account/user-role/actions";
import Button from "../../component/button/Button";
import DoubleClickButton from "../../component/button/DoubleClickButton";
import Dropdown from "../../component/Dropdown";
import Restricted from "../../component/Restricted";
import { ReduxState } from "../../store/store";
import { dropdownMenuItem } from "../../style/dropdown";
import { alertIndication } from "../../style/inline";
import { deleteOrganisation, OrganisationPayload, setActiveOrganisation } from "../actions";

interface DispatchProps {
  removeAccount: typeof removeAccount;
  setActiveOrganisation(organisation?: number): any;
  deleteOrganisation(organisation: OrganisationPayload): any;
}

interface StateProps {
  account: AccountPayload;
  userRole?: UserRolePayload;
}

interface Props {
  organisation: OrganisationPayload;
}

const Actions = (props: Props & StateProps & DispatchProps) => {
  const handleDeleteOrganisation = () => props.deleteOrganisation(props.organisation);
  const handleRemoveAccount = async () => {
    await props.removeAccount(props.organisation, props.account);
  };

  const {t} = useTranslation();

  return (
    <Dropdown>
      <Restricted userRole={props.userRole} requirements={{userRole: {allowDeleteOrganisation: true}}}>
        <DoubleClickButton
          className={dropdownMenuItem}
          plain={true}
          secondaryClassName={alertIndication}
          onClick={handleDeleteOrganisation}
        >
          {t("organisation.action.delete")}
        </DoubleClickButton>
      </Restricted>
      <Restricted userRole={props.userRole} requirements={{userRole: {allowUpdateOrganisation: true}}}>
        <Link className={dropdownMenuItem} to={`/organisations/${props.organisation.id}/edit`}>
          {t("organisation.action.edit")}
        </Link>
      </Restricted>
      <Restricted comparator={compose(not, whereEq)} userRole={props.userRole} requirements={{userRole: {id: 1}}}>
        <Button className={dropdownMenuItem} plain={true} onClick={handleRemoveAccount}>
          {t("organisation.action.leaveOrganisation")}
        </Button>
      </Restricted>
    </Dropdown>
  );
};

const mapStateToProps: MapStateToProps<StateProps, Props, ReduxState> = (state, ownProps: Props) => {
  return ({
    account: state.entities.accounts[state.session.activeAccount as number],
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

export default connect<StateProps, DispatchProps, Props, ReduxState>(
  mapStateToProps,
  {deleteOrganisation, removeAccount, setActiveOrganisation}
)(Actions);
