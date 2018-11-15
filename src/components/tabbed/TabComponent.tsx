import classnames from "classnames";
import React, { ReactChild } from "react";
import { TabPayload } from "./actions";

// TODO: Import from styles repository
const styledTabComponent = "";

interface Props extends TabPayload {
  children: ReactChild[] | ReactChild;
  handleClose(): any;
}

/**
 * TabComponent - Functional React Component
 * Renders a wrapper for the contents of a Tab.
 * Generic onClick event on a Tab bubbles from this component.
 */
const TabComponent = (props: Props) => {
  const { children, sticky, handleClose } = props;
  const className = classnames({
    // TODO: [activeTabStyle]:
    styledTabComponent,
  });

  return (
    <div className={className}>
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
