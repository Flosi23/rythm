import CustomError from './error';
import locales from '../locales/locales';
/**
 * 
 * @category Errors
 * @extends CustomError
 */
class ConversionError extends CustomError {
  /**
   * @constructor
   * @param {string} errorMessage - The error that occured
   */
  constructor(errorMessage: string) {
    super(new Error(errorMessage), '');
    this.message = this.getMessage(errorMessage);
  };

  /**
   * @param {string} message
   * @return {string}
   */
  private getMessage(message: string) : string {
    if (message === 'NaN') {
      return `:x: ${locales.userErrors.paramIsNotANumber}`;
    }

    return `:x: ${locales.botErrors.conversionErrorOccured}`;
  }
};

export default ConversionError;
