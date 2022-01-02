import YoutubeBaseResponse from './YoutubeBaseResponse';

/**
 * The YoutubeApiResponse describing a youtube video
 * @interface YoutubeVideoResponse
 * @extends YoutubeBaseResponse
 */
interface YoutubeVideoResponse extends YoutubeBaseResponse {
   /**
   * The ID that YouTube uses to uniquely identify the video.
   * @type {string}
   */
  id: string,
  /**
   * The object contains additional information about the video.
   * @type {object}
   */
  contentDetails: {
    /**
     * The length of the video. The property value is an ISO 8601 duration.
     * @type {string}
     */
    duration: string,
  },
}

export default YoutubeVideoResponse;
