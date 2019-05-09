import React, { ChangeEventHandler, MouseEventHandler, useState } from "react";
import { useTranslation } from "react-i18next";
import { connect, MapDispatchToProps } from "react-redux";

import Button from "../../component/button/Button";
import Input from "../../component/Input";
import { OrganisationPayload } from "../../organisation/actions";
import { ReduxState } from "../../store/store";
import { rowContainer } from "../../style/container";
import { addAccount } from "../actions";

interface DispatchProps {
  addAccount: (organisation: number, payload: {email: string}) => any;
}

interface Props {
  organisation: OrganisationPayload;
}

const AddAccount = ({organisation, ...props}: Props & DispatchProps) => {
  const [email, setEmail] = useState("");
  const {t} = useTranslation();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => setEmail(e.target.value);
  const handleClick: MouseEventHandler = () => props.addAccount(organisation.id, {email});

  return (
    <div className={rowContainer}>
      <Input
        value={email}
        name="email"
        type="email"
        onChange={handleChange}
        placeholder={t("organisation.account.field.email")}
        wide={true}
      />
      <Button type="button" onClick={handleClick}>
        {t("organisation.account.addAccount")}
      </Button>
    </div>
  );
};

const mapDispatchToProps: MapDispatchToProps<DispatchProps, Props> = {addAccount};

export default connect<{}, DispatchProps, Props, ReduxState>(
  undefined,
  mapDispatchToProps
)(AddAccount);
