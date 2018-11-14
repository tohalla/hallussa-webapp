import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Router from "./router";

class ApplianceContainer extends Component<> {
  public render() {
    return (
      <div>
        <Router />
        <div>
          Temporary list:
          <Link to={"/appliances/1"}>
            1
          </Link>
        </div>
        <div>
          Sidebar
        </div>
      </div>
    );
  }
}

export default connect(

)(ApplianceContainer as any);
