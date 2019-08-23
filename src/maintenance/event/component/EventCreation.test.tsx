import { fireEvent } from "@testing-library/dom";
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

  const {container, getByText} = render(
    <EventCreation appliance={mockAppliance}/>
  );

  it("should render the component correctly", () => {
    expect(container).toMatchSnapshot();
  });

  it("should activate scheduled maintenance creation when respective button clicked", () => {
    fireEvent.click(getByText("maintenanceEvent.create.scheduled.title"));
  });

});
