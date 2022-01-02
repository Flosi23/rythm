import YoutubeBaseResponse from './YoutubeBaseResponse';

/**
 * The basic template for a Youtube Playlist Item returned by the api
 * @interface YoutubePlaylistItemResponse
 * @extends YoutubeVideoBase
 */
interface YoutubePlaylistItemResponse extends YoutubeBaseResponse {
  /**
   * The ID that YouTube uses to uniquely identify the playlist item.
   * @type {string}
   */
  id: string
  /**
   * The object contains additional information about the video.
   * @type {object}
   */
  contentDetails: {
    /**
     * The ID that YouTube uses to uniquely identify a video.
     * @type {string}
     */
    videoId: string,
  }
}

export default YoutubePlaylistItemResponse;
