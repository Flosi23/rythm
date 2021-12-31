/**
 * This interface defines messages for all errors caused by the services
 * @interface
 * @category locales
 * @subcategory serviceErrors
 */
interface serviceErrors {
  /**
   * The default error message for every youtube api error
   * @type {string}
   */
  youtubeDefaultError: string,
  /**
   * The error message for a response with a status of 400
   * @type {string}
   */
  youtubeStatus400: string,
  /**
   * The error message for a response with a status of 403
   * @type {string}
   */
  youtubeStatus403: string,
  /**
   * The error message for a response with a status of 404
   * @type {string}
   */
  youtubeStatus404: string,
  /**
   * The error message for a response with a status of 500
   * @type {string}
   */
  youtubeStatus500: string,
};

export default serviceErrors;
