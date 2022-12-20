import colors from '../../config/colors.config';
import YoutubePlaylist from '../interfaces/YoutubeApi/YoutubePlaylist';
import locales from '../locales/locales';
import SongEmbed from './SongEmbed';
/**
 * @category Embeds
 * @extends SongEmbed
 */
class YoutubePlaylistEmbed extends SongEmbed {
  /**
   * @constructor
   * @param {string} title - The title of the embed;
   * @param {YoutubePlaylist} playlist - The playlist
   */
  constructor(title: string, playlist: YoutubePlaylist) {
    super(title);

    this.setTitle(playlist.snippet.title);
    this.setColor(colors.red[600]);
    this.addFields({
      name: locales.botEmbeds.artist,
      value: playlist.snippet.channelTitle},
    );
    this.setThumbnail(playlist.snippet.thumbnails.default.url);
  }
}

export default YoutubePlaylistEmbed;
