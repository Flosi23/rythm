import YoutubeBaseResponse from '../interfaces/YoutubeApi/YoutubeBaseResponse';
import YoutubeSongEmbed from '../embeds/YoutubeSongEmbed';
import Song from './Song';
import {raw as youtubedl} from 'youtube-dl-exec';
import {AudioResource, createAudioResource, demuxProbe} from '@discordjs/voice';
import {User} from 'discord.js';
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

    return new Promise((resolve, reject) => {
      const process = youtubedl(
          this.url,
          {
            o: '-',
            q: '',
            f: 'bestaudio[ext=webm+acodec=opus+asr=48000]/bestaudio',
            r: '100K',
          },
          {stdio: ['ignore', 'pipe', 'ignore']},
      );
      if (!process.stdout) {
        reject(new Error('No stdout'));
        return;
      }
      const stream = process.stdout;
      const onError = (error: Error) => {
        if (!process.killed) process.kill();
        stream.resume();
        reject(error);
      };
      process
          .once('spawn', () => {
            demuxProbe(stream)
                .then((probe) => resolve(createAudioResource(
                    probe.stream, {metadata: this, inputType: probe.type})))
                .catch(onError);
          })
          .catch(onError);
    });
  };
}

export default YoutubeSong;
