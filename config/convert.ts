import ConversionError from '../src/errors/conversion.error';
import {stringToBoolean, stringToNumber} from '../src/helper/convert';

/**
 * Converts a string from an env file to a number
 * @param {string | undefined} string - The variable to be converted
 * @return {number} - The converted string
 * @throws Throws an error when the string is undefined or the number is Nan
 */
export function envVarToNumber(
    string: string | undefined) : number {
  string = checkStringIsNotUndefined(string);

  const result = stringToNumber(string);

  if (result instanceof ConversionError) {
    throw result.error;
  }

  return result;
}

/**
 * Converts a env variable to a boolean if its value is true or false
 * @param {string | undefined} string - The variable to be converted
 * @return {boolean} - The converted string
 * @throws Throws an error when the string is undefined or not a boolean
 */
export function envVarToBoolean(
    string: string | undefined) : boolean {
  string = checkStringIsNotUndefined(string);

  const result = stringToBoolean(string);

  if (result instanceof ConversionError) {
    throw result.error;
  }

  return result;
}

/**
 * Throws an error if a string is undefined
 * @param {string | undefined} string - The string that should be checked
 * @return {string}
 */
export function checkStringIsNotUndefined(string: string | undefined) : string {
  if (string === undefined) {
    throw new Error('String is undefined');
  }

  return string;
}
