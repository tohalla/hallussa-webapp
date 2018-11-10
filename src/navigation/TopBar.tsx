import classNames from "classnames";
import {
  logoContainer,
  navGroup,
  navItem,
  toggleButton,
  topbar
} from "emotion-styles/topbar";
import React from "react";
import { Link } from "react-router-dom";

import { signOut } from "../auth/auth";
import Logo from "../components/Logo";
import { sm } from "../emotion-styles/src/variables/breakpoints";

export default class Topbar extends React.Component {
  public state = {
    expand: true,
    width: window.innerWidth,
  };

  // add event listeners for watcihng window resize
  public updateDimensions = () => this.setState({ width: window.innerWidth });
  public componentWillMount = () => this.updateDimensions();
  public componentDidMount = () =>
    window.addEventListener("resize", this.updateDimensions)
  public componentWillUnmount = () =>
    window.removeEventListener("resize", this.updateDimensions)

  public handleLogout = () => signOut();
  public handleToggle = () => this.setState({expand: !this.state.expand});

  public render() {
    const {expand, width} = this.state;
    const displayMenu = expand || width > sm;
    return (
      <div className={topbar}>
        <div className={navGroup}>
          <div className={logoContainer}>
            <Logo type="light" />
            <i
              className={classNames("material-icons", toggleButton)}
              onClick={this.handleToggle}
            >
              menu
            </i>
          </div>
          {displayMenu &&
            <div className={navGroup}>
              <Link className={navItem} to="/appliances">Appliances</Link>
              <Link className={navItem} to="/maintainers">Maintainers</Link>
            </div>
          }
        </div>
        {displayMenu &&
          <div className={navGroup}>
            <a className={navItem} onClick={this.handleLogout}>Log out</a>
          </div>
        }
      </div>
    );
  }
}
