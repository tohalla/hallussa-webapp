import React, { Component } from "react";
import { MaintainerPayload } from "../actions";
import MaintainerList from "../component/MaintainerList";

interface StateProps {
  maintainers: ReadonlyArray<MaintainerPayload>;
}

export default class MaintainerListing extends Component<StateProps> {
  public render() {
    return (
      <MaintainerList />
    );
  }
}
