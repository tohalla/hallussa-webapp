import React, { ReactChild } from "react";

import { content } from "styles/drawer";

interface Props {
  children: ReactChild;
}

export default ({ children }: Props) => (
  <div className={content}>
    {children}
  </div>
);
