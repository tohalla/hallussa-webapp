import { css } from "emotion";

import { contentVerticalSpacing } from "./container";
import { sm } from "./variables/breakpoints";
import { normal } from "./variables/spacing";

export const form = css`
  display: flex;
  flex: 1;
  flex-direction: column;

  @media (max-width: ${sm}px) {
    overflow: hidden;
  }
`;

export const inputRow = css`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-width: 350px;

  & > * {
    flex: 1;
  }

  & > *:not(style) + * {
    margin-left: ${normal};
  }

  @media (max-width: ${sm}px) {
    ${contentVerticalSpacing}
    flex-direction: column;
    align-items: stretch;
    min-width: auto;

    & > *:not(style) + * {
      margin-left: 0;
    }
  }
`;

export const actionsRow = css`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${sm}px) {
    ${contentVerticalSpacing}
    align-items: flex-end;

    button {
      align-self: stretch;
    }

    flex-direction: column;
  }
`;
