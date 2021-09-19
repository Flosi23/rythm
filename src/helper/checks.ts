import locales from '../locales/locales';

/**
 * Checks if a command has a parameter and returns an error if not
 * @param {string} command - The command
 * @param {string | null} param - The parameters of the command
 * @param {any} sendMessage - Callback function to send a message
 * @return {boolean}
 */
export function commandHasParameter(
    command: string,
    param: string | null,
    sendMessage: any) : string {
  if (param === null) {
    sendMessage(locales.userErrors.commandNeedsParameter(command));
    return '';
  }

  return param;
}
