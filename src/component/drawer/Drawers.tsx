import { lensPath, map, not, over } from "ramda";
import React, { memo, useState } from "react";
import Drawer, { DrawerProps } from "./Drawer";

export interface DrawersProps {
  drawers: {[key: string]: Pick<DrawerProps, "label" | "children">};
}

export default memo(({drawers}: DrawersProps) => {
  const [expand, setExpand] = useState(map(() => false, drawers));

  const handleToggle = (drawer: string) => () =>
    setExpand(over(lensPath([drawer]), not, expand));

  return (
    <>
      {map(
        (d) => {
          return (
            <Drawer
              key={d}
              expand={expand[d]}
              handleToggle={handleToggle(d)}
              {...drawers[d]}
            />
          );
        },
        Object.keys(drawers)
      )}
    </>
  );
});
