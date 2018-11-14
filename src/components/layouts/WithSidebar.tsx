import React from "react";

import ContentLayout from "./ContentLayout";
import Sidebar from "./Sidebar";

const styledWithSidebar = "";

interface Props {
  content: Node;
  sidebarContent: Node;
}

export default ({ content, sidebarContent }: Props) => {
  return (
    <div className={styledWithSidebar}>
      <ContentLayout>
        {content}
      </ContentLayout>
      <Sidebar>
        {sidebarContent}
      </Sidebar>
    </div>
  )
}
