import React, { Component } from "react";

import Drawer from "../../../components/drawers/Drawer";
import Content from "./Content";

export default class Summary extends Component<{openDrawer: string}> {
  public render() {
    const { openDrawer } = this.props;
    const drawerId = "summary";
    return (
      <Drawer
        label={"summary"}
        view={"appliances"}
        drawerId={drawerId}
        isOpen={openDrawer === drawerId}
      >
        <Content />
      </Drawer>
    );
  }
}
