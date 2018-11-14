import React, { Component } from "react";

import Drawer from "../../../components/drawers/Drawer";
import Content from "./Content";

export default class Latest extends Component<{openDrawer: string}> {
  public render() {
    const { openDrawer } = this.props;
    const drawerId = "latest";
    return (
      <Drawer
        label={"latest activity"}
        view={"appliances"}
        drawerId={drawerId}
        isOpen={openDrawer === drawerId}
      >
        <Content />
      </Drawer>
    );
  }
}
