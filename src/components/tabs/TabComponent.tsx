import classnames from "classnames";
import React, { ReactChild } from "react";

// TODO: Import from styles repository
const styledTabComponent = "";
const activeTabStyle = "";

interface TabComponentProps {
  active?: boolean;
  children: ReactChild[] | ReactChild;
  onClick(): void;
}

/**
 * TabComponent - Functional React Component
 * Renders a wrapper for the contents of a Tab (Tab or AddTab).
 * Generic onClick event on a Tab bubbles from this component.
 */
const TabComponent = (props: TabComponentProps) => {
  const { active, onClick, children } = props;
  const className = classnames(
    styledTabComponent,
    !!active && { activeTabStyle }
  );

  return (
    <div className={className} onClick={onClick}>
      {children}
    </div>
  )
};

export default TabComponent;
