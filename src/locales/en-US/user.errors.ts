import userErrors from '../interfaces/user.errors';

/**
 * Errors caused by the user
 */
const userErrors: userErrors = {
  isNotACommand: (command: string) =>`:x: \`${command}\` is not a command`,
  commandNeedsParameter: (command: string) =>
    `:x: The command \`${command}\` needs a parameter`,
  notInVoiceChannel:
    ':x: You have to be in a voice channel in order to run this command',
  positionNotExistant: 'This position does not exist',
  paramIsNotANumber: 'Parameter must be a number',
};

export default userErrors;
