import {AudioResource} from '@discordjs/voice';
import {User} from 'discord.js';
import SongEmbed from '../embeds/SongEmbed';

/**
 * A song represents one song to be played
 * @class Song
 * @abstract
 */
export default abstract class Song {
  /**
   * The url of the streaming source
   * @type {string}
   * @private
   */
  public url : string;

  /**
   * The duration of the song
   * @type {string}
   * @public
   */
  public duration: number;

  /**
   * @type {User}
   * @public
   */
  public requestor: User;

  /**
   * @constructor
   * @param {string} url - Url of the youtube video
   * @param {number} duration - The duration in milliseconds
   * @param {User} requestor - The user who requested the Song
   */
  constructor(url: string, duration: number, requestor: User) {
    this.url = url;
    this.duration = duration;
    this.requestor = requestor;
  }

  /**
   * Returns an embed with the songs information
   * @param {string} title - Title of the embed
   * @return {SongEmbed}
   * @public
   * @abstract
   */
  public abstract getEmbed(title: string) : SongEmbed;

  /**
   * Returns the songs title
   * @type {string}
   * @return {string}
   * @public
   * @abstract
   */
  public abstract getSongTitle() : string;

  /**
   * Function to create an AudioResource
   * @type {createAudioResource}
   * @return {Promise<AudioResource<Song>>}
   * @abstract
   * @public
   */
  public abstract createAudioResource()
  : Promise<AudioResource<Song>>;
}
