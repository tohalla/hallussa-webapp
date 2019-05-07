import classnames from "classnames";
import React, { ReactChild, ReactFragment } from "react";

import { leftContainer, sidebar, sidebarContainer } from "style/sidebar";
import { padded } from "../../style/container";

interface Props {
  children: ReactFragment;
  sidebarContent: ReactChild;
}

export default ({ children, sidebarContent }: Props) => {
  return (
    <div className={sidebarContainer}>
      <div className={classnames(padded, leftContainer)}>
        {children}
      </div>
      <div className={sidebar}>
        {sidebarContent}
      </div>
    </div>
  );
};
