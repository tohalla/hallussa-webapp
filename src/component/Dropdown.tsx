import classnames from "classnames";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { MouseEventHandler } from "react-select/src/types";

import { dropdownButton, dropdownContainer, dropdownMenuContainer } from "../style/dropdown";
import Button from "./button/Button";

interface Props {
  children: ReactNode;
}

export default ({children}: Props) => {
  const contentEl = useRef<HTMLInputElement>(null);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleClick: EventListener = (e) => {
    if (contentEl.current && contentEl.current.contains(e.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  const toggle: MouseEventHandler = (e) => {
    e.stopPropagation();
    setOpen(!isOpen);
  };

  return (
    <div className={dropdownContainer}>
      <Button
        onClick={toggle}
        plain={true}
        className={classnames("material-icons", dropdownButton)}
      >
        more_vert
      </Button>
      {isOpen && (
        <div className={dropdownMenuContainer} ref={contentEl}>
          {children}
        </div>
      )}
    </div>
  );
};
