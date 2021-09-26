import Embed from './Embed';
/**
 * @class
 */
export default class SongEmbed extends Embed {
  /**
   * @constructor
   * @param {string} title - The title of the embed;
   */
  constructor(title: string) {
    super();
    this.setAuthor(title);
  }
}
