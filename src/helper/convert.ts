import ConversionError from '../errors/conversion.error';

/**
@module Convert
*/

/**
 * Converts a string from an env file to a number
 * @param {string | undefined} string - The variable to be converted
 * @return {number} - The converted string
 * @throws Throws an error when the string is undefined or the number is Nan
 */
export function stringToNumber(
    string: string) : number | ConversionError {
  const converted : number = parseInt(string);

  if (isNaN(converted)) {
    return new ConversionError('NaN');
  }

  return converted;
}

/**
 * Converts a env variable to a boolean if its value is true or false
 * @param {string | undefined} string - The variable to be converted
 * @return {boolean} - The converted string
 * @throws Throws an error when the string is undefined or not a boolean
 */
export function stringToBoolean(
    string: string) : boolean | ConversionError {
  if (string === 'true') {
    return true;
  }

  if (string === 'false') {
    return false;
  }

  return new ConversionError('Not a boolean');
}

