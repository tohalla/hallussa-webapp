import { injectGlobal } from "emotion";
import { link } from "./inline";
import { md } from "./variables/breakpoints";
import { greyscale, text } from "./variables/colors";
import fontSizes from "./variables/fontSizes";
import { major, minor, normal } from "./variables/spacing";

import "normalize.css";
import "../../assets/fonts/Roboto-Regular.ttf";
import "../../assets/style/material-icons.css";

/**
 * Inject global styles
 */
/*tslint:disable*/
injectGlobal`
  html {
    font-family: "Roboto", sans-serif;
  }

  #appContainer {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  body {
    color: ${text.dark};
    font-size: ${fontSizes.base};
  }

  * {
    box-sizing: border-box;
  }

  a {
    ${link}
  }

  label {
    user-select: none;
    display: flex;
    flex: 0;
    align-items: center;
    input[type="checkbox"] {
      flex: 0;
      margin: 0 ${minor};
    }
  }

  h1, h2, h3, h4, h5 {
    margin-bottom: ${normal};
  }

  h1 {
    margin-top: 0;
    font-size: 1.5rem;
    font-weight: 300;
  }
  h2 {
    font-size: 1.2rem;
    font-weight: 300;
    margin-top: ${major};
  }
  h3 {
    margin-top: ${minor};
    font-size: 1rem;
    font-weight: 300;
  }
  h4 {
    margin-top: ${minor};
    font-size: 1rem;
    font-weight: 500;
  }
  h5 {
    margin-top: ${minor};
    font-size: 1rem;
    font-weight: 500;
  }

  textarea {
    resize: vertical;
  }

  button:active, a:active {
    outline: none;
  }

  .rt-th {
    outline: none;
  }

  footer {
    display: flex;
    color: #fff;
    align-items: stretch;
    background-color: ${greyscale[2]};
    padding: ${normal} ${major};
    flex-grow: 1;
    max-height: 300px;

    > div {
      display: inline-block;
      padding: 1rem 2.5rem;
    }

    @media (max-width: ${md}px) {
      flex-direction: column;

      > div {
        flex-grow: 1;
        padding: 1rem 0;
      }
    }
  }
`;
/*tslint:enable*/
