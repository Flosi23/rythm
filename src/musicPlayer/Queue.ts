import Song from '../songs/Song';
import SpinLock from './SpinLock';

/**
 * A queue represents all songs to be played by a guild
 * @category MusicPlayer
 */
class Queue {
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
   * A SpinLock to avoid race conditions
   * @type {SpinLock}
   * @private
   */
  private spinLock: SpinLock;

  /**
   * @constructor
   * @param {Array<Song>} songs - An array of songs, can also be empty
   */
  constructor(songs: Song[]) {
    this.songs = songs;
    this.nowPlaying = null;
    this.loop = false;
    this.loopQueue = false;
    this.spinLock = new SpinLock();
  };

  /**
   * Adds songs to the queue
   * @param {Song[]} songs - The songs that should be added
   * @param {number} index - At which index the songs should be added
   */
  public addToQueue(songs: Song[], index: number) {
    this.spinLock.lock();

    this.songs.splice((index <= 0) ? 0 : index, 0, ...songs);

    this.spinLock.unlock();
  }

  /**
   * Removes all elements from 0 to index from the songs array
   * @param {number} index
   */
  public skipTo(index: number) {
    this.spinLock.lock();

    this.songs = this.songs.slice(index);

    this.spinLock.unlock();
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

    this.spinLock.lock();

    const next = this.songs.shift();

    if (!next) {
      this.nowPlaying = null;

      this.spinLock.unlock();

      return undefined;
    }

    if (this.loopQueue) {
      this.songs.push(next);
    }

    this.spinLock.unlock();

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

    this.spinLock.lock();

    this.songs.forEach((song) => {
      duration += song.duration;
    });

    this.spinLock.unlock();

    return duration;
  }
}

export default Queue;
