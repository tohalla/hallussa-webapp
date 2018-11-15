import React, { Component } from "react";

import Drawer from "../../../components/drawers/Drawer";
import Content from "./Content";

export default class Latest extends Component<{
  openDrawer: string | undefined;
  toggleActiveDrawer: (view: string, drawer: string) => void;
}> {
  public render() {
    const { openDrawer, toggleActiveDrawer } = this.props;
    const drawerId = "latest";
    return (
      <Drawer
        label={"latest activity"}
        view={"appliances"}
        drawerId={drawerId}
        isOpen={openDrawer === drawerId}
        toggleActiveDrawer={toggleActiveDrawer}
      >
        <Content />
      </Drawer>
    );
  }
}
