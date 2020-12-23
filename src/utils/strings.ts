export const camelCaseToCapitalized = (
  input: string,
): string => `${input[0].toUpperCase()}${input
  .substr(1)
  .replace(/[a-z][A-Z]/g, (it) => `${it[0]} ${it[1]}`)}`;

export const capitalizedToCamelCase = (
  input: string,
): string => `${input[0].toLowerCase()}${input
  .substr(1)
  .replace(/ [a-zA-Z]/g, (it) => it[1].toUpperCase())}`;

export const capitalize = (
  input: string,
): string => input[0].toUpperCase()
  + input.substr(1).replace(/ ([a-z])/g, (m) => ` ${m[1].toUpperCase()}`);
