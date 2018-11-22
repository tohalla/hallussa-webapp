import React, { ReactChild } from "react";

import { content } from "emotion-styles/drawer";

interface Props {
  children: ReactChild;
}

export default ({ children }: Props) => (
  <div className={content}>
    {children}
  </div>
);
