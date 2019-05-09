import { css } from "emotion";
import { stacked } from "./container";
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
  color: ${greyscale[2]};
  flex: 0 1 auto;
  overflow: hidden;
  padding-right: ${minor};
`;

export const inputLabelFocused = css`
  color: ${primary.light};
`;

export const inputLabelHidden = css`
  width: 0;
  padding: 0;
`;

export const inputLabelError = css`
  color: ${indicator.error};
`;

export const inputLabelContainer = css`
  position: relative;
  display: flex;
  align-items: stretch;

  & > input:not([type="checkbox"]), textarea {
    flex: 1;
  }
`;

export default input;
