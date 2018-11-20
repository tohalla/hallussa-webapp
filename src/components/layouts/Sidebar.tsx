import React, { ReactChild } from "react";

import { sidebar } from "emotion-styles/sidebar";

interface Props {
  children: ReactChild;
}

export default (props: Props) => (
  <div className={sidebar}>
    {props.children}
  </div>
);
