import { css } from "emotion";

import { sm } from "./variables/breakpoints";
import { greyscale, primary } from "./variables/colors";
import { base, huge, large } from "./variables/fontSizes";
import { minimal, minor, normal } from "./variables/spacing";

export const tabsContainer = css`
  display: flex;
  overflow: auto;
`;

export const tab = css`
  &:focus {
    outline-offset: -4px;
  }
  display: flex;
  align-items: center;
  padding: ${minor} ${normal};
  background-color: ${greyscale[6]};
  text-decoration: none;
  user-select: none;
  color: ${greyscale[2]};

  &:hover {
    color: ${greyscale[2]};
  }

  .material-icons {
    &:hover {
      color: ${greyscale[0]};
    }
    font-size: ${large};
    line-height: ${base};
  }

  & + & {
    margin-left: ${minimal};
  }

  & > * + * {
    margin-left: ${minimal};
  }

  @media (max-width: ${sm}px) {
    margin: 0;
  }
`;

export const actionTab = css`
  background: ${primary.light};
  color: ${greyscale[9]};
  &:focus {
    outline-offset: 0;
  }
  .material-icons {
    color: ${greyscale[9]};
    font-size: ${huge};
    line-height: ${base}
  }
`;

export const tabActive = css`
  color: ${greyscale[2]};
  padding: ${minor} ${normal};
  background-color: ${greyscale[8]};
`;
