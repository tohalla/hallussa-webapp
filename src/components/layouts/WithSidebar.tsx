import classNames from "classnames";
import { path } from "ramda";
import React, { ReactChild } from "react";

import ContentLayout from "./ContentLayout";
import Sidebar from "./Sidebar";

import { withSidebar } from "emotion-styles/container";

interface Props {
  content: ReactChild;
  sidebarContent: ReactChild;
}

export default ({ content, sidebarContent }: Props) => {
  return (
    <div className={withSidebar}>
      <ContentLayout>
        {content}
      </ContentLayout>
      <Sidebar>
        {sidebarContent}
      </Sidebar>
    </div>
  );
};
