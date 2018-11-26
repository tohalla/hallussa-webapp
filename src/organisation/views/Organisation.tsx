import classNames from "classnames";
import { find, path, pick } from "ramda";
import React from "react";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";

import { rowContainer, spacedHorizontalContainer, spread, actionGroup } from "emotion-styles/container";
import { Link, RouteComponentProps } from "react-router-dom";
import Button from "../../components/Button";
import DoubleClickButton, { deletionConfirmation } from "../../components/DoubleClickButton";
import button from "../../emotion-styles/src/button";
import { alertIndication, link } from "../../emotion-styles/src/inline";
import { spacer } from "../../emotion-styles/src/variables/spacing";
import { APIResponsePayload } from "../../store/middleware/api/actions";
import { ReduxState } from "../../store/store";
import loadable from "../../util/hoc/loadable";
import { deleteOrganisation, OrganisationPayload, setActiveOrganisation } from "../actions";
import OrganisationForm from "../OrganisationForm";
import OrganisationSelect from "../OrganisationSelect";
import { getOrganisation, getOrganisations } from "../state";

interface StateProps {
  activeOrganisation?: Readonly<OrganisationPayload> | APIResponsePayload;
  organisation?: OrganisationPayload;
  organisations: ReadonlyArray<OrganisationPayload> | APIResponsePayload;
}

interface DispatchProps {
  setActiveOrganisation(organisation?: number): any;
  deleteOrganisation(organisation: OrganisationPayload): any;
}

type Props = RouteComponentProps<{organisation?: string}>;
type Actions = "default" | "edit";
interface State {
  action: Actions;
}

const NewOrganisation = () => <Link to="/organisations/new" className={button}>Create a new organisation</Link>;

class Organisation extends React.Component<Props & StateProps & DispatchProps, State> {
  public state: State = {
    action: "default",
  };

  public setAction = (action: Actions = "default") => () => this.setState({action});

  public handleDeleteOrganisation = async () => {
    if (this.props.match.params.organisation) {
      this.props.history.push("/organisations"); // go back to root
    }
    const organisation = this.props.organisation || this.props.activeOrganisation as OrganisationPayload;
    const organisations = this.props.organisations as OrganisationPayload[];
    if (organisation === this.props.activeOrganisation) {
      await this.props.setActiveOrganisation(path(
        ["id"],
        find((org) => org !== organisation, organisations)
      ));
    }
    await this.props.deleteOrganisation(organisation);
  }

  public render() {
    const organisation =  this.props.organisation || this.props.activeOrganisation as OrganisationPayload;

    const organisations = this.props.organisations as ReadonlyArray<OrganisationPayload>;
    if (typeof organisation === "undefined" && organisations.length === 0) {
      return (
        <div className={classNames(rowContainer, spread)}>
          It seems you don't have any organisations created.
          <NewOrganisation />
        </div>
      );
    }

    if (!organisation) {
      return null;
    }

    const {name, organisationIdentifier} = organisation;
    const routerProps: RouteComponentProps = pick(["history", "match", "location"], this.props);

    const {action} = this.state;

    if (action === "edit") {
      return (
        <OrganisationForm
          state={organisation}
          onSubmit={this.setAction()}
          secondary={<Button className={link} plain={true} onClick={this.setAction()}>Cancel</Button>}
          header={<h1>Edit organisation – {organisation.name}</h1>}
          submitText="Update organisation"
          {...routerProps}
        />
      );
    }

    return (
      <>
        <div>
          <div className={spread}>
            <h1>{name}</h1>
            <div className={spacedHorizontalContainer}>
              <DoubleClickButton
                plain={true}
                renderSecondaryContent={deletionConfirmation}
                secondaryClassName={alertIndication}
                onClick={this.handleDeleteOrganisation}
              >
                Delete organisation
              </DoubleClickButton>
              <Button plain={true} onClick={this.setAction("edit")}>Edit organisation</Button>
            </div>
          </div>
          {organisationIdentifier}
        </div>
        <div className={spacer} />
        <div className={spread}>
          <div className={actionGroup}>
            <OrganisationSelect organisation={organisation} {...routerProps} />
            <NewOrganisation />
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps: MapStateToProps<StateProps, Props, ReduxState> = (state, ownProps: Props) => ({
  activeOrganisation: getOrganisation(state),
  organisation: ownProps.match.params.organisation ?
    state.entities.organisations[ownProps.match.params.organisation] : undefined,
  organisations: getOrganisations(state),
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, Props> = {
  deleteOrganisation,
  setActiveOrganisation,
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(loadable(Organisation));
