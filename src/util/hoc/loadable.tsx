import { find, path } from "ramda";
import React from "react";

const loadingProps = ["loading", "isFetching"];

export default (Component: typeof React.Component) =>
  class Loadable extends React.Component {
    public render() {
      if (find((prop) => path([prop], this.props) === true, loadingProps)) {
        return  "loading..."; // replace with loading indicator component
      }
      return <Component {...this.props} />;
    }
  };
