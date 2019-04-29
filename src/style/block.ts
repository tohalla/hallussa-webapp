import { css } from "emotion";

import { greyscale, indicator } from "./variables/colors";
import { base, large, small } from "./variables/fontSizes";
import { minor, normal } from "./variables/spacing";

export const outerBlock = css`
  display: inline-flex;
  align-items: center;
  flex-direction: column;
  padding: ${minor}
`;

export const numberBlock = css`
  background: ${greyscale[7]};
  padding: ${normal};

  display: flex;
  align-items: center;
  justify-content: center;

  &.lg {
    width: 80px;
    height: 80px;
    font-size: ${large};
  }
  &.sm {
    width: 40px;
    height: 40px;
    font-size: ${small};
  }
  &.md {
    width: 60px;
    height: 60px;
    font-size: ${base};
  }

  &.alert {
    background: ${indicator.alert};
  }
`;
