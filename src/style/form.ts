import { css } from "emotion";

import { sm } from "./variables/breakpoints";
import { normal } from "./variables/spacing";

export const form = css`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 350px;

  @media (max-width: ${sm}px) {
    max-width: 90vw;
    overflow: hidden;
  }
`;

export const inputRow = css`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;

  & > * {
    flex: 1;
  }

  & > *:not(style) + * {
    margin-left: ${normal};
  }
`;

export const actionsRow = css`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
`;
