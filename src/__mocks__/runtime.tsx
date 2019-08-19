import { render as tlRender, RenderOptions } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";

import store from "../store/store";

export const render = jest.fn((ui: React.ReactElement, options?: Omit<RenderOptions, "queries">) =>
  tlRender(
    <Provider store={store}>{ui}</Provider>,
    options
  )
);
