import React, { ReactFragment } from "react";
import { useTranslation } from "react-i18next";

import { error, info, success } from "../../style/inline";
import { AppliancePayload } from "../actions";

interface Props extends Pick<AppliancePayload, "status"> {
  label: ReactFragment;
}

const Status = ({status, label}: Props) => {
  const {t} = useTranslation();

  return (
    <div className={info}>
      {label}
      {status && status.isMalfunctioning ?
        <span className={error}>{t("appliance.status.malfunctioning")}</span>
      : <span className={success}>{t("appliance.status.ok")}</span>}
    </div>
  );
};

Status.defaultProps = {
  label: <i className="material-icons">info</i>,
};

export default Status;
