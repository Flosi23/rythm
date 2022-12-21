import userErrors from '../interfaces/user.errors';

const userErrors: userErrors = {
  isNotACommand: (command: string) =>`:x: \`${command}\` is not a command`,
  commandNeedsParameter: (command: string) =>
    `:x: The command \`${command}\` needs a parameter`,
  notInVoiceChannel:
    ':x: You have to be in a voice channel in order to run this command',
  positionNotExistant: ':x: This position does not exist',
  paramIsNotANumber: ':x: Parameter must be a number',
  invalidURL: ':x: Invalid URL',
  wrongUsageTime: ':x: You cannot use that command right now',
};

export default userErrors;
