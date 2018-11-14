import React, { Component } from "react";
import NumberComponent from "../../../components/drawers/subcomponents/NumberComponent";

interface Props {
  [key: string]: any;
}

export default class Content extends Component<Props> {
  public render() {
    // TODO: Do not use hard-coded values
    return (
      <div>
        <div>
          <NumberComponent
            size={"lg"}
            number={1}
            label={"Number of appliances"}
          />
          <NumberComponent
            size={"lg"}
            number={0}
            label={"Currently operative"}
          />
        </div>
        <div>
          <p>Average runtime without maintanance</p>
          <div>
            <NumberComponent
              size={"sm"}
              number={0}
              label={"years"}
            />
            <NumberComponent
              size={"sm"}
              number={5}
              label={"months"}
            />
            <NumberComponent
              size={"sm"}
              number={3}
              label={"weeks"}
            />
            <NumberComponent
              size={"sm"}
              number={23}
              label={"days"}
            />
          </div>
        </div>
      </div>
    );
  }
}
