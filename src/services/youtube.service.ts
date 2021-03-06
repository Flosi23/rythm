import youtubeConfig from '../../config/youtube.config';
import Song from '../songs/Song';
import HttpClient from './http.service';
import {YoutubeAPIError} from '../errors/youtube.error';
import {AxiosError} from 'axios';

import {extractPlaylistId} from '../helper/regex';
import YoutubePlaylistItemResponse from
  '../interfaces/YoutubeApi/YoutubePlaylistItemResponse';
import YoutubeSearchResponse from
  '../interfaces/YoutubeApi/YoutubeSearchResponse';
import YoutubeVideoResponse from
  '../interfaces/YoutubeApi/YoutubeVideoResponse';
import YoutubeSong from '../songs/YoutubeSong';
import {User} from 'discord.js';
import {durationToMillis} from '../helper/util';
import YoutubePlaylist from '../interfaces/YoutubeApi/YoutubePlaylist';
// import {Readable} from 'stream';

/**
 * @category Services
 * @extends HttpClient
 */
class YoutubeClient extends HttpClient {
  /**
   * @constructor
   */
  constructor() {
    super(youtubeConfig.API_BASE_URL);
  }

  /**
 * Construct a valid request url
 * @private
 * @param {string} endpoint - The api endpoint the request should be send to
 * @param {string} params - Additional parameters needed for the request
 * @return {string} - Returns the complete request url
 */
  private constructUrl(endpoint: string, params: string) : string {
    return `/${endpoint}?key=${youtubeConfig.API_KEY}&${params}`;
  };

  /**
 * Takes a videoId and returns the url to the video
 * @private
 * @param {string} videoId
 * @return {string}
 */
  private getVideoUrl(videoId: string) : string {
    return `${youtubeConfig.YT_VIDEO_BASE_URL}${videoId}`;
  }

  /**
   * Fetches information for vidoes
   * @private
   * @param {string[]} videoIds - The ids of the videos
   * @return {Promise<YoutubeVideoResponse[] | YoutubeAPIError>}
   */
  private async getVideoInformation(
      videoIds: string[]) : Promise<YoutubeVideoResponse[] | YoutubeAPIError> {
    const ids = videoIds.toString();

    const requestUrl = this.constructUrl(
        'videos', `part=contentDetails&maxResults=50&id=${ids}`,
    );

    try {
      const result = await this.instance.get(requestUrl);

      const videos: YoutubeVideoResponse[] = result.data.items;

      return videos;
    } catch (error: any) {
      if (error instanceof YoutubeAPIError) {
        return error;
      }

      throw error;
    }
  }
  /**
   * Finds and returns the first video that matches the search query
   * @public
   * @param {string} query - The search query
   * @param {User} requestor - The user who requested the song
   * @return {Promise<Song | YoutubeAPIError>}
   */
  public async getVideo(
      query: string, requestor: User) : Promise<Song | YoutubeAPIError> {
    const requestUrl = this.constructUrl(
        'search', `type=video&part=snippet&maxResults=1&q=${query}`,
    );

    try {
      const result = await this.instance.get(requestUrl);

      const video: YoutubeSearchResponse = result.data.items[0];

      const videoInfo = await this.getVideoInformation([video.id.videoId]);

      if (videoInfo instanceof YoutubeAPIError) {
        return videoInfo;
      }

      const duration = durationToMillis(
          videoInfo[0].contentDetails.duration);

      const songUrl = this.getVideoUrl(video.id.videoId);

      return new YoutubeSong(songUrl, duration, requestor, video);
    } catch (error: any) {
      if (error instanceof YoutubeAPIError) {
        return error;
      }

      throw error;
    }
  }

  /**
   * Finds and returns a playlist
   * @public
   * @param {string} url - The playlist url;
   * @param {User} requestor - The user who requested the song
   * @return {Promise<Song[] | YoutubeAPIError>}
   */
  public async getPlaylist(url: string, requestor: User)
    : Promise<YoutubePlaylist | YoutubeAPIError> {
    const playlistId : string = extractPlaylistId(url);

    const requestUrl = this.constructUrl('playlists',
        `&part=snippet,id&id=${playlistId}&maxResults=1`,
    );

    try {
      const result = await this.instance.get(requestUrl);

      const playlist : YoutubePlaylist = result.data.items[0];

      const songs = await this.getPlaylistItems(playlistId, requestor);

      if (songs instanceof YoutubeAPIError) {
        return songs;
      }

      playlist.songs = songs;
      return playlist;
    } catch (error: any) {
      if (error instanceof YoutubeAPIError) {
        return error;
      }

      throw error;
    }
  }

  /**
   * Finds and returns the songs in a playlist
   * If the playlist has more than 50 entries it will call itself again with
   * the nextPageToken from the previous request.
   * @public
   * @param {string} playlistId - The id of the playlist;
   * @param {User} requestor - The user who requested the song
   * @param {string} pageToken - The pageToken that specifies a specific page
   * in the youtube API result
   * @return {Promise<Song[] | YoutubeAPIError>}
   */
  private async getPlaylistItems(
      playlistId: string, requestor: User, pageToken: string | null = null)
      : Promise<YoutubeSong[] | YoutubeAPIError> {
    const requestUrl = this.constructUrl(
        'playlistItems',
        `playlistId=${playlistId}&maxResults=50&part=snippet,\
        contentDetails${pageToken == null ? '' : `&pageToken=${pageToken}`}`,
    );

    try {
      const data = await (await this.instance.get(requestUrl)).data;

      let songs : YoutubeSong[] = [];

      const videos = await this.getVideoInformation(
          data.items.map((ele: YoutubePlaylistItemResponse) => {
            return ele.contentDetails.videoId;
          }),
      );

      if (videos instanceof YoutubeAPIError) {
        return videos;
      }

      data.items.forEach((item: YoutubePlaylistItemResponse, i: number) => {
        const songUrl = this.getVideoUrl(item.contentDetails.videoId);

        const duration = durationToMillis(
            videos[i].contentDetails.duration);

        songs.push(new YoutubeSong(songUrl, duration, requestor, item));
      });

      if (data.nextPageToken != null) {
        // eslint-disable-next-line max-len
        const nextPageSongs = await this.getPlaylistItems(playlistId, requestor, data.nextPageToken);

        if (nextPageSongs instanceof YoutubeAPIError) {
          return songs;
        }

        songs = songs.concat(nextPageSongs);
      }

      return songs;
    } catch (error: any) {
      if (error instanceof YoutubeAPIError) {
        return error;
      }

      throw error;
    }
  }

  /**
   * Handles an occuring error
   * @override
   * @protected
   * @param {AxiosError} error - The error that occured
   * @return {Promise<any>} - Return
   */
  protected handleError(error: AxiosError) : Promise<any> {
    const youtubeError = new YoutubeAPIError(error);

    return Promise.reject(youtubeError);
  }
};

export default YoutubeClient;
