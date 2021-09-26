import {promisify} from 'util';
import {Duration} from '@js-joda/core';

export const wait = promisify(setTimeout);

/**
 * Splits an array into evenly sized chunks
 * @param {any[]} array - The array to be splitted
 * @param {number} chunkSize - The chunk size
 * @return {any[]}
 */
export function toChunks(array: any[], chunkSize: number) : any[] {
  const result = array.reduce((resultArray: any[], item, index) => {
    const chunkIndex = Math.floor(index/chunkSize);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; // start a new chunk
    }

    resultArray[chunkIndex].push(item);

    return resultArray;
  }, []);

  return result;
}

/**
 * Copied from https://github.com/porridgewithraisins/jam-bot/blob/main/src/Utils.ts
 * @param {number} x
 * @param {number} m
 * @return {number}
 */
export function mod(x: number, m: number) : number {
  return ((x % m) + m) % m;
}

/**
 * Converts the youtube duration string to millis
 * @param {string} duration
 * @return {number}
 */
export function durationToMillis(duration: string) : number {
  return Duration.parse(duration).toMillis();
}

/**
 * Converts a duration to a String showing the minutes and seconds
 * @param {number} millis
 * @return {string}
 */
export function millisToMMSS(millis: number) : string {
  // 1- Convert to seconds:
  let seconds = millis / 1000;
  // 3- Extract minutes:
  const minutes = Math.floor(seconds / 60);
  // 4- Keep only seconds not extracted to minutes:
  seconds = seconds % 60;
  return `${minutes}:${seconds >= 10 ? seconds : `0${seconds}`}`;
}
