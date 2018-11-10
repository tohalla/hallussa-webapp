import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Appliances from "./appliances";
import Home from "./home";
import Maintainers from "./maintainers";
import Navigation from "./navigation";

export default () => (
  <Router>
    <Navigation />
    <Route exact path="/" component={Home} />
    <Route path="/appliances" component={Appliances} />
    <Route path="/maintainers" component={Maintainers} />
  </Router>
)
