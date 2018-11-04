import React, { ReactChild, ReactChildren } from "react";

// TODO: Import from styles repository
const styledTabLabel = "";
const styledRemoveIcon = "";

interface TabProps {
  children: ReactChild | ReactChildren;
  closable?: boolean;
  onClick(): void;
}

const defaultProps: TabProps = {
  children: "New tab",
  onClick: () => void(0),
};

/**
 * Tab - Functional React Component
 * Renders the contents of a Tab into the TabComponent.
 */
const Tab = (props: TabProps) => {
  const {
    onClick,
    children,
    closable,
  } = props;
  return (
    <p className={styledTabLabel}>
      {children}
      { !!closable &&
        <span
          className={styledRemoveIcon}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClick();
          }}></span>
      }
    </p>
  );
};

Tab.defaultProps = defaultProps;

export default Tab;
