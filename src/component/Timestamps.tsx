import classnames from "classnames";
import { format, isValid } from "date-fns";
import React from "react";

import { useTranslation } from "react-i18next";
import { stacked } from "../style/container";
import { timestamp } from "../style/inline";

interface Props {
  translationKeys: {
    createdAt: string;
    updatedAt: string;
  };
  createdAt: Date | number;
  updatedAt?: Date | number;
}

const Timestamps = ({createdAt, updatedAt, translationKeys}: Props) => {
  const {t} = useTranslation();
  return (
    <div className={classnames(stacked, timestamp)} style={{alignSelf: "stretch", justifyContent: "center"}}>
      <span>
        {
          isValid(createdAt) &&
          t(translationKeys.createdAt, {createdAt: format(createdAt, "d.M.yyyy")})
        }
      </span>
      {
        isValid(updatedAt) && updatedAt &&
        <span>{t(translationKeys.updatedAt, {updatedAt: format(updatedAt, "d.M.yyyy – HH:mm")})}</span>
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
