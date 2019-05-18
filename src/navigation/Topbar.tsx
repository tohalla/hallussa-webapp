import classnames from "classnames";
import React, { memo, useEffect, useState } from "react";
import {
  logoContainer,
  navGroup,
  toggleButton,
  topbar
} from "style/topbar";

import { RouteComponentProps, withRouter } from "react-router";
import Logo from "../component/Logo";
import { topbarContainer } from "../style/container";
import { sm } from "../style/variables/breakpoints";
import AccountMenu from "./AccountMenu";
import OrganisationNavigation from "./OrganisationNavigation";

export default memo(withRouter((props: RouteComponentProps) => {
  const [expand, setExpand] = useState(false);
  const [width, setWidth] = useState(innerWidth);

  useEffect(() => { // hides top bar when path changes
    setExpand(false);
  }, [props.location.pathname]);

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  });

  const handleToggle = () => setExpand(!expand);
  const updateDimensions = () => setWidth(window.innerWidth);

  const displayMenu = expand || width > sm;
  return (
    <nav className={topbarContainer}>
      <div className={topbar}>
        <div className={navGroup}>
          <div className={logoContainer}>
            <Logo type="light" />
            <i className={classnames("material-icons", toggleButton)} onClick={handleToggle}>
              menu
            </i>
          </div>
          {displayMenu && <OrganisationNavigation />}
        </div>
        {displayMenu && <AccountMenu />}
      </div>
    </nav>
  );
}));
