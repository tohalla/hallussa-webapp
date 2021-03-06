import React, { ReactFragment } from "react";
import { useTranslation } from "react-i18next";

import { error, info, success } from "../../style/inline";
import { AppliancePayload } from "../actions";

interface Props extends Pick<AppliancePayload, "status"> {
  label(props: {status?: {isMalfunctioning: boolean}}): ReactFragment;
}

const Status = ({status, label}: Props) => {
  const {t} = useTranslation();

  return (
    <div className={info}>
      {label({status})}
      {status && status.isMalfunctioning ?
        <span className={error}>{t("appliance.status.malfunctioning")}</span>
      : <span className={success}>{t("appliance.status.ok")}</span>}
    </div>
  );
};

const defaultProps: Props = {
  label: ({status}) => <i className="material-icons">{status && status.isMalfunctioning ? "error" : "info_outline"}</i>,
};

Status.defaultProps = defaultProps;

export default Status;
