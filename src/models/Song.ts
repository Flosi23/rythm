import {Readable} from 'stream';

interface getStream {
  (song: Song) : Promise<Readable>
}
/**
 * A song represents one song to be played
 * @class Song
 */
export default class Song {
  /**
   * The url of the youtube video
   * @type {string}
   * @private
   */
  public url : string;

  /**
   * @type {function}
   * @public
   */
  public getStream : getStream;

  /**
   * @constructor
   * @param {string} url - Url of the youtube video
   * @param {any} getStream - Function to get an audio stream
   */
  constructor(url: string, getStream: any) {
    this.url = url;
    this.getStream = getStream;
  }
}
