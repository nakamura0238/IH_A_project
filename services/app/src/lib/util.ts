export const hasProperty = <K extends string>(
  x: unknown,
  ...name: any[]
): x is { [M in K]: unknown } => {
  return x instanceof Object && name.every((prop) => prop in x);
};

export const toCamelCase = (str: string) => {
  return str.split('_').map((word, index) => {
    if (index === 0) return word.toLowerCase();
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join('')
}

type KeyObject = {
  [key: string]: any
}
export const toCamelCaseObject = (object: KeyObject) => {
  if (Array.isArray(object)) {
    const result: any[] = [];

    object.forEach((value) => {
      result.push(toCamelCaseObject(value))
    })

    return result;
  } else {
    const result: KeyObject = {}
    
    Object.keys(object).forEach((key) => {
      result[toCamelCase(key)] = object[key]
    })
    
    return result;
  }
}