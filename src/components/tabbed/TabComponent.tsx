import classnames from "classnames";
import React, { ReactChild } from "react";
import { TabPayload } from "./actions";

// TODO: Import from styles repository
const styledTabComponent = "";

interface TabComponentProps extends TabPayload {
  children: ReactChild[] | ReactChild;
  handleOpen(): any;
  handleClose(): any;
}

/**
 * TabComponent - Functional React Component
 * Renders a wrapper for the contents of a Tab.
 * Generic onClick event on a Tab bubbles from this component.
 */
const TabComponent = (props: TabComponentProps) => {
  const { children, sticky, handleClose, handleOpen } = props;
  const className = classnames({
    // TODO: [activeTabStyle]:
    styledTabComponent,
  });

  return (
    <div className={className} onClick={handleOpen}>
      {children}
      {!sticky &&
        <span className="material-icons" onClick={handleClose}>
          close
        </span>
      }
    </div>
  );
};

export default TabComponent;
