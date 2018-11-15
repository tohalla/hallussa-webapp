import React, { ReactChild } from "react";

import { content } from "emotion-styles/drawer";

interface Props {
  isOpen: boolean;
  maxHeight: string;
  children: ReactChild;
}

export default ({ isOpen, maxHeight, children }: Props) => (
  <>
    {isOpen &&
      <div className={content} style={{ maxHeight }}>
        {children}
      </div>
    }
  </>
);
