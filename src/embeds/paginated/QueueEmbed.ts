import Queue from '../../musicPlayer/Queue';
import locales from '../../locales/locales';
import Song from '../../songs/Song';
import Paginator from './Paginator';
import colors from '../../../config/colors.config';
import Embed from '../Embed';
import {millisToMMSS, toChunks} from '../../helper/util';

/**
 * A paginated embed used to display the queue
 * @category Embeds
 * @subcategory Paginated
 * @extends Paginator
 */
class QueueEmbed extends Paginator {
  /**
   * The number of songs on one embed page
   * @type {number}
   * @private
   */
  private chunkSize: number = 9;

  /**
   * @constructor
   * @param {Queue} queue - The title of the embed;
   */
  constructor(queue: Queue) {
    super();

    const mainPage = this.getBaseEmbed();

    if (queue.nowPlaying !== null) {
      mainPage.addField(
          `__${locales.botEmbeds.nowPlaying}__:`,
          this.createSongLine(queue.nowPlaying));
    }

    if (queue.songs.length === 0) {
      mainPage.setDescription(locales.botEmbeds.queueIsEmpty);
      this.pages.push(mainPage);
      return;
    }

    const songChunks = toChunks(queue.songs, this.chunkSize);

    songChunks.forEach((chunk: Song[], i) => {
      const page = this.createDefaultPage(
          chunk,
          queue,
          i*this.chunkSize,
          i === 0 ? mainPage : null);
      this.pages.push(page);
    });
  }

  /**
   * Creates the default embed with a list of the songs
   * @param {Song[]} songs
   * @param {Queue} queue
   * @param {number} counter
   * @param {Embed} embed
   * @return {Embed}
   */
  private createDefaultPage(
      songs: Song[],
      queue: Queue,
      counter: number,
      embed: Embed | null) : Embed {
    if (embed === null) {
      embed = this.getBaseEmbed();
    }

    let songsString = '';

    for (let i = 0; i < songs.length; i++) {
      const song: Song = songs[i];
      const position = `\`${counter + 1}.\``;
      const line = this.createSongLine(song);

      songsString += `${position} ${line}`;
      counter++;
    }

    embed.addField(
        `__${locales.botEmbeds.upNext}__:`,
        songsString,
    );

    const queueLength = `${locales.botEmbeds.songsInQueue(queue.songs.length)}`;
    const totalLength =
    `${locales.botEmbeds.totalLength(millisToMMSS(queue.getTotalPlayTime()))}`;

    const loop = `${locales.botEmbeds.loop}: ${this.statusEmoji(queue.loop)}`;
    const loopQueue =
    `${locales.botEmbeds.loopQueue}: ${this.statusEmoji(queue.loopQueue)}`;

    embed.setDescription(`**${queueLength} | ${totalLength}** \n
    ${loop} | ${loopQueue} \n`);

    return embed;
  }

  /**
   * Returns a cross or checkmark depending on the value of the status
   * @param {boolean} status
   * @return {string}
  */
  private statusEmoji(status: boolean) : string {
    if (!status) {
      return ':x:';
    }

    return ':white_check_mark:';
  }

  /**
   * Creates a Song line
   * @param {Song} song - The Song
   * @return {string}
   */
  private createSongLine(song: Song) : string {
    const title = `[${song.getSongTitle()}](${song.url})`;
    const duration = millisToMMSS(song.duration);
    const requestor =
      `${locales.botEmbeds.requestedBy}: ${song.requestor.username}`;

    return `${title} | \`${duration} ${requestor}\`\n\n`;
  }


  /**
   * @return {Embed}
   */
  protected getBaseEmbed() : Embed {
    const embed: Embed = super.getBaseEmbed();
    embed.setColor(colors.teal[400]);
    embed.setTitle(locales.botEmbeds.queue);
    return embed;
  }
}

export default QueueEmbed;
