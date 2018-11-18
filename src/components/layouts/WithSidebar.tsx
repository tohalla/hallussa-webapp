import React, { ReactChild } from "react";

import { withSidebar } from "emotion-styles/container";
import ContentLayout from "./ContentLayout";
import Sidebar from "./Sidebar";

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
