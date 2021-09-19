import youtubeConfig from '../../config/youtube.config';
import Song from '../models/Song';
import HttpClient from './http.service';
import ytdl from 'ytdl-core-discord';
import {YoutubeAPIError} from '../errors/youtube.error';
import {AxiosError} from 'axios';
import {Readable} from 'stream';

/**
 * @class YoutubeClient
 * @extends HttpClient
 */
export default class YoutubeClient extends HttpClient {
  /**
   * @constructor
   */
  constructor() {
    super(youtubeConfig.BASE_URL);
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
   * Finds and returns the first video that matches the search query
   * @param {string} query - The search query
   */
  public async getVideo(query: string) :
  Promise<Song | YoutubeAPIError> {
    const uri = this.constructUrl(
        'search', `type=video&part=snippet&maxResults=1&q=${query}`,
    );

    try {
      const result = await this.instance.get(uri);

      const url = `https://youtube.com/watch?v=${result.data.items[0].id.videoId}`;

      return new Song(url, this.getStream);
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

  /**
   * Returns a stream for an url
   * @param {Song} song
   * @return {any}
   */
  public getStream(song: Song) : Promise<Readable> {
    /*
    const SID = youtubeConfig.SID;
    const SSID = youtubeConfig.SSID;
    const HSID = youtubeConfig.HSID; */

    return ytdl(song.url, {
      filter: 'audioonly',
    });
  };
};
