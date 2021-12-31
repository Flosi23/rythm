import YoutubeThumbnail from './YoutubeThumbnail';

/**
 * The basic template for an YoutubeApi response
 * @interface YoutubeVideoBase
 */
interface YoutubeVideoBase {
  /**
   * the API resource's type. The value will be youtube#searchListResponse.
   * @type {string}
   */
  kind: string,
  /**
   * The Etag of this resource.
   * @type {string}
   */
  etag: string,
  /**
   * The snippet object contains basic details about a search result,
   * such as its title or description.
   * @type {object}
   */
  snippet: {
    /**
     * @type {string}
     * The creation date and time of the resource
     * that the search result identifies.
     * The value is specified in ISO 8601 format.
     */
    publishedAt: string,
    /**
     * @type {string}
     * The value that YouTube uses to uniquely identify
     * the channel that published the resource that the search result
     * identifies.
     */
    channelId: string,
    /**
     * @type {string}
     * The title of the search result.
     */
    title: string,
    /**
     * @type {string}
     * A description of the search result.
     */
    description: string,
    thumbnails: {
        /**
         * The default thumbnail image.
         * @type {YoutubeThumbnail}
         */
        default: YoutubeThumbnail,
        /**
         * A higher resolution version of the thumbnail image
         * @type {YoutubeThumbnail}
         */
        medium: YoutubeThumbnail,
        /**
         * A high resolution version of the thumbnail image
         * @type {YoutubeThumbnail}
         */
        high: YoutubeThumbnail
    }
    /**
     * @type {string}
     * The title of the channel that published
     * the resource that the search result identifies.
     */
    channelTitle: string,
  }
}

export default YoutubeVideoBase;
