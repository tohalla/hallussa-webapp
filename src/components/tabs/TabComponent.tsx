import classnames from "classnames";
import React, { ReactChild } from "react";

// TODO: Import from styles repository
const styledTabComponent = "";
const activeTabStyle = "";
const closeClassName = "";

interface TabComponentProps {
  active?: boolean;
  children: ReactChild[] | ReactChild;
  closable: boolean;
  onClick(): void;
  onClose(): void;
}

/**
 * TabComponent - Functional React Component
 * Renders a wrapper for the contents of a Tab (Tab or AddTab).
 * Generic onClick event on a Tab bubbles from this component.
 */
const TabComponent = (props: TabComponentProps) => {
  const { active, children, closable, onClose, onClick } = props;
  const className = classnames(
    styledTabComponent,
    !!active && { activeTabStyle }
  );

  return (
    <div className={className} onClick={onClick}>
      {children}
      {closable &&
        <span className={closeClassName} onClick={onClose}></span>
      }
    </div>
  )
};

export default TabComponent;
