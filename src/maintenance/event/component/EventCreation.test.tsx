import React from "react";

import { render } from "../../../__mocks__/runtime";
import { AppliancePayload } from "../../../appliance/actions";
import EventCreation from "./EventCreation";

describe("Maintenance EventCreation component", () => {
  const mockAppliance: AppliancePayload = {
    createdAt: new Date().toISOString(),
    description: "",
    hash: "_",
    id: 0,
    maintainers: [],
    name: "mock appliance",
    organisation: 0,
  };

  it("should render the component", () => {
    const {container} = render(
      <EventCreation appliance={mockAppliance}/>
    );

    expect(container).toMatchSnapshot();
  });
});
