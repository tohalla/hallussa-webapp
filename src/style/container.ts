import { css } from "emotion";

import { sm } from "./variables/breakpoints";
import { greyscale } from "./variables/colors";
import { major, minor, normal } from "./variables/spacing";

export const appContainer = css`
  display: flex;
  flex-direction: column;
  min-width: 100vw;
  min-height: 100vh;
`;

export const contentHorizontalSpacing = css`
  & > * + * {
    margin-left: ${normal};
  }
`;

export const contentVerticalSpacing = css`
  & > * + * {
    margin-top: ${normal};
  }
`;
export const contentVerticalSpacingMinor = css`
  & > * + * {
    margin-top: ${minor};
  }
`;

export const flex1 = css`flex: 1;`;

export const rowContainer = css`
  display: flex;
  flex-direction: row;

  @media (max-width: ${sm}px) {
    ${contentVerticalSpacingMinor}

    flex-direction: column;
  }
`;

export const spread = css`
  display: flex;
  justify-content: space-between;
`;

export const alignFlexStart = css`align-items: flex-start;`;
export const alignCenter = css`align-items: center;`;
export const justifyCenter = css`justify-content: center;`;
export const centerContent = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const stacked = css`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

// default container used for views
export const viewContainer = css`
  ${stacked}
  margin: ${major} auto;
  width: 80vw;

  @media (max-width: ${sm}px) {
    margin: ${normal} 0;
    width: 100vw;
  }
`;

export const viewContentContainer = css`
  display: flex;
  flex-direction: column;
  background-color: ${greyscale[8]};
`;

export const noPadding = css`
  padding: 0 !important;
`;

export const padded = css`
  padding: ${normal} ${major};

  @media (max-width: ${sm}px) {
    padding: ${minor} ${minor};
  }
`;

export const paddedMajor = css`
  padding: ${major};
`;

export const emptyContainer = css`
  flex: 1;
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${greyscale[4]};
  padding: ${normal};
`;

export const authContainer = css`
  ${padded}
  ${viewContentContainer}

  h1 {
    color: ${greyscale[2]};
  }

  @media (max-width: ${sm}px) {
    flex: 1;
    align-self: stretch;
    padding: ${minor};
    ${contentVerticalSpacing}
  }
`;

export const topbarContainer = css`
  min-height: ${major};
  max-height: ${major};
  position: relative;
`;

export const spinner = css`
  display: flex;
  align-self: stretch;
  flex: 1;

  align-items: center;
  justify-content: center;

  path {
    fill: ${greyscale[0]};
    opacity: .3;
  }
`;
