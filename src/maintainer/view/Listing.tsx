import React, { useMemo } from "react";
import { connect, MapStateToProps } from "react-redux";

import { useTranslation } from "react-i18next";
import { getEntitiesByOrganisationSelector } from "../../organisation/selectors";
import { ReduxState } from "../../store/store";
import Loadable from "../../util/hoc/Loadable";
import { MaintainerPayload } from "../actions";
import MaintainerList from "../component/MaintainerList";

interface Props {
  maintainers: Readonly<{[k: string]: MaintainerPayload}>;
}

const Listing = (props: Props) => {
  const {t} = useTranslation();
  const maintainers = useMemo(() => Object.values(props.maintainers), [props.maintainers]);

  return (
    <>
      <h1>{t("organisation.maintainers.title")}</h1>
      <MaintainerList maintainers={maintainers} />
    </>
  );
};

const mapStateToProps: MapStateToProps<{}, Props, ReduxState> = (state) => ({
  maintainers: getEntitiesByOrganisationSelector<"maintainers">("maintainers", state.session.activeOrganisation)(state),
});

export default connect(mapStateToProps)(Loadable(Listing));
