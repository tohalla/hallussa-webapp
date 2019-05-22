import { useState } from "react";

export default (initialState = false): [boolean, () => void] => {
  const [state, setState] = useState(initialState);

  return [state, () => setState(!state)];
};
