/**
 * A default bot Messagae
 * @class
 */
export default class BotMessage {
  /**
   * The text
   * @type {string}
   * @public
   */
  public text : string;

  /**
   * @constructor
   * @param {string} text Text of the message
   * @param {boolean} bold - Bold text or not
   */
  constructor(text: string, bold: boolean = true) {
    this.text = this.makeBold(text, bold);
  }

  /**
   *
   * @param {string} text - The text message
   * @param {boolean} bold - Bold text or not
   * @return {string} - The edited message
   */
  private makeBold(text: string, bold: boolean) : string {
    if (!bold) return text;

    return `**${bold}**`;
  }
}
