import classNames from "classnames";
import { map, pick, values } from "ramda";
import React, { Component } from "react";
import { connect, MapStateToProps } from "react-redux";

import { format } from "date-fns";
import { RouteComponentProps } from "react-router";
import { AppliancePayload } from "../../appliance/actions";
import { ApplianceList } from "../../appliance/components/ApplianceList";
import Button from "../../components/Button";
import DoubleClickButton, { deletionConfirmation } from "../../components/DoubleClickButton";
import { closeTab, createTab, TabPayload } from "../../components/tabbed/actions";
import { spacedHorizontalContainer, spread, stacked } from "../../emotion-styles/src/container";
import { alertIndication, info, link, timestamp } from "../../emotion-styles/src/inline";
import { spacer } from "../../emotion-styles/src/variables/spacing";
import { OrganisationPayload } from "../../organisation/actions";
import { getOrganisation } from "../../organisation/state";
import { APIResponsePayload } from "../../store/middleware/api/actions";
import { ReduxState } from "../../store/store";
import loadable from "../../util/hoc/loadable";
import { deleteMaintainer, MaintainerPayload } from "../actions";
import MaintainerForm from "../components/MaintainerForm";

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

type Actions = "default" | "edit";
interface State {
  action: Actions;
}

class Maintainer extends Component<Props, State> {
  public static getDerivedStateFromProps(props: Props, prevState: object) {
    const {tabs, maintainer, history, organisation} = props;
    if (
      typeof maintainer === "undefined"
      || typeof organisation === "undefined"
      || (organisation as OrganisationPayload).maintainers.indexOf(maintainer.id) === -1
    ) {
      history.push("/");
      return prevState;
    }
    if (typeof tabs[maintainer.id] === "undefined") {
      props.createTab("maintainers", {
        key: String(maintainer.id),
        label: `${maintainer.firstName} ${maintainer.lastName}`,
        sticky: false,
      });
    }
    return prevState;
  }

  public state: State = {
    action: "default",
  };

  public handeDeleteMaintainer = async () => {
    if (this.props.match.params.maintainer) {
      this.props.history.push("/"); // go back to root
    }
    this.props.closeTab("maintainers", String(this.props.maintainer.id));
    await this.props.deleteMaintainer(this.props.maintainer);
  }

  public setAction = (action: Actions = "default") => () => this.setState({action});

  public render() {
    const {maintainer} = this.props;
    if (!maintainer) {
      return null;
    }
    const routerProps: RouteComponentProps = pick(["history", "match", "location"], this.props);
    const {action} = this.state;
    if (action === "edit") {
      return (
        <div>
          <MaintainerForm
            state={maintainer}
            secondary={<Button className={link} plain={true} onClick={this.setAction()}>Cancel</Button>}
            onSubmit={this.setAction()}
            header={<h1>Edit maintainer – {maintainer.firstName} {maintainer.lastName}</h1>}
            submitText="Update maintainer"
            {...routerProps}
          />
        </div>
      );
    }

    const {phone, firstName, lastName, email, createdAt, updatedAt} = maintainer;

    return (
      <>
        <div className={spread}>
          <h1>{firstName} {lastName}</h1>
          <div className={spacedHorizontalContainer}>
            <DoubleClickButton
              plain={true}
              renderSecondaryContent={deletionConfirmation}
              secondaryClassName={alertIndication}
              onClick={this.handeDeleteMaintainer}
            >
              Delete maintainer
            </DoubleClickButton>
            <Button plain={true} onClick={this.setAction("edit")}>Edit maintainer</Button>
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
          appliances={this.props.appliances}
          header={<h3>Appliances</h3>}
        />
        <div className={spacer} />
        <div className={classNames(stacked, timestamp)} style={{alignSelf: "stretch", justifyContent: "center"}}>
          <span>Created at {format(createdAt, "D.M.YYYY")}</span>
          {updatedAt && <span>Updated at {format(updatedAt, "D.M.YYYY – HH:mm")}</span>}
        </div>
      </>
    );
  }
}

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
)(loadable<Props>(Maintainer));
