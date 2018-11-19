import classNames from "classnames";
import React, { ReactChild } from "react";

import { leftContainer, sidebarContainer } from "emotion-styles/sidebar";
import { padded } from "../../emotion-styles/src/container";
import Sidebar from "./Sidebar";

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
      <Sidebar>
        {sidebarContent}
      </Sidebar>
    </div>
  );
};
