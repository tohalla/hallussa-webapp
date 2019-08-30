import { equals, find } from "ramda";
import React, { Component, ComponentType } from "react";
import Spinner from "../../component/Spinner";

const loadingProps = ["loading", "isFetching"];

// check deeply if props indicate positive loading status or error
const checkLoading = (props: {[key: string]: any}, depth = 1, checkErrors = true): boolean => {
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

export default <A extends {}, B = {}>(
  C: ComponentType<any> | typeof Component | ((p: A) => any),
  isLoading?: (props: {[key: string]: any}) => boolean,
  onError: (error: Error) => string = (error) => "Error"
) => React.memo((props: A) => {
  try {
    if ((typeof isLoading === "function" && isLoading(props)) || checkLoading(props)) {
      return <Spinner />; // replace with loading indicator component
    }
  } catch (error) {
    return <div>{onError(error)}</div>;
  }
  return <C {...props as A & B} />;
}, equals);
