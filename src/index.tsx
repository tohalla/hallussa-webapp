import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Appliances from "./appliances";
import Home from "./home";
import Maintainers from "./maintainers";
import Navigation from "./navigation";
import store from "./store";

const App = () => (
  <Router>
    <div>
      <Navigation />
      <Route exact path="/" component={Home} />
      <Route path="/appliances" component={Appliances} />
      <Route path="/maintainers" component={Maintainers} />
    </div>
  </Router>
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);

export default App;
