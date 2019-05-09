import { css } from "emotion";
import { centerContent, stacked } from "./container";
import { greyscale, indicator, primary, text } from "./variables/colors";
import { inputHeight } from "./variables/sizes";
import { minor } from "./variables/spacing";

const input = css`
  border: none;
  background: ${greyscale[9]};
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

  &:not([type="checkbox"]) {
    outline: none;
  }
`;

export const inputContainer = css`
  ${stacked}
  width: 12em;
`;

export const wide = css`
  width: 22em;
`;

export const inputLabel = css`
  display: flex;
  white-space: nowrap;
  align-items: center;
  font-size: .75rem;
  background: ${greyscale[9]};
  color: ${primary.neutral};;
  overflow: hidden;
  width: 0;
`;

export const inputLabelFocused = css`
  padding-right: ${minor};
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
  ${centerContent}
  background: ${greyscale[9]};
  padding: 0 ${minor};
  flex: 0 1 auto;
  color: ${indicator.error};
  width: auto;

  .material-icons {
    font-size: 1.25em;
  }
`;

export default input;
