import React, { Component } from "react";
import DrawerContent from "./DrawerContent";
import DrawerLabel from "./DrawerLabel";

export interface Props {
  label: string;
  view: string;
  drawerId: string;
  isActive: boolean;
  toggleActiveDrawer: (view: string, drawerId: string) => void;
  children: Node;
}

export default class Drawer extends Component<Props> {
  public render() {
    const {
      children,
      drawerId,
      label,
      toggleActiveDrawer,
      view,
    } = this.props;
    return (
      <div>
        <DrawerLabel
          label={label}
          view={view}
          drawerId={drawerId}
          isActive={true}
          toggleActiveDrawer={toggleActiveDrawer}
        />
        <DrawerContent
          isOpen={"summary" === "summary"}
        >
          {children}
        </DrawerContent>
      </div>
    )
  }
}
