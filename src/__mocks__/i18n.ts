import { identity } from "ramda";
import React from "react";
import * as reactI18next from "react-i18next";

const hasChildren = (node: any) => node && (node.children || (node.props && node.props.children));

const getChildren = (node: any) =>
  node && node.children ? node.children : node.props && node.props.children;

const renderNodes = (reactNodes: any) => {
  if (typeof reactNodes === "string") {
    return reactNodes;
  }

  return Object.keys(reactNodes).map((key, i) => {
    const child = reactNodes[key];
    const isElement = React.isValidElement(child);

    if (typeof child === "string") {
      return child;
    }
    if (hasChildren(child)) {
      const inner: any = renderNodes(getChildren(child));
      return React.cloneElement(child, { ...child.props, key: i }, inner);
    }
    if (typeof child === "object" && !isElement) {
      return Object.keys(child).reduce((str, childKey) => `${str}${child[childKey]}`, "");
    }

    return child;
  });
};

const useMock = [identity, {}] as any;
useMock.t = identity;
useMock.i18n = {};

export default {
  I18nextProvider: reactI18next.I18nextProvider,
  Trans: ({ children }: any) => renderNodes(children),
  Translation: ({ children }: any) => children(identity, { i18n: {} }),
  getDefaults: reactI18next.getDefaults,
  getI18n: reactI18next.getI18n,
  initReactI18next: reactI18next.initReactI18next,
  setDefaults: reactI18next.setDefaults,
  setI18n: reactI18next.setI18n,
  useTranslation: () => useMock,
};
