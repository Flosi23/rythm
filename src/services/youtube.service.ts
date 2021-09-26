import youtubeConfig from '../../config/youtube.config';
import Song from '../models/Song';
import HttpClient from './http.service';
import {YoutubeAPIError} from '../errors/youtube.error';
import {AxiosError} from 'axios';
// import ytdl from 'ytdl-core-discord';
import {extractPlaylistId} from '../helper/regex';
import {YoutubePlaylistItem, YoutubeSearch, YoutubeVideo} from '../../types';
import YoutubeVideoSong from '../models/YoutubeVideoSong';
import {User} from 'discord.js';
import {durationToMillis} from '../helper/util';
// import {Readable} from 'stream';

/**
 * @class YoutubeClient
 * @extends HttpClient
 */
export default class YoutubeClient extends HttpClient {
  /**
   * @constructor
   */
  constructor() {
    super(youtubeConfig.API_BASE_URL);
  }

  /**
 * Construct a valid request url
 * @param {string} endpoint - The api endpoint the request should be send to
 * @param {string} params - Additional parameters needed for the request
 * @return {string} - Returns the complete request url
 */
  private constructUrl(endpoint: string, params: string) : string {
    return `/${endpoint}?key=${youtubeConfig.API_KEY}&${params}`;
  };

  /**
 * Takes a videoId and returns the url to the video
 * @param {string} videoId
 * @return {string}
 */
  private getVideoUrl(videoId: string) : string {
    return `${youtubeConfig.YT_VIDEO_BASE_URL}${videoId}`;
  }

  /**
   * Fetches information for vidoes
   * @param {string[]} videoIds - The ids of the videos
   * @return {Promise<YoutubeVideo[] | YoutubeAPIError>}
   */
  private async getVideoInformation(
      videoIds: string[]) : Promise<YoutubeVideo[] | YoutubeAPIError> {
    const ids = videoIds.toString();

    const requestUrl = this.constructUrl(
        'videos', `part=contentDetails&maxResults=50&id=${ids}`,
    );

    try {
      const result = await this.instance.get(requestUrl);

      const videos: YoutubeVideo[] = result.data.items;

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

      const video: YoutubeSearch = result.data.items[0];

      const videoInfo = await this.getVideoInformation([video.id.videoId]);

      if (videoInfo instanceof YoutubeAPIError) {
        return videoInfo;
      }

      const duration = durationToMillis(
          videoInfo[0].contentDetails.duration);

      const songUrl = this.getVideoUrl(video.id.videoId);

      return new YoutubeVideoSong(songUrl, duration, requestor, video);
    } catch (error: any) {
      if (error instanceof YoutubeAPIError) {
        return error;
      }

      throw error;
    }
  }

  /**
   * Finds and returns the songs in a playlist
   * @param {string} url - The playlist url;
   * @param {User} requestor - The user who requested the song
   * @return {Promise<Song[] | YoutubeAPIError>}
   */
  public async getPlaylist(
      url: string, requestor: User) : Promise<Song[] | YoutubeAPIError> {
    const playlistId : string = extractPlaylistId(url);

    const requestUrl = this.constructUrl(
        'playlistItems', `playlistId=${playlistId}&maxResults=50&part=snippet,\
        contentDetails`,
    );

    try {
      const result = await this.instance.get(requestUrl);

      const songs : Song[] = [];

      const videos = await this.getVideoInformation(
          result.data.items.map((ele: YoutubePlaylistItem) => {
            return ele.contentDetails.videoId;
          }),
      );

      if (videos instanceof YoutubeAPIError) {
        return videos;
      }

      result.data.items.forEach((item: YoutubePlaylistItem, i: number) => {
        const songUrl = this.getVideoUrl(item.contentDetails.videoId);

        const duration = durationToMillis(
            videos[i].contentDetails.duration);

        songs.push(new YoutubeVideoSong(songUrl, duration, requestor, item));
      });

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
   * @param {AxiosError} error - The error that occured
   * @return {Promise<any>} - Return
   */
  protected handleError(error: AxiosError) : Promise<any> {
    const youtubeError = new YoutubeAPIError(error);

    return Promise.reject(youtubeError);
  }
};
