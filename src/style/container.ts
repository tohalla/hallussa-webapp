import { css } from "emotion";

import { sm } from "./variables/breakpoints";
import { greyscale } from "./variables/colors";
import { major, normal } from "./variables/spacing";

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

export const flex1 = css`flex: 1;`;
export const alignFlexStart = css`align-items: flex-start;`;

export const rowContainer = css`
  display: flex;
  flex-direction: row;

  @media (max-width: ${sm}px) {
    flex-direction: column;
  }
`;

export const spread = css`
  display: flex;
  justify-content: space-between;
`;

export const alignCenter = css`align-items: center;`;
export const justifyCenter = css`justify-content: center;`;
export const centerContent = css`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const stacked = css`
  display: flex;
  flex-direction: column;
  align-items: stretch;

  & > * + * {
    margin: 0;
  }
`;

// default container used for views
export const viewContainer = css`
  ${stacked}
  margin: ${major} auto;
  width: 80vw;

  @media (max-width: ${sm}px) {
    margin: 0;
    width: 100vw;
  }
`;

export const viewContentContainer = css`
  display: flex;
  flex-direction: column;
  background-color: ${greyscale[8]};
`;

export const padded = css`
  padding: ${normal} ${major};
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
