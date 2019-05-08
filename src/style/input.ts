import { css } from "emotion";
import { stacked } from "./container";
import { error } from "./inline";
import { greyscale, indicator, primary, text } from "./variables/colors";
import { inputHeight } from "./variables/sizes";
import { minor } from "./variables/spacing";

const input = css`
  border: none;
  outline: none;
  padding: ${minor};
  flex: 1;

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

export const inputLabel = css`
  display: flex;
  white-space: nowrap;
  align-items: center;
  font-size: .75rem;
  color: ${text.light};
  background: ${primary.neutral};
  overflow: hidden;
  width: 0;
`;

export const inputLabelFocused = css`
  padding: ${minor};
  flex: 0 1 auto;
  width: auto;
`;

export const inputLabelContainer = css`
  position: relative;
  display: flex;
  align-items: stretch;

  & > input:not([type="checkbox"]), textarea {
    flex: 1;
  }
`;

export const inputError = css`
  ${error}
  position: absolute;
  top: 100%;
`;

export default input;
