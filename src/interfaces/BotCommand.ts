/**
  @interface BotCommand
 */
interface BotCommand {
  /**
   * The command
   * @type {string}
   */
  command: string,
  /**
   * Input from the uses
   * @type {string | null}
   */
  param: string | null,
}

export default BotCommand;
