import React, { Component, ReactChild } from "react";
import { connect } from "react-redux";

import DrawerContent from "./DrawerContent";
import DrawerLabel from "./DrawerLabel";

export interface Props {
  label: string;
  view: string;
  drawerId: string;
  isOpen: boolean;
  toggleActiveDrawer: (view: string, drawerId: string) => void;
  children: ReactChild;
}

export default class Drawer extends Component<Props> {
  public render() {
    const {
      children,
      drawerId,
      isOpen,
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
          isOpen={isOpen}
          toggleDrawer={toggleActiveDrawer}
        />
        <DrawerContent isOpen={isOpen} >
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
