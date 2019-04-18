import { css } from "emotion";

import { sm } from "./variables/breakpoints";
import { greyscale } from "./variables/colors";
import { normal } from "./variables/spacing";

const drawer = css`
  width: 100%;
`;

export const label = css`
  color: ${greyscale[2]};
  text-transform: uppercase;
  background: ${greyscale[8]};
  margin: 0;
  padding: ${normal};
  border-bottom: 1px solid ${greyscale[4]};
  user-select: none;
`;

export const labelExpanded = css`
  ${label}
  border: 0;
`;

export const content = css`
  background: ${greyscale[9]};
  padding: ${normal};
  user-select: none;
  border-bottom: 1px solid ${greyscale[4]};
`;

export default drawer;
