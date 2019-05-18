import { css } from "emotion";
import { link } from "./inline";
import { indicator, primary, text } from "./variables/colors";
import { large } from "./variables/fontSizes";
import { minor, normal } from "./variables/spacing";

const button = css`
  display: block;
  text-align: center;
  border: none;
  color: ${text.light};
  background: ${primary.neutral};
  padding: ${minor} ${normal};
  text-transform: uppercase;
  font-size: 75%;
  white-space: nowrap;
  flex: 0;
  user-select: none;
  text-decoration: none;

  .material-icons {
    font-size: ${large};
  }

  &:hover {
    color: ${text.light};
    background: ${primary.dark};
  }

  &:disabled {
    background: ${indicator.disabled};
    &:hover {
      text-decoration: none;
      background: ${indicator.disabled};
    }
  }
`;

export const plain = css`
  ${link}
  background: none;
  border: none;
  white-space: nowrap;
  padding: 0;
  &:hover {
    background: none;
    text-decoration: underline;
  }
`;

export default button;
