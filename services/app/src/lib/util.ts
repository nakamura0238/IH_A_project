export const hasProperty = <K extends string>(
  x: unknown,
  ...name: any[]
): x is { [M in K]: unknown } => {
  return x instanceof Object && name.every((prop) => prop in x);
};
