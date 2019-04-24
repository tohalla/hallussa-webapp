import { css } from "emotion";
import { stacked } from "./container";
import { error } from "./inline";
import { greyscale, indicator, text } from "./variables/colors";
import { inputHeight } from "./variables/sizes";
import { minimal, minor } from "./variables/spacing";

const input = css`
  border: none;
  outline: none;
  padding: ${minimal} ${minor};

  &:-webkit-autofill {
    box-shadow: 0 0 0 30px ${greyscale[9]} inset !important;
  }

  &:not(textarea) {
    height: ${inputHeight};
  }

  &::placeholder {
    color: ${text.neutral};
  }
`;

export const invalid = css`
  border: 1px solid ${indicator.error};
`;

export const inputContainer = css`
  ${stacked}
  position: relative;
`;

export const inputError = css`
  ${error}
  position: absolute;
  top: 100%;
`;

export default input;
