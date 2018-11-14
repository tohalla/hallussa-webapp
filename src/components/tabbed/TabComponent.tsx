import classnames from "classnames";
import React, { ReactChild } from "react";

// TODO: Import from styles repository
const styledTabComponent = "";
const activeTabStyle = "";

interface TabComponentProps {
  active: boolean;
  children: ReactChild[] | ReactChild;
  sticky?: boolean;
  onClick(): void;
  onClose(): void;
}

/**
 * TabComponent - Functional React Component
 * Renders a wrapper for the contents of a Tab.
 * Generic onClick event on a Tab bubbles from this component.
 */
const TabComponent = (props: TabComponentProps) => {
  const { active, children, sticky, onClose, onClick } = props;
  const className = classnames({
    [activeTabStyle]: active,
    styledTabComponent,
  });

  return (
    <div className={className} onClick={onClick}>
      {children}
      {!sticky &&
        <span className="material-icons" onClick={onClose}>
          close
        </span>
      }
    </div>
  );
};

export default TabComponent;
