/**
 * The default custom error
 * @class
 */
export default abstract class CustomError {
  /**
   * The error that occured
   * @type {any}
   */
  public error: any;

  /**
   * The error message that should be send to the user
   * @type {string}
   */
  public message: string;

  /**
   * @constructor
   * @param {any} error - The error thrown
   * @param {string} message - The message that should be sent
   */
  constructor(error: any, message: string) {
    this.error = error;
    this.message = message;
  };
}
