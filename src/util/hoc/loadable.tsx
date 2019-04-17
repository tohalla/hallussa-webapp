import { find, hasPath } from "ramda";
import React, { Component, ComponentType } from "react";

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

export default <P extends {}>(
  C: ComponentType<any> | typeof Component | ((p: P) => any),
  isLoading?: (props: {[key: string]: any}) => boolean,
  onError: (error: Error) => JSX.Element | string = (error) => "Error"
) => React.memo((props: P) => {
  try {
    if ((typeof isLoading === "function" && isLoading(props)) || checkLoading(props)) {
      return "loading..."; // replace with loading indicator component
    }
  } catch (error) {
    return onError(error) || null;
  }
  return hasPath(["prototype", "render"], C) ?
    <C {...props} /> : (C as (p: P) => any)(props);
});
