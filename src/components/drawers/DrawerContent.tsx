import React from "react";

interface Props {
  isOpen: boolean;
  children: Node;
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
