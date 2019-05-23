import classnames from "classnames";
import { Field, Form, Formik, FormikConfig } from "formik";
import { equals } from "ramda";
import React from "react";
import { connect, MapStateToProps } from "react-redux";

import { useTranslation } from "react-i18next";
import { RouteComponentProps } from "react-router-dom";
import Button from "../../component/button/Button";
import SelectLanguage, { getLanguageOption } from "../../component/input/SelectLanguage";
import { ReduxState } from "../../store/store";
import { contentVerticalSpacing } from "../../style/container";
import { actionsRow, form } from "../../style/form";
import { AccountPayload, updateAccount } from "../actions";

interface StateProps {
  account: AccountPayload;
}

interface DispatchProps {
  updateAccount: typeof updateAccount;
}

type Props = RouteComponentProps<{organisation?: string}>;

const Preferences = ({account, ...props}: Props & StateProps & DispatchProps) => {
  const {t} = useTranslation();

  const handleSubmit: FormikConfig<any>["onSubmit"] = async (state, {setSubmitting}) => {
    await props.updateAccount({...state, language: state.language.value, id: account.id});
    setSubmitting(false);
  };

  return (
    <>
      <h1>{t("tab.profile.preferences")}</h1>
      <Formik
        initialValues={{language: account.language && getLanguageOption({t, language: account.language})}}
        onSubmit={handleSubmit}
      >
        {({isSubmitting, initialValues, values, status: {error} = {}}) => (
          <Form className={classnames(form, contentVerticalSpacing)}>
            <Field
              label={t("organisation.preferences.field.language")}
              component={SelectLanguage}
              name="language"
            />
            {!equals(values, initialValues) && <div className={actionsRow}>
              <Button disabled={isSubmitting} type="submit">
                {t("account.preferences.submit")}
              </Button>
            </div>}
          </Form>
        )}
      </Formik>
    </>
  );
};

const mapStateToProps: MapStateToProps<StateProps, {}, ReduxState> = (state) => ({
  account: state.entities.accounts[state.session.activeAccount as number],
});

export default connect<any, DispatchProps, Props, ReduxState>(
  mapStateToProps, {updateAccount}
)(Preferences);