import classNames from "classnames";
import React, { ReactChild } from "react";

import { leftContainer, sidebar, sidebarContainer } from "style/sidebar";
import { padded } from "../../style/container";

interface Props {
  content: ReactChild;
  sidebarContent: ReactChild;
}

export default ({ content, sidebarContent }: Props) => {
  return (
    <div className={sidebarContainer}>
      <div className={classNames(padded, leftContainer)}>
        {content}
      </div>
      <div className={sidebar}>
        {sidebarContent}
      </div>
    </div>
  );
};
