import YoutubeBaseResponse from '../interfaces/YoutubeApi/YoutubeBaseResponse';
import YoutubeSongEmbed from '../embeds/YoutubeSongEmbed';
import Song from './Song';
import {AudioResource, createAudioResource} from '@discordjs/voice';
import {User} from 'discord.js';
import {stream} from 'play-dl'; // Individual functions
/**
 * A song represents a youtube song to be played
 * @category Song
 * @extends Song
 */
class YoutubeSong extends Song {
  /**
   * The youtube metadata
   * @type {YoutubeVideoBase | null}
   * @public
   */
  public metadata: YoutubeBaseResponse;

  /**
   * @constructor
   * @param {string} url - Url of the youtube video
   * @param {number} duration - The duration of the Song
   * @param {User} requestor - The user who requested this Song
   * @param {YoutubeVideoBase | null} metadata - Information about the Song
   */
  constructor(
      url: string,
      duration: number, requestor: User, metadata: YoutubeBaseResponse) {
    super(url, duration, requestor);
    this.metadata = metadata;
  }

  /**
   * Returns an Embed with the songs information
   * @param {string} title - The title of the embed
   * @return {SongEmbed}
   */
  public getEmbed(title: string) : YoutubeSongEmbed {
    return new YoutubeSongEmbed(title, this);
  }

  /**
   * Returns the video title
   * @return {string} - The title
   */
  public getSongTitle() : string {
    return this.metadata.snippet.title;
  }

  /**
   * Returns a stream for an url
   * @return {Promise<AudioResource<Song>>}
   */
  public async createAudioResource() : Promise<AudioResource<Song>> {
    // Copied from the @discordjs/voice music-bot example
    // https://github.com/discordjs/voice/tree/main/examples/music-bot

    const source = await stream(this.url);

    const resource : AudioResource<Song> = createAudioResource(source.stream, {
      inputType: source.type,
      metadata: this,
    });

    return resource;
  }
}

export default YoutubeSong;
