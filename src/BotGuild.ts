import {
  VoiceChannel,
  StageChannel,
  Guild,
  ChatInputCommandInteraction,
  TextBasedChannel,
} from 'discord.js';
import {YoutubeAPIError} from './errors/youtube.error';
import locales from './locales/locales';
import MusicPlayer from './musicPlayer/MusicPlayer';
import YoutubeClient from './services/youtube.service';
import Song from './songs/Song';
import {isUrl, isYoutubePlaylistUrl} from './helper/regex';
import Embed from './embeds/Embed';
import QueueEmbed from './embeds/paginated/QueueEmbed';
import Paginator from './embeds/paginated/Paginator';
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
   * @type {TextBasedChannel}
   * @private
   */
  private textChannel: TextBasedChannel;

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
  private deleteSelf: deleteSelf;


  /**
   * @constructor
   * @param {Guild} guild - The Id of the guild
   * @param {TextBasedChannel} textChannel - The text channel of the msg
   * @param {deleteSelf} deleteSelf -
   * Callback to remove this guild from the guilds collection
   */
  constructor(
      guild: Guild,
      textChannel: TextBasedChannel,
      deleteSelf: deleteSelf) {
    this.guild = guild;
    this.textChannel = textChannel;
    this.youtubeClient = new YoutubeClient();
    this.deleteSelf = deleteSelf;
  }

  /**
   * Applies styles to text (e.g makes it bold)
   * @param {string} text - The text to apply to styles to
   * @return {string} - The modified string
   */
  private applyStyles(text: string) : string {
    return `**${text}**`;
  }

  /**
   * Applies styles to the text and replies to the given interaction
   * @param {string} text - text to send
   * @param {ChatInputCommandInteraction} interaction - interaction to reply to
   * @return {void}
   */
  private reply(text: string, interaction: ChatInputCommandInteraction) : void {
    interaction.reply(this.applyStyles(text));
    return;
  }

  /**
   * Applies styles to the text and sends it
   * @param {string} text - The text to be sent
   */
  public sendMessage(text: string) : void {
    this.textChannel.send(this.applyStyles(text));
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
   * Appends a song or playlist to the queue and plays it
   * @param {string} param - The parameter for the command
   * @param {ChatInputCommandInteraction} interaction
   * - The interaction that triggered this command
   * @return {void}
   */
  public async play(
      param: string,
      interaction: ChatInputCommandInteraction)
  : Promise<void> {
    if (interaction.member === null) {
      return this.reply(locales.botErrors.errorWhileExecutingCommand, interaction);
    }

    const member = this.guild.members.cache.get(interaction.member.user.id);

    if (member?.voice.channel == null) {
      return this.reply(locales.userErrors.notInVoiceChannel, interaction);
    }

    const songs: Song[] = await this.getSongs(param, member.voice.channel, interaction);

    if (this.player !== null) {
      this.player.addToQueue(songs);
    }
  }

  /**
   * Appends a new song to the queue right after
   * the currently playing song (will play next)
   * @param {string} param - The parameter for the command
   * @param {ChatInputCommandInteraction} interaction
   * - The interaction that triggered this command
   * @return {void}
   */
  public async forceplay(
      param: string,
      interaction: ChatInputCommandInteraction)
  : Promise<void> {
    if (interaction.member === null) {
      return this.reply(locales.botErrors.errorWhileExecutingCommand, interaction);
    }

    const member = this.guild.members.cache.get(interaction.member.user.id);

    if (member?.voice.channel == null) {
      return this.reply(locales.userErrors.notInVoiceChannel, interaction);
    }

    const songs: Song[] = await this.getSongs(param, member.voice.channel, interaction);

    if (this.player !== null) {
      this.player.addToQueue(songs, 0);
    }
  }

  /**
   * Will loop the currently playing song
   * @param {ChatInputCommandInteraction} interaction
   * - The interaction that triggered the command
   * @return {void}
   */
  public loop(interaction: ChatInputCommandInteraction) : void {
    if (this.player === null) {
      return this.reply(locales.userErrors.wrongUsageTime, interaction);
    }

    this.player.queue.loop = !this.player.queue.loop;

    if (this.player.queue.loop) {
      return this.reply(locales.botMessages.loopEnabled, interaction);
    }

    return this.reply(locales.botMessages.loopDisabled, interaction);
  }

  /**
   * Will loop the queue
   * @param {ChatInputCommandInteraction} interaction
   * - The interaction that triggered the command
   * @return {void}
   */
  public loopQueue(interaction: ChatInputCommandInteraction) : void {
    if (this.player === null) {
      return this.reply(locales.userErrors.wrongUsageTime, interaction);
    }

    this.player.queue.loopQueue = !this.player.queue.loopQueue;

    if (this.player.queue.loopQueue) {
      return this.reply(locales.botMessages.loopQueueEnabled, interaction);
    }

    return this.reply(locales.botMessages.loopQueueDisabled, interaction);
  }

  /**
   * Skips the currently playing song
   * @param {ChatInputCommandInteraction} interaction
   * - The interaction that triggered the command
   * @return {void}
   */
  public skip(interaction: ChatInputCommandInteraction) : void {
    if (this.player === null) {
      return this.reply(locales.userErrors.wrongUsageTime, interaction);
    }

    this.player.playNextSong();
    this.reply(locales.botMessages.songSkipped, interaction);
  }

  /**
   * Skips to the given position in the queue
   * @param {number} position - The position to skip to
   * @param {ChatInputCommandInteraction} interaction
   * - the interaction that triggered the command
   * @return {void}
   */
  public skipTo(position: number, interaction: ChatInputCommandInteraction) : void {
    if (this.player === null) {
      return this.reply(locales.userErrors.wrongUsageTime, interaction);
    }

    const message = this.player.skipTo(position);
    this.reply(message, interaction);
  }

  /**
   * Sends a paginated embed
   * @param {ChatInputCommandInteraction} interaction
   * - The interaction that triggered this command
   * @return {void}
   */
  public queue(interaction: ChatInputCommandInteraction) : void {
    if (this.player === null) {
      return this.reply(locales.userErrors.wrongUsageTime, interaction);
    }

    this.reply(locales.botMessages.sendingQueue, interaction);
    this.sendPaginator(new QueueEmbed(this.player.queue));
  }

  /**
   * Bot will stop playback and quit the voice channell
   * @param {ChatInputCommandInteraction} interaction
   * - The interaction that triggered this command
   * @return {void}
   */
  public quit(interaction: ChatInputCommandInteraction) : void {
    if (this.player === null) {
      return this.reply(locales.userErrors.wrongUsageTime, interaction);
    }

    this.player.quit();
    this.deleteSelf();
    this.reply(locales.botMessages.botLeft, interaction);
  }

  /**
   * Returns a list of songs
   * @param {string} param
   * @param {Voicechannel | StageChannel} voiceChannel
   * @param {ChatInputCommandInteraction} interaction
   */
  private async getSongs(
      param: string,
      voiceChannel: VoiceChannel | StageChannel,
      interaction: ChatInputCommandInteraction,
  ) : Promise<Song[]> {
    if (this.player === null) {
      this.player = new MusicPlayer(
          voiceChannel,
          this.guild,
          this);
    }

    let songs : Song[] = [];

    if (isUrl(param)) {
      songs = await this.handleUrl(param, interaction);
    } else {
      this.reply(locales.botMessages.searchingYoutubeVideo(param), interaction);

      const song = await this.youtubeClient.getVideo(param, interaction.user);

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
   * @param {ChatInputCommandInteraction} interaction
   * - The interaction that triggered the command
   * @return {Song[]} - The songs that should be added to the queue
   */
  private async handleUrl(
      url: string,
      interaction: ChatInputCommandInteraction)
  : Promise<Song[]> {
    if (isYoutubePlaylistUrl(url)) {
      this.reply(locales.botMessages.fetchingPlaylist, interaction);

      const playlist = await this.youtubeClient.getPlaylist(url, interaction.user);

      if (playlist instanceof YoutubeAPIError) {
        this.sendMessage(playlist.message);
        return [];
      }

      this.sendEmbed(
          new YoutubePlaylistEmbed(locales.botEmbeds.addedToQueue, playlist));

      return playlist.songs;
    } else {
      this.reply(locales.userErrors.invalidURL, interaction);
    }

    return [];
  }
}

export default BotGuild;
