/**
 * @interface
 * @category locales
 * @subcategory botMessage
 */
interface searchingYoutubeVideo {
  /**
  * Returns a string confirming that the bot is searching a video
  * @type {Function}
  * @param {string} query - What the user is searching for
   */
  (query: string) : string
}

/**
 * @interface
 * @category locales
 * @subcategory botMessage
 */
interface skippedTo {
  /**
  * Returns a string confirming that the bot skippedTo to the given position
  * @type {Function}
  * @param {number} position - The position in the queue the bot skipped to
   */
  (position: number) : string
}

/**
 * This interface contains all non error messages the bot will send
 * @interface
 * @category locales
 * @subcategory botMessage
 */
interface botMessages {
   /**
   * @type {searchingYoutubeVideo}
   */
  searchingYoutubeVideo:searchingYoutubeVideo,
   /**
   * @type {string}
   */
  botLeft: string,
   /**
   * @type {string}
   */
  songSkipped: string,
   /**
   * @type {string}
   */
  loopEnabled: string,
   /**
   * @type {string}
   */
  loopQueueEnabled: string,
   /**
   * @type {string}
   */
  loopDisabled: string,
   /**
   * @type {string}
   */
  loopQueueDisabled: string,
   /**
   * @type {skippedTo}
   */
  skippedTo: skippedTo,
}

export default botMessages;
