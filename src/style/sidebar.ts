import { css } from "emotion";

import { stacked } from "./container";
import { sm } from "./variables/breakpoints";
import { greyscale } from "./variables/colors";
import { normal } from "./variables/spacing";

export const leftContainer = css`
  ${stacked}
  display: flex;
  flex: 2;
  overflow-x: auto;
`;

export const sidebarContainer = css`
  flex: 1;
  display: flex;
  height: auto;

  @media (max-width: ${sm}px) {
    background: none;
    align-items: initial;
    flex-direction: column;
  }
`;

export const sidebar = css`
  background-color: ${greyscale[7]};
  padding: ${normal};
  flex: 1;

  @media (max-width: ${sm}px) {
    margin-top: ${normal};
    background: none;
    padding: 0;
  }
`;
