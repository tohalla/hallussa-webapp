import { appContainer, centerContent } from "../src/emotion-styles/src/container";
// tslint:disable-next-line:max-line-length
import { footerContainer, landerBgImg, landerTextImg, split, splitLeft, splitRight } from "../src/emotion-styles/src/lander";
import { navItem, topbar } from "../src/emotion-styles/src/topbar";

(document.getElementById("topbar") as HTMLElement).className = topbar;
(document.getElementById("navItem") as HTMLElement).className = navItem;
(document.getElementById("appContainer") as HTMLElement).className = appContainer;
(document.getElementById("centerContent") as HTMLElement).className = centerContent;
(document.getElementById("landerBgImg") as HTMLElement).className = landerBgImg;
(document.getElementById("landerTextImg") as HTMLElement).className = landerTextImg;
(document.getElementById("splitLeft") as HTMLElement).className = splitLeft;
(document.getElementById("splitRight") as HTMLElement).className = splitRight;
(document.getElementById("split") as HTMLElement).className = split;
(document.getElementById("footerContainer") as HTMLElement).className = footerContainer;
