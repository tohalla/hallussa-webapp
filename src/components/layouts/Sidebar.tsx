import React from "react";

interface Props {
  children: Node;
}

const styledSidebar = "";

export default (props: Props) => (
  <div className={styledSidebar}>
    {props.children}
  </div>
);
