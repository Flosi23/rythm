import colors from '../../config/colors.config';
import locales from '../locales/locales';
import SongEmbed from './SongEmbed';
import YoutubeSong from '../songs/YoutubeSong';
/**
 * 
 * @category Embeds
 * @extends SongEmbed
 */
class YoutubeSongEmbed extends SongEmbed {
  /**
   * @constructor
   * @param {string} title - The title of the embed;
   * @param {YoutubeSong} song - The song
   */
  constructor(title: string, song: YoutubeSong) {
    super(title);

    if (song.metadata === null) {
      return;
    }

    this.setTitle(song.metadata.snippet.title);
    this.setColor(colors.red[600]);
    this.setURL(song.url);
    this.addField(
        locales.botEmbeds.artist,
        song.metadata.snippet.channelTitle);
    this.setThumbnail(song.metadata.snippet.thumbnails.default.url);
  }
}

export default YoutubeSongEmbed;
