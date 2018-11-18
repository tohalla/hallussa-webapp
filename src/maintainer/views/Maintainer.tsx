import React, { Component } from "react";
import { connect, MapStateToProps } from "react-redux";

import { RouteComponentProps } from "react-router";
import { createTab, TabPayload } from "../../components/tabbed/actions";
import { ReduxState } from "../../store/store";
import loadable from "../../util/hoc/loadable";
import { MaintainerPayload } from "../actions";

interface StateProps {
  maintainer: MaintainerPayload;
  tabs: {[key: string]: TabPayload};
}

interface DispatchProps {
  createTab(view: string, payload: TabPayload): any;
}

type Props = RouteComponentProps & DispatchProps & StateProps & {
  match: {params: {maintainer: string}}
};

class Maintainer extends Component<Props> {
  public static getDerivedStateFromProps(props: Props) {
    const {tabs, maintainer, history} = props;
    if (typeof maintainer === "undefined") {
      history.push("/");
      return null;
    }
    if (typeof tabs[maintainer.id] === "undefined") {
      props.createTab("maintainers", {
        key: String(maintainer.id),
        label: `${maintainer.firstName} ${maintainer.lastName}`,
        sticky: false,
      });
    }
    return {};
  }

  public state = {};

  public render() {
    const {maintainer} = this.props;
    return typeof maintainer === "object" && (
      <>
        <div>Details of an maintainer: {maintainer.firstName}</div>
      </>
    );
  }
}

const mapStateToProps: MapStateToProps<StateProps, Props, ReduxState> = (state, ownProps): StateProps => ({
  maintainer: state.entities.maintainers[ownProps.match.params.maintainer],
  tabs: state.views.appliances.tabs,
});

export default connect(
  mapStateToProps,
  {createTab}
)(loadable<Props>(Maintainer));
