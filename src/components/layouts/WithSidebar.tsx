import React, { ReactChild } from "react";

import { sidebarContainer } from "emotion-styles/sidebar";
import ContentLayout from "./ContentLayout";
import Sidebar from "./Sidebar";

interface Props {
  content: ReactChild;
  sidebarContent: ReactChild;
}

export default ({ content, sidebarContent }: Props) => {
  return (
    <div className={sidebarContainer}>
      <ContentLayout>
        {content}
      </ContentLayout>
      <Sidebar>
        {sidebarContent}
      </Sidebar>
    </div>
  );
};
