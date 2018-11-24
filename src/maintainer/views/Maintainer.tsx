import { pick } from "ramda";
import React, { Component } from "react";
import { connect, MapStateToProps } from "react-redux";

import { RouteComponentProps } from "react-router";
import Button from "../../components/Button";
import { createTab, TabPayload } from "../../components/tabbed/actions";
import { padded, spacedHorizontalContainer, spread } from "../../emotion-styles/src/container";
import { link } from "../../emotion-styles/src/inline";
import { OrganisationPayload } from "../../organisation/actions";
import { getOrganisation } from "../../organisation/state";
import { APIResponsePayload } from "../../store/middleware/api/actions";
import { ReduxState } from "../../store/store";
import loadable from "../../util/hoc/loadable";
import { MaintainerPayload } from "../actions";
import MaintainerForm from "../components/MaintainerForm";

interface StateProps {
  organisation?: OrganisationPayload | APIResponsePayload;
  maintainer: MaintainerPayload;
  tabs: {[key: string]: TabPayload};
}

interface DispatchProps {
  createTab(view: string, payload: TabPayload): any;
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

  public setAction = (action: Actions = "default") => () => this.setState({action});

  public render() {
    const {maintainer} = this.props;
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

    return (
      <>
        <div className={spread}>
          <h1>{maintainer.firstName} {maintainer.lastName}</h1>
          <div className={spacedHorizontalContainer}>
            <Button plain={true} onClick={this.setAction("edit")}>Edit maintainer</Button>
          </div>
        </div>
        Details of an maintainer: {maintainer.firstName}
      </>
    );
  }
}

const mapStateToProps: MapStateToProps<StateProps, Props, ReduxState> = (state, ownProps): StateProps => ({
  maintainer: state.entities.maintainers[ownProps.match.params.maintainer],
  organisation: getOrganisation(state),
  tabs: state.views.maintainers.tabs,
});

export default connect(
  mapStateToProps,
  {createTab}
)(loadable<Props>(Maintainer));
