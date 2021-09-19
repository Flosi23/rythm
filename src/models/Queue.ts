import Song from './Song';

/**
 * A queue represents all songs to be played by a guild
 * @class Queue
 */
export default class Queue {
  /**
   * @type {Array<Song>}
   * @private
   */
  private queue: Song[];

  /**
   * Determines whether the currently playing song should be looped or not
   * @type {boolean}
   * @private
   */
  public loop : boolean;

  /**
   * Determines whether the queue should be looped or not
   * @type {boolean}
   * @private
   */
  public loopeQueue: boolean;

  /**
   * The currently playing song
   * @type {Song}
   * @private
   */
  public nowPlaying: Song | null;

  /**
   * @constructor
   * @param {Array<Song>} songs - An array of songs, can also be empty
   */
  constructor(songs: Song[]) {
    this.queue = songs;
    this.nowPlaying = null;
    this.loop = false;
    this.loopeQueue = false;
  };

  /**
   * Adds songs to the queue
   * @param {Song[]} songs - The songs that should be added
   */
  public addToQueue(songs: Song[]) {
    this.queue = this.queue.concat(songs);
  }

  /**
   * Returns the song that should be played next or undefined if the
   * queue is empty
   * @return {Song} - The song that should be played next
   */
  public getNextSong() : Song | undefined {
    if (this.nowPlaying !== null && this.loop === true) {
      return this.nowPlaying;
    }

    const next = this.queue.shift();
    if (!next) return undefined;

    if (this.loopeQueue) this.queue.push(next);

    this.nowPlaying = next;

    return next;
  }
}
