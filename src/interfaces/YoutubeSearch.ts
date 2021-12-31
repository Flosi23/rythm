import YoutubeVideoBase from './YoutubeVideoBase';

/**
 * The response for an youtube search request
 * @interface YoutubeSearch
 * @extends YoutubeVideoBase
 */
interface YoutubeSearch extends YoutubeVideoBase {
  /**
   * @type {object}
   */
  id: {
    /**
     @type {string}
     The type of the API resource.
     */
    kind: string,
    /**
     @type {string}
     the ID that YouTube uses to uniquely identify a video
     */
    videoId: string,
    /**
     @type {string}
     the ID that YouTube uses to uniquely identify a channel
     */
    channelId: string,
    /**
     * @type {string}
     * the ID that YouTube uses to uniquely identify a playlist
     */
    playlistId: string,
  },
}

export default YoutubeSearch;
