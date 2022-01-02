import {
  TextChannel,
  Message,
  VoiceChannel,
  StageChannel,
  Guild} from 'discord.js';
import {YoutubeAPIError} from './errors/youtube.error';
import locales from './locales/locales';
import MusicPlayer from './musicPlayer/MusicPlayer';
import YoutubeClient from './services/youtube.service';
import Song from './songs/Song';
import {isUrl, isYoutubePlaylistUrl} from './helper/regex';
import Embed from './embeds/Embed';
import QueueEmbed from './embeds/paginated/QueueEmbed';
import Paginator from './embeds/paginated/Paginator';
import {stringToNumber} from './helper/convert';
import ConversionError from './errors/conversion.error';
import YoutubePlaylistEmbed from './embeds/YoutubePlaylistEmbed';

interface deleteSelf {
  (): boolean
}

/**
 * A discord guild
 * @class BotGuild
 */
class BotGuild {
  /**
   * The guild
   * @type {Guild}
   * @private
   */
  public guild: Guild;

  /**
   * Text channel to write messages in
   * @type {TextChannel}
   * @private
   */
  private textChannel: TextChannel;

  /**
   * The client for the youtube api
   * @type {YoutubeClient}
   * @private
   */
  private youtubeClient: YoutubeClient;


  /**
   * The music player
   * @type {MusicPlayer}
   * @private
   */
  private player: MusicPlayer | null = null;

  /**
   * Callback-Function to remove this guild from the guilds collection
   * @type {deleteSelf}
   * @private
   */
  private deleteSelf: deleteSelf


  /**
   * @constructor
   * @param {Guild} guild - The Id of the guild
   * @param {TextChannel} textChannel - The text channel of the msg
   * @param {deleteSelf} deleteSelf -
   * Callback to remove this guild from the guilds collection
   */
  constructor(
      guild: Guild,
      textChannel: TextChannel,
      deleteSelf: deleteSelf) {
    this.guild = guild;
    this.textChannel = textChannel;
    this.youtubeClient = new YoutubeClient();
    this.deleteSelf = deleteSelf;
  }

  /**
   * Makes the text bold and sends it
   * @param {string} text - The text to be sent
   */
  public sendMessage(text: string) : void {
    this.textChannel.send(`**${text}**`);
  }

  /**
   * Sends an embed
   * @param {Embed} embed
   */
  public sendEmbed(embed: Embed) : void {
    this.textChannel.send({embeds: [embed]});
  }

  /**
   * Sends an embed with several pages
   * @param {Paginator} paginator
   */
  public sendPaginator(paginator: Paginator) : void {
    paginator.send(this.textChannel);
  }

  /**
   * Handle an incoming command
   * @param {string} command - The command
   * @param {string} param - Parameter for the command
   * @param {Message} msg - The msg object
   * @return {void}
   */
  public handleCommand(
      command: string,
      param: string | null,
      msg: Message,
  ) : void {
    if (command === 'p' || command === 'play') {
      if (msg.member === null || msg.guild === null) {
        return this.sendMessage(locales.botErrors.errorWhileExecutingCommand);
      }

      if (param === null) {
        return this.sendMessage(
            locales.userErrors.commandNeedsParameter(command));
      }

      if (msg.member.voice.channel === null) {
        return this.sendMessage(locales.userErrors.notInVoiceChannel);
      }

      this.play(param, msg.member.voice.channel, msg);
      return;
    }

    if (command === 'fp' || command === 'forceplay') {
      if (msg.member === null || msg.guild === null) {
        return this.sendMessage(locales.botErrors.errorWhileExecutingCommand);
      }

      if (param === null) {
        return this.sendMessage(
            locales.userErrors.commandNeedsParameter(command));
      }

      if (msg.member.voice.channel === null) {
        return this.sendMessage(locales.userErrors.notInVoiceChannel);
      }

      this.forcePlay(param, msg.member.voice.channel, msg);
      return;
    }

    if (command === 'loop') {
      if (this.player === null) return;

      this.player.queue.loop = !this.player.queue.loop;

      if (this.player.queue.loop) {
        this.sendMessage(
            `:arrows_counterclockwise: ${locales.botMessages.loopEnabled}`);
      } else {
        this.sendMessage(`:x: ${locales.botMessages.loopDisabled}`);
      }

      return;
    }

    if (command === 'loopq' || command === 'loopqueue') {
      if (this.player === null) return;

      this.player.queue.loopQueue = !this.player.queue.loopQueue;

      if (this.player.queue.loopQueue) {
        this.sendMessage(
            // eslint-disable-next-line max-len
            `:arrows_counterclockwise: ${locales.botMessages.loopQueueEnabled}`);
      } else {
        this.sendMessage(`:x: ${locales.botMessages.loopQueueDisabled}`);
      }

      return;
    }

    if (command === 'quit' || command === 'leave') {
      if (this.player === null) return;

      this.player.quit();
      this.deleteSelf();
      this.sendMessage(locales.botMessages.botLeft);
      return;
    }

    if (command === 'skip' || command === 'fs') {
      if (this.player === null) return;

      this.player.playNextSong();
      this.sendMessage(locales.botMessages.songSkipped);
      return;
    }

    if (command === 'skipto') {
      if (this.player === null) return;

      if (param === null) {
        return this.sendMessage(
            locales.userErrors.commandNeedsParameter(command));
      }

      const convert = stringToNumber(param);

      if (convert instanceof ConversionError) {
        this.sendMessage(convert.message);
        return;
      }

      const message = this.player.skipTo(convert);
      this.sendMessage(message);
      return;
    }

    if (command === 'q' || command === 'queue') {
      if (this.player === null) {
        return;
      }

      this.sendPaginator(new QueueEmbed(this.player.queue));
      return;
    }

    this.sendMessage(locales.userErrors.isNotACommand(command));
  }

  /**
   * Adds a new song to the queue
   * @param {string} param - Command parameter
   * @param {VoiceChannel | StageChannel} voiceChannel - Original message
   * @param {Message} msg - The original message
   * @return {Promise<void>}
   */
  private async forcePlay(
      param: string,
      voiceChannel: VoiceChannel | StageChannel,
      msg: Message,
  ) : Promise<void> {
    const songs: Song[] = await this.getSongs(param, voiceChannel, msg);

    if (this.player !== null) {
      this.player.addToQueue(songs, 0);
    }
  };

  /**
   * Adds a new song to the queue
   * @param {string} param - Command parameter
   * @param {VoiceChannel | StageChannel} voiceChannel - Original message
   * @param {Message} msg - The original message
   * @return {Promise<void>}
   */
  private async play(
      param: string,
      voiceChannel: VoiceChannel | StageChannel,
      msg: Message,
  ) : Promise<void> {
    const songs: Song[] = await this.getSongs(param, voiceChannel, msg);

    if (this.player !== null) {
      this.player.addToQueue(songs);
    }
  };


  /**
   * Returns a list of songs
   * @param {string} param
   * @param {Voicechannel | StageChannel} voiceChannel
   * @param {Message} msg
   */
  private async getSongs(
      param: string,
      voiceChannel: VoiceChannel | StageChannel,
      msg: Message,
  ) : Promise<Song[]> {
    if (this.player === null) {
      this.player = new MusicPlayer(
          voiceChannel,
          this.guild,
          this);
    }

    // regex matches every URL
    // eslint-disable-next-line max-len

    let songs : Song[] = [];

    if (isUrl(param)) {
      songs = await this.handleUrl(param, msg);
    } else {
      this.sendMessage(locales.botMessages.searchingYoutubeVideo(param));

      const song = await this.youtubeClient.getVideo(param, msg.author);

      if (song instanceof YoutubeAPIError) {
        this.sendMessage(song.message);
        return [];
      }

      this.sendEmbed(song.getEmbed(locales.botEmbeds.addedToQueue));

      songs = [song];
    }

    return songs;
  }

  /**
   *
   * @param {string} url
   * @param {Message} msg - The original message
   * @return {Song[]} - The songs that should be added to the queue
   */
  private async handleUrl(url: string, msg: Message) : Promise<Song[]> {
    if (isYoutubePlaylistUrl(url)) {
      this.sendMessage(locales.botMessages.fetchingPlaylist);

      const playlist = await this.youtubeClient.getPlaylist(url, msg.author);

      if (playlist instanceof YoutubeAPIError) {
        this.sendMessage(playlist.message);
        return [];
      }

      this.sendEmbed(
          new YoutubePlaylistEmbed(locales.botEmbeds.addedToQueue, playlist));

      return playlist.songs;
    }

    return [];
  }
}

export default BotGuild;
