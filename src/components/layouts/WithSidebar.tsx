import React, { ReactChild } from "react";

import ContentLayout from "./ContentLayout";
import Sidebar from "./Sidebar";

// NOTE: styledWithSidebar style must use flexbox and direction attribute
// As we want to flip the order of the elements so that the Sidebar is
// displayed first when screensize is small.
const styledWithSidebar = "";

interface Props {
  content: ReactChild;
  sidebarContent: ReactChild;
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
