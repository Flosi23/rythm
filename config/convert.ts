/**
 * Converts a string from an env file to a number
 * @param {string | undefined} string - The variable to be converted
 * @return {number} - The converted string
 * @throws Throws an error when the string is undefined or the number is Nan
 */
export function envVarToNumber(string: string | undefined) : number {
  const value : string = checkStringIsUndefined(string);

  const converted : number = parseInt(value);

  if (isNaN(converted)) {
    throw new Error('String is NaN');
  }

  return converted;
}

/**
 * Converts a env variable to a boolean if its value is true or false
 * @param {string | undefined} string - The variable to be converted
 * @return {boolean} - The converted string
 * @throws Throws an error when the string is undefined or not a boolean
 */
export function envVarToBoolean(string: string | undefined) : boolean {
  const value : string = checkStringIsUndefined(string);

  if (value === 'true') {
    return true;
  }

  if (value === 'false') {
    return false;
  }

  throw new Error('String is not a boolean value');
}

/**
 * Throws an error if a string is undefined
 * @param {string | undefined} string - The string that should be checked
 * @return {string}
 */
export function checkStringIsUndefined(string: string | undefined) : string {
  if (string === undefined) {
    throw new Error('String is undefined');
  }

  return string;
}
