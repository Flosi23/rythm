interface isNotACommand {
  (command: string) : string
}

interface commandNeedsParameter {
  (command: string) : string
}

interface userErrors {
  isNotACommand: isNotACommand,
  commandNeedsParameter: commandNeedsParameter,
  notInVoiceChannel: string,
}

export default userErrors;
