import {AxiosError} from 'axios';
import locales from '../locales/locales';
import CustomError from './error';
/**
 * 
 * @category Errors
 * @extends CustomError
 */
export class YoutubeAPIError extends CustomError {
  /**
   * @constructor
   * @param {AxiosError} error - The error that occured
   */
  constructor(error: AxiosError) {
    super(error, '');
    this.message = this.getMessage(error);
  };

  /**
   * Get the right error message
   * @param {AxiosError} error
   * @return {string} - The message
   */
  private getMessage(error: AxiosError) : string {
    if (error.response === undefined) {
      return locales.serviceErrors.youtubeDefaultError;
    }

    if (error.response.status === 400) {
      return locales.serviceErrors.youtubeStatus400;
    }

    if (error.response.status === 403) {
      return locales.serviceErrors.youtubeStatus403;
    }

    if (error.response.status === 404) {
      return locales.serviceErrors.youtubeStatus404;
    }

    if (error.response.status === 500) {
      return locales.serviceErrors.youtubeStatus500;
    }

    return locales.serviceErrors.youtubeDefaultError;
  };
};
