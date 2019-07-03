import React, { ReactNode, useEffect, useRef, useState } from "react";

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

  return (
    <>
      <i className="material-icons">more_vert</i>
      {isOpen && (
        <div ref={contentEl}>
          {children}
        </div>
      )}
    </>
  );
};
