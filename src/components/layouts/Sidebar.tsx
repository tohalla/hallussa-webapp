import React, { ReactChild } from "react";

interface Props {
  children: ReactChild[];
}

const styledSidebar = "";

export default (props: Props) => (
  <div className={styledSidebar}>
    {props.children}
  </div>
);
