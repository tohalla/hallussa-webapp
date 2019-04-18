import React, { ReactChild } from "react";

import { content } from "style/drawer";

interface Props {
  children: ReactChild;
}

export default ({ children }: Props) => (
  <div className={content}>
    {children}
  </div>
);
