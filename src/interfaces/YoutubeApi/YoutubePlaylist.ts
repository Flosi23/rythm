import YoutubeSong from '../../songs/YoutubeSong';
import YoutubePlaylistResponse from './YoutubePlaylistResponse';

/**
 * Represents a youtube playlist
 * @interface
 */
interface YoutubePlaylist extends YoutubePlaylistResponse{
  /**
   * All the songs in this playlist
   * @type {YoutubeSong[]}
   */
  songs: YoutubeSong[],
}

export default YoutubePlaylist;
