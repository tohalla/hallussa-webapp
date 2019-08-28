import { css } from "emotion";
import { greyscale } from "./variables/colors";
import { minor, normal } from "./variables/spacing";

export const dropdownContainer = css`
  position: relative;
`;

export const dropdownButton = css`
  color: ${greyscale[3]};

  &:hover {
    color: ${greyscale[0]};
  }
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
  z-index: 9;
`;

export const dropdownMenuItem = css`
  padding: ${minor} ${normal};
  background: ${greyscale[9]};
  display: flex;
  text-decoration: none;
  color: ${greyscale[2]};

  &:hover {
    color: ${greyscale[0]};
    background: ${greyscale[7]};
    cursor: default;
    text-decoration: none;
  }

  &:empty {
    display: none;
  }
`;
