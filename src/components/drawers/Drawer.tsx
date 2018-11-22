import React, { Component, ReactChild } from "react";

import drawer from "emotion-styles/drawer";

import DrawerContent from "./DrawerContent";
import DrawerLabel from "./DrawerLabel";

export interface Props {
  label: string;
  expand: boolean;
  children: ReactChild;
  handleToggle(): any;
}

export default class Drawer extends Component<Props> {
  public render() {
    const {
      children,
      expand,
      handleToggle,
      label,
    } = this.props;
    return (
      <div className={drawer}>
        <DrawerLabel
          expand={expand}
          label={label}
          handleToggle={handleToggle}
        />
        {expand && (
          <DrawerContent>
            {children}
          </DrawerContent>
        )}
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
