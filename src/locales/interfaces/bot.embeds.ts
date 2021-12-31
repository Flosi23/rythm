/**
 * @interface
 * @category locales
 * @subcategory botEmbeds
 */
interface songsInQueue {
  /**
  * Returns a string informing the user how long the queu is
  * @type {Function}
  * @param {number} songs - number of songs in the queue
   */
  (songs: number) : string,
}

/**
 * @interface
 * @category locales
 * @subcategory botEmbeds
 */
interface totalLength {
  /**
  * Returns a string with the information how long the queue is
  * @type {Function}
  * @param {string} length - The total duration of the queue
   */
  (length: string) : string,
}

/**
 * This interface includes all string that are displayed on embeds
 * the bot will send
 * @interface
 * @category locales
 * @subcategory botEmbeds
 */
interface botEmbeds {
  /**
   * @type {string}
   */
  artist: string,
   /**
   * @type {string}
   */
  addedToQueue: string,
   /**
   * @type {string}
   */
  nowPlaying: string,
   /**
   * @type {string}
   */
  queue: string,
   /**
   * @type {string}
   */
  upNext: string,
   /**
   * @type {songsInQueue}
   */
  songsInQueue: songsInQueue,
   /**
   * @type {string}
   */
  loop: string,
   /**
   * @type {string}
   */
  loopQueue: string,
   /**
   * @type {string}
   */
  queueIsEmpty: string,
   /**
   * @type {string}
   */
  page: string,
   /**
   * @type {string}
   */
  previous: string,
   /**
   * @type {string}
   */
  next: string,
   /**
   * @type {string}
   */
  requestedBy: string,
   /**
   * @type {totalLength}
   */
  totalLength: totalLength,
}

export default botEmbeds;
