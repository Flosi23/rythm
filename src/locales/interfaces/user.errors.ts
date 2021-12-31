/**
 * @interface
 * @category locales
 * @subcategory userErrors
 */
interface isNotACommand {
  /**
  * Returns a string informing the user, that the command
  * he attempted to use does not exist
  * @type {Function}
  * @param {string} command - The command the user wants to use
   */
  (command: string) : string
}

/**
 * @interface
 * @category locales
 * @subcategory userErrors
 */
interface commandNeedsParameter {
 /**
  * Returns a string informing the user, that
  * this command without a parameter
  * @type {Function}
  * @param {string} command - The command the user wants to use
   */
  (command: string) : string
}

/**
 * All error messages for errors caused by the users (bad input, etc..)
 * @interface
 * @category locales
 * @subcategory userErrors
 */
interface userErrors {
  /**
   * Message to send, when the user entered an invalid command
   * @type {isNotACommand}
   */
  isNotACommand: isNotACommand,
  /**
   * Message to send, when the user used a command that neeeds a parameter
   * without a parameter
   * @type {commandNeedsParameter}
   */
  commandNeedsParameter: commandNeedsParameter,
  /**
   * Message to send, if the user wants to use the bot but
   * is not in a voice Channel
   * @type {string}
   */
  notInVoiceChannel: string,
  /**
   * The message to send if the user wants to skip to a position
   * in the queue that does no exist
   * @type {string}
   */
  positionNotExistant: string,
  /**
   * Message to send if the user did not give a number as parameter
   * for a command that needs a number as parameter
   */
  paramIsNotANumber: string,
}

export default userErrors;
