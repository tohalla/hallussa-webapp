import React from "react";

// TODO: Import from styles repository
const styleAddTab = "";

interface AddTabProps {
  visible: boolean;
  title?: string;
}

const defaultProps: AddTabProps = {
  visible: true,
};

/**
 * AddTab - Functional React Component
 * Renders a component for adding new Tabs (see TabComponent).
 */
const AddTab = (props: AddTabProps) => {
  const { title, visible } = props;
  return (
    <>
      { visible &&
        <div className={styleAddTab} title={title}>+</div>
      }
    </>
  )
};

AddTab.defaultProps = defaultProps;

export default AddTab;
