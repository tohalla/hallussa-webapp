import React, { ReactChild } from "react";

interface Props {
  isOpen: boolean;
  children: ReactChild;
}

export default (props: Props) => (
  <>
    {props.isOpen &&
      <div>
        {props.children}
      </div>
    }
  </>
);
