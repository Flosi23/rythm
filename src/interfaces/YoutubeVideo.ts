import YoutubeVideoBase from './YoutubeVideoBase';

/**
 * The YoutubeApiResponse describing a youtube video
 * @interface YoutubeVideo
 * @extends YoutubeVideoBase
 */
interface YoutubeVideo extends YoutubeVideoBase {
   /**
   * The ID that YouTube uses to uniquely identify the playlist item.
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

export default YoutubeVideo;
