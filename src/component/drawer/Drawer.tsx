import React, { memo, ReactChild } from "react";

import drawer from "style/drawer";

import { useTranslation } from "react-i18next";
import { TranslationProps } from "../../../misc";
import DrawerContent from "./DrawerContent";
import DrawerLabel from "./DrawerLabel";

export interface DrawerProps {
  label: string | ((p: TranslationProps) => string);
  expand: boolean;
  children: ReactChild;
  handleToggle(): any;
}

export default memo(({children, expand, handleToggle, label}: DrawerProps) => {
  const {t} = useTranslation();
  return (
    <div className={drawer}>
      <DrawerLabel
        expand={expand}
        label={typeof label === "function" ? label({t}) : label}
        handleToggle={handleToggle}
      />
      {expand && (
        <DrawerContent>
          {children}
        </DrawerContent>
      )}
    </div>
  );
});
