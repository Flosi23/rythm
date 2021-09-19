import {
  TextChannel,
  Message,
  VoiceChannel,
  StageChannel,
  Guild} from 'discord.js';
import {YoutubeAPIError} from '../errors/youtube.error';
import locales from '../locales/locales';
import MusicPlayer from './MusicPlayer';
import YoutubeClient from '../services/youtube.service';

interface deleteSelf{
  (): boolean
}

/**
 * A discord guild
 * @class Guild
 */
export default class BotGuild {
  /**
   * The guild
   * @type {Guild}
   * @private
   */
  private guild: Guild;

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
   * @type {any}
   * @private
   */
  private deleteSelf: deleteSelf


  /**
   * @constructor
   * @param {Guild} guild - The Id of the guild
   * @param {TextChannel} textChannel - The text channel of the msg
   * @param {any} deleteSelf -
   * Callback to remove this guild from the guilds collection
   */
  constructor(
      guild: Guild,
      textChannel: TextChannel,
      deleteSelf: any) {
    this.guild = guild;
    this.textChannel = textChannel;
    this.youtubeClient = new YoutubeClient();
    this.deleteSelf = deleteSelf;
  }

  /**
   * Makes the text bold and sends it
   * @param {string} text - The text to be sent
   */
  private sendMessage(text: string) : void {
    this.textChannel.send(`**${text}**`);
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

      this.play(param, msg.member.voice.channel);
      console.log('returning');
      return;
    }

    if (command === 'quit' || command === 'leave') {
      if (this.player === null) {
        return;
      }

      this.player.quit();
      this.deleteSelf();
      this.sendMessage('quit');
      return;
    }

    this.sendMessage(locales.userErrors.isNotACommand(command));
  }

  /**
   * Adds a new song to the queue
   * @param {string} param - Command parameter
   * @param {VoiceChannel | StageChannel} voiceChannel - Original message
   * @return {Promise<void>}
   */
  private async play(
      param: string,
      voiceChannel: VoiceChannel | StageChannel,
  ) : Promise<void> {
    if (this.player === null) {
      this.player = new MusicPlayer(voiceChannel, this.guild);
    }

    const song = await this.youtubeClient.getVideo(param);

    if (song instanceof YoutubeAPIError) {
      return this.sendMessage(song.message);
    }

    this.player.playSong(song);

    // this.player.addToQueue([song]);
  }
}
