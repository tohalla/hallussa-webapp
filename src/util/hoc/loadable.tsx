import { find, values } from "ramda";
import React from "react";

const loadingProps = ["loading", "isFetching"];

// check deeply if props indicate positive loading status
const checkLoading = (props: {[key: string]: any}, depth = 1): boolean => {
  if (find((k) => props[k] === true, loadingProps)) {
    return true;
  }
  if (
    depth > 0 &&
    find(
      (k) => typeof props[k] === "object" && checkLoading(props[k], depth - 1),
      Object.keys(props)
    )) {
    return true;
  }
  return false;
};

export default <P, S = {}, SS = any>(
  Component: typeof React.Component,
  isLoading?: (props: {[key: string]: any}) => boolean
) =>
  class Loadable extends React.Component<P, S, SS> {
    public render() {
      console.log(this.props);
      if ((typeof isLoading === "function" && isLoading(this.props)) || checkLoading(this.props)) {
        return  "loading..."; // replace with loading indicator component
      }
      return <Component {...this.props} />;
    }
  };
