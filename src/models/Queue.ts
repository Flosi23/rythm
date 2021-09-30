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
  public songs: Song[];

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
  public loopQueue: boolean;

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
    this.songs = songs;
    this.nowPlaying = null;
    this.loop = false;
    this.loopQueue = false;
  };

  /**
   * Adds songs to the queue
   * @param {Song[]} songs - The songs that should be added
   * @param {number} index - At which index the songs should be added
   */
  public addToQueue(songs: Song[], index: number) {
    // if (index >= this.songs.length - 1) {
    //   // this.songs = this.songs.concat(songs);
    //   // return;
    //   index = (this.songs.length - 1) < 0 ? 0 : this.songs.length - 1;
    // }
    index = (this.songs.length - 1) < 0 ? 0 : this.songs.length - 1;

    this.songs.splice(index, 0, ...songs);
    return `${this.songs.length} ${index}`;
  }

  /**
   * Removes all elements from 0 to index from the songs array
   * @param {number} index
   */
  public skipTo(index: number) {
    this.songs = this.songs.slice(index);
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

    const next = this.songs.shift();
    if (!next) return undefined;

    if (this.loopQueue) this.songs.push(next);

    this.nowPlaying = next;

    return next;
  }

  /**
   * Calculates and returns the total playtime of the queue
   * in milliseconds
   * @return {number}
   */
  public getTotalPlayTime() : number {
    let duration = 0;
    this.songs.forEach((song) => {
      duration += song.duration;
    });
    return duration;
  }
}
