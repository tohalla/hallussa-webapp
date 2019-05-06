import React, { memo, ReactChild, useState } from "react";

import drawer, { content, label as labelStyle, labelExpanded } from "style/drawer";

export interface DrawerProps {
  label: string;
  expand?: boolean;
  children: ReactChild;
}

export default memo(({children, label, ...props}: DrawerProps) => {
  const [expand = false, setExpand] = useState(props.expand);

  const handleToggle = () => setExpand(!expand);

  return (
    <div className={drawer}>
      <div className={expand ? labelExpanded : labelStyle} onClick={handleToggle}>
        {label}
      </div>
      {expand && (
        <div className={content}>
          {children}
        </div>
      )}
    </div>
  );
});
