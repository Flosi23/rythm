import Discord, {Guild, Collection, TextChannel} from 'discord.js';
import {BotCommand, GuildId} from '../types';
import {Client, Message} from 'discord.js';
import botConfig from '../config/bot.config';
import BotGuild from './models/Guild';
import YoutubeClient from './services/youtube.service';
/**
 * The Bot class handles incoming messages and logging in
 * @class Bot
 */
export default class Bot {
  /**
   * The token of the bot
   * @type {string}
   * @private
   */
  private token: string;

  /**
   * The bot object of the discord api
   * @type {Client}
   * @private
   */
  private discordClient: Client;

  /**
   * The client for the youtube api
   * @type {YoutubeClient}
   * @private
   */
  private youtubeClient: YoutubeClient;

  /**
   * The prefix of the bot
   * @type {string}
   * @private
   */
  private prefix : string = '!';


  private guilds : Collection<GuildId, BotGuild>
  /**
   * @constructor
   * @param {string} token - The token of the discord bot
   */
  constructor(token: string) {
    this.guilds = new Collection();
    this.youtubeClient = new YoutubeClient();
    this.discordClient = new Discord.Client(botConfig.CLIENT_OPTIONS);
    this.token = token;
  }

  /**
   * Bot starts up and listeners are assigned
   */
  public listen(): void {
    this.discordClient.on('messageCreate', (msg: Message) => {
      this.message(msg);
    });

    /* this.discordClient.on('guildCreate', (guild: Guild) => {
      this.guildCreate(guild);
    });

    this.discordClient.on('guildDelete', (guild: Guild) => {
      this.guildDelete(guild);
    }); */

    this.discordClient.login(this.token);
  }

  /**
   * Handles an incoming message.
   * Returns when the msg was send by the bot or it doesnt begin with the prefix
   * . Splits the message in command and parameter
   * @param {Message} msg - The incoming message
   */
  private message(msg: Message) : void {
    if (msg.author.bot) return;

    if (!msg.content.startsWith(this.prefix)) return;

    const result : BotCommand = this.getCommand(msg);

    if (msg.guild === null) {
      // command was send via dm
      this.handleUserCommand(result.command, result.param, msg);
      return;
    }

    this.handleGuildCommand(result.command, result.param, msg, msg.guild);
  }

  /**
   * Filters command and its parameter from a msg
   * @param {Message} msg - The msg sent
   * @return {BotCommand} - The command and param
   */
  private getCommand(msg: Message) : BotCommand {
    const split : string[] = msg.content.split(' ');

    let command : string = ' ';
    let param: string | null = null;

    /**
     * Puts a split string back together
     * @param {Array<string>} array - Array of string
     * @return {string} - The full string
     */
    function rebuildString(array: string[]) : string {
      let string = '';
      array.forEach((ele) => {
        string += ' ' + ele;
      });

      return string;
    }

    if (split.length === 1) {
      command = msg.content.substring(1);
    } else if (split.length >= 2) {
      if (split[0] === this.prefix) {
        command = split[1];
        param = split.length >= 3 ? rebuildString(split.slice(2)) : null;
      } else {
        command = split[0].substring(1);
        param = rebuildString(split.slice(1));
      }
    }

    if (param !== null) {
      param = param.trim();
    }

    command = command.toLowerCase();

    return {command, param};
  }
  /**
   * Handles a command sent on a guild
   * @param {string} command - The command
   * @param {string | null} param - The parameter passed with the command
   * @param {Message} msg - The discord msg object (The original message)
   * @param {Guild} guild - The discord guild the msg was sent from
   */
  protected handleGuildCommand(
      command: string,
      param: string | null,
      msg: Message,
      guild: Guild,
  ) : void {
    const guildId: GuildId = guild.id;

    if (!this.guilds.has(guildId)) {
      this.guilds.set(
          guildId,
          new BotGuild(
              guild,
              msg.channel as TextChannel,
              () => this.guilds.delete(guildId),
          ),
      );
    }

    const botGuild = this.guilds.get(guildId) as BotGuild;

    botGuild.handleCommand(command, param, msg);
  }

  /**
   * Handles a command sent via dm
   * @param {string} command - The command
   * @param {string | null} param - The parameter passed with the command
   * @param {Message} msg - The discord msg object (The original message)
   */
  protected handleUserCommand(
      command: string,
      param: string | null,
      msg: Message) : void {
    return;
  }
}
