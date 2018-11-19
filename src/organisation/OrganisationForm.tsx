import React from "react";

import { OrganisationPayload } from "./actions";

interface Props {
  organisation?: OrganisationPayload;
}

type State = {[key in keyof OrganisationPayload]?: any};

export default class OrganisationForm extends React.Component<Props, State> {
  public static getDerivedStateFromProps({organisation}: Props, prevState: State) {
    if (typeof organisation === "undefined") {
      return prevState;
    }
    return organisation;
  }

  public render() {
    return <div />;
  }
}
