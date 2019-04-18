import classNames from "classnames";
import { format } from "date-fns";
import React from "react";

import { useTranslation } from "react-i18next";
import { stacked } from "../style/container";
import { timestamp } from "../style/inline";

interface Props {
  translationKeys: {
    createdAt: string;
    updatedAt: string;
  };
  createdAt: Date | string;
  updatedAt?: Date | string;
}

const Timestamps = ({createdAt, updatedAt, translationKeys}: Props) => {
  const {t} = useTranslation();
  return (
    <div className={classNames(stacked, timestamp)} style={{alignSelf: "stretch", justifyContent: "center"}}>
      <span>{t(translationKeys.createdAt, {createdAt: format(createdAt, "D.M.YYYY")})}</span>
      {
        updatedAt &&
        <span>{t(translationKeys.updatedAt, {updatedAt: format(updatedAt, "D.M.YYYY – HH:mm")})}</span>
      }
    </div>
  );
};

Timestamps.defaultProps = {
  translationKeys: {
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  },
};

export default Timestamps;
