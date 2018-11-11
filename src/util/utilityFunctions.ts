// helper for ramda cond and reducers
export const anyEquals = <T = any>(items: T[]) => (compare: T) =>
  items.indexOf(compare) !== -1;
