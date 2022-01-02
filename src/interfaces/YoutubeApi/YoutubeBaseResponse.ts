/**
 * A Youtube Thumbnail
 @interface YoutubeThumbnail
 */
interface YoutubeThumbnail {
  /**
   * The url of the thumbnail
   * @type {string}
   */
  url: string,
  /**
   * @type {number}
   */
  width: number,
  /**
   * @type {number}
   */
  height: number,
}


/**
 * The basic template for an YoutubeApi response
 * @interface YoutubeBaseResponse
 */
interface YoutubeBaseResponse {
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
     * The creation date and time of the resource
     * that the search result identifies.
     * The value is specified in ISO 8601 format.
     * @type {string}
     */
    publishedAt: string,
    /**
     * The value that YouTube uses to uniquely identify
     * the channel that published the resource that the search result
     * identifies.
     * @type {string}
     */
    channelId: string,
    /**
     * The title of the search result.
     * @type {string}
     */
    title: string,
    /**
     * A description of the search result.
     * @type {string}
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
     * The title of the channel that published
     * the resource that the search result identifies.
     * @type {string}
     */
    channelTitle: string,
  }
}

export default YoutubeBaseResponse;
