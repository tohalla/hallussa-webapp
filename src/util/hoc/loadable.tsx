import { find } from "ramda";
import React from "react";

const loadingProps = ["loading", "isFetching"];

// check deeply if props indicate positive loading status or error
const checkLoading = (props: {[key: string]: any}, depth = 1, checkErrors = true): boolean => {
  if (checkErrors && typeof props.error ===  "string") {
    throw new Error(props.error);
  }
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
  isLoading?: (props: {[key: string]: any}) => boolean,
  onError: (error: Error) => JSX.Element | string = (error) => "Error"
) =>
  class Loadable extends React.Component<P, S, SS> {
    public shouldComponentUpdate = (nextProps: P) =>
      !((typeof isLoading === "function" && isLoading(nextProps)) || checkLoading(nextProps))
    public render() {
      try {
        if ((typeof isLoading === "function" && isLoading(this.props)) || checkLoading(this.props)) {
          return "loading..."; // replace with loading indicator component
        }
      } catch (error) {
        return onError(error) || null;
      }
      return <Component {...this.props} />;
    }
  };
