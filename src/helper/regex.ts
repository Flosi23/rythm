// eslint-disable-next-line max-len
const urlRegex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
// eslint-disable-next-line max-len
const ytPlaylistRegex = /^(https|http):\/\/(?:www\.|music\.)?youtube\.com\/((playlist\?(list=[a-zA-Z0-9_\-]*))|(watch\?(((v=.*)&(list=[a-zA-Z0-9_\-]*))|((list=[a-zA-Z0-9_\-]*)&(v=.*))))).*$/gm;

const findPlaylistIdRegex = /^list=([a-zA-Z0-9_\-]*)$/gm;
/**
 * Checks if a string is a valid url
 * @param {string} string - The string to be tested;
 * @return {boolean}
 */
export function isUrl(string: string) : boolean {
  const result = string.match(urlRegex);
  if (result === null) {
    return false;
  }
  return true;
}

/**
 * Checks if string is a valid youtube playlist url
 * @param {string} url - The string to be tested;
 * @return {boolean}
 */
export function isYoutubePlaylistUrl(url: string) : boolean {
  const result = url.match(ytPlaylistRegex);
  if (result === null) {
    return false;
  }
  return true;
}

/**
 * Extracts the playlist id from a valid youtube playlist url
 * @param {string} url - The youtube url
 * @throws An error if the url is not a valid youtube playlist url
 * @return {string} - The extracted playlist id
 */
export function extractPlaylistId(url: string) : string {
  const test = isYoutubePlaylistUrl(url);

  if (!test) {
    throw new Error('String is not a valid youtube playlist url');
  }

  const match = [...url.matchAll(ytPlaylistRegex)];

  if (match === null) {
    return '';
  }

  const result = match[0];

  let playListId = '';

  result.forEach((ele) => {
    if (ele !== undefined) {
      if (ele.match(findPlaylistIdRegex)) {
        playListId = ele.split('=')[1];
      }
    }
  });

  return playListId;
}
