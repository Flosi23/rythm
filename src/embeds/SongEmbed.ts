import Embed from './Embed';
/**
 * @category Embeds
 * @extends Embed
 */
class SongEmbed extends Embed {
  /**
   * @constructor
   * @param {string} title - The title of the embed;
   */
  constructor(title: string) {
    super();
    this.setAuthor(title);
  }
}

export default SongEmbed;
