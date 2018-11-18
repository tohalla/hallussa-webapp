import React, { Component, ReactChild } from "react";

import drawer from "emotion-styles/drawer";

import DrawerContent from "./DrawerContent";
import DrawerLabel from "./DrawerLabel";

export interface Props {
  maxHeight: string;
  label: string;
  expand: boolean;
  children: ReactChild;
  handleToggle(): any;
}

export default class Drawer extends Component<Props> {
  public static defaultProps = {
    maxHeight: "auto",
  };

  public render() {
    const {
      children,
      expand,
      handleToggle,
      label,
      maxHeight,
    } = this.props;
    return (
      <div className={drawer}>
        <DrawerLabel
          expand={expand}
          label={label}
          handleToggle={handleToggle}
        />
        {expand && (
          <DrawerContent maxHeight={maxHeight}>
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
