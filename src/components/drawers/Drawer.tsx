import React, { Component, ReactChild } from "react";

import drawer from "emotion-styles/drawer";

import DrawerContent from "./DrawerContent";
import DrawerLabel from "./DrawerLabel";

export interface Props {
  maxHeight: string;
  label: string;
  view: string;
  drawerId: string;
  isOpen: boolean;
  toggleActiveDrawer: (view: string, drawerId: string) => void;
  children: ReactChild;
}

export default class Drawer extends Component<Props> {
  public static defaultProps = {
    maxHeight: "auto",
  };

  public render() {
    const {
      maxHeight,
      children,
      drawerId,
      isOpen,
      label,
      toggleActiveDrawer,
      view,
    } = this.props;
    return (
      <div className={drawer}>
        <DrawerLabel
          label={label}
          view={view}
          drawerId={drawerId}
          isOpen={isOpen}
          toggleDrawer={toggleActiveDrawer}
        />
        <DrawerContent isOpen={isOpen} maxHeight={maxHeight}>
          {children}
        </DrawerContent>
      </div>
    );
  }
}

// export default connect(
//   undefined,
//   {
//     toggleActiveDrawer: (view: string, drawerId: string) => {
//       console.log("Toggle", view, drawerId);
//     },
//   }
// )(Drawer);
