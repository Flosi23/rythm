
import axios, {AxiosError, AxiosInstance, AxiosResponse} from 'axios';

/**
 * @class HttpClient
 * @abstract
 */
export default abstract class HttpClient {
  /**
   * The axios instance
   * @protected
   * @readonly
   */
  protected readonly instance: AxiosInstance;

  /**
   * @constructor
   * @param {string} baseURL
   */
  public constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
    });

    this._initializeResponseInterceptor();
  }

  /**
   * initializes the response intercetpors
   * @private
   */
  private _initializeResponseInterceptor() {
    this.instance.interceptors.response.use(
        this.handleResponse,
        this.handleError,
    );
  };

  /**
   * Handles a succesfull response
   * @param {AxiosResponse} response - The response
   * @return {AxiosResponse}
   */
  protected handleResponse(response: AxiosResponse) : AxiosResponse {
    return response;
  }

  /**
   * Handles an occuring error
   * @param {AxiosError} error - The error that occured
   * @param {AxiosResponse} response - The response
   * @return {Promise<any>} - Return
   */
  protected handleError(error: AxiosError) : Promise<any> {
    return Promise.reject(error);
  }
}

