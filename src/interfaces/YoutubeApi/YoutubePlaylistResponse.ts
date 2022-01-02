import YoutubeBaseResponse from './YoutubeBaseResponse';

/**
 * The YoutubeApiResponse for a playlist
 * @interface YoutubePlaylistResponse
 * @extends YoutubeVideoBase
 */
interface YoutubePlaylistResponse extends YoutubeBaseResponse {
   /**
   * The ID that YouTube uses to uniquely identify the playlist.
   * @type {string}
   */
  id: string,
  /**
   * The object contains additional information about the video.
   * @type {object}
   */
  contentDetails: {
    /**
     * The number of vidoes in the playlist
     * @type {number}
     */
    itemCount: number,
  },
}

export default YoutubePlaylistResponse;
