import "../assets/img/bg_img.svg";
// tslint:disable-next-line:max-line-length
import logo from "../src/emotion-styles/src/logo";
import { logoContainer, navGroup, navItem, toggleButton, topbar } from "../src/emotion-styles/src/topbar";

const { body } = document;

(document.getElementById("topbar") as HTMLElement).className = topbar;
const navGroups = document.getElementsByClassName("navGroup");
const navItems = document.getElementsByClassName("navItem");

const applyClassToElems = (elems: HTMLCollectionOf<Element>, cn: string) => {
  Array.from(elems).forEach((el) => {
    el.className = cn;
  });
};

applyClassToElems(navGroups, navGroup);
applyClassToElems(navItems, navItem);

(document.getElementById("logoContainer") as HTMLElement).className = logoContainer;
(document.getElementById("logo") as HTMLElement).className = logo;
const toggleMenu = (document.getElementById("toggleMenu") as HTMLElement);
toggleMenu.className = `material-icons ${toggleButton}`;

const navi = (document.getElementById("navi") as HTMLElement);

let menuOpen = false;
toggleMenu.addEventListener("click", (e) => {
  e.preventDefault();
  if (menuOpen) {
    navi.classList.add("hidden");
  } else {
    navi.classList.remove("hidden");
  }
  menuOpen = !menuOpen;
});

const breakpoint = 767;

const toggleNavi = () => {
  if (body.clientWidth > breakpoint) {
    navi.classList.remove("hidden");
  } else {
    navi.classList.add("hidden");
  }
};

window.addEventListener("resize", toggleNavi);

toggleNavi();
