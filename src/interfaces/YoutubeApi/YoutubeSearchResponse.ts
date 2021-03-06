import YoutubeBaseResponse from './YoutubeBaseResponse';

/**
 * The response for an youtube search request
 * @interface YoutubeSearchResponse
 * @extends YoutubeVideoBase
 */
interface YoutubeSearchResponse extends YoutubeBaseResponse {
  /**
   * @type {object}
   */
  id: {
    /**
     * The type of the API resource.
     @type {string}
     */
    kind: string,
    /**
     * the ID that YouTube uses to uniquely identify a video
     @type {string}
     */
    videoId: string,
    /**
     * the ID that YouTube uses to uniquely identify a channel
     @type {string}
     */
    channelId: string,
    /**
     * the ID that YouTube uses to uniquely identify a playlist
     * @type {string}
     */
    playlistId: string,
  },
}

export default YoutubeSearchResponse;
