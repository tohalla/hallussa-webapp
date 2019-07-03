import { css } from "emotion";
import { greyscale } from "./variables/colors";
import { minor, normal } from "./variables/spacing";

export const dropdownContainer = css`
  position: relative;
`;

export const dropdownMenuContainer = css`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: stretch;
  right: ${normal};
  background: ${greyscale[9]};
  border: 1px solid ${greyscale[5]};
  z-index: 99;
`;

export const dropdownMenuItem = css`
  padding: ${minor} ${normal};
  background: ${greyscale[9]};
  display: flex;
  text-decoration: none;

  &:hover {
    background: ${greyscale[7]};
    cursor: default;
    text-decoration: none;
  }

  &:empty {
    display: none;
  }
`;
