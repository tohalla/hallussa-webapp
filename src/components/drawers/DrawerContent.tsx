import React, { ReactChild } from "react";

import { content } from "emotion-styles/drawer";

interface Props {
  maxHeight: string;
  children: ReactChild;
}

export default ({ maxHeight, children }: Props) => (
  <div className={content} style={{ maxHeight }}>
    {children}
  </div>
);
