
import axios, {AxiosError, AxiosInstance, AxiosResponse} from 'axios';

/**
 * @category Services
 * @abstract
 */
abstract class HttpClient {
  /**
   * The axios instance
   * @protected
   * @readonly
   */
  protected readonly instance: AxiosInstance;

  /**
   * @constructor
   * @param {string} baseURL - The baseUrl of the api
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
   * @protected
   * @param {AxiosResponse} response - The response
   * @return {AxiosResponse}
   */
  protected handleResponse(response: AxiosResponse) : AxiosResponse {
    return response;
  }

  /**
   * Handles an occuring error
   * @protected
   * @param {AxiosError} error - The error that occured
   * @param {AxiosResponse} response - The response
   * @return {Promise<any>} - Return
   */
  protected handleError(error: AxiosError) : Promise<any> {
    return Promise.reject(error);
  }
}

export default HttpClient;
