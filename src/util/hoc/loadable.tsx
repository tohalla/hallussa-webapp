import { find, path } from "ramda";
import React from "react";

const loadingProps = ["loading", "isFetching"];

export default <P, S = {}, SS = any>(
  Component: typeof React.Component,
  isLoading?: (props: {[key: string]: any}) => boolean
) =>
  class Loadable extends React.Component<P, S, SS> {
    public render() {
      if (
        (typeof isLoading === "function" && isLoading(this.props)) ||
        find((prop) => path([prop], this.props) === true, loadingProps)
      ) {
        return  "loading..."; // replace with loading indicator component
      }
      return <Component {...this.props} />;
    }
  };
