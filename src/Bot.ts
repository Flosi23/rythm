import Discord from 'discord.js';
import {Client, Message} from 'discord.js';
import botConfig from '../config/bot.config';
/**
 * The Bot class handles incoming messages and logging in
 * @class Bot
 */
export class Bot {
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

  private client: Client;

  /**
   * The prefix of the bot
   * @type {string}
   * @private
   */

  private prefix : string = '!';

  /**
   * @constructor
   * @param {string} token - The token of the discord bot
   */
  constructor(token: string) {
    this.client = new Discord.Client(botConfig.CLIENT_CONFIG);
    this.token = token;
  }

  /**
   * Bot starts up and listeners are assigned
   */
  public listen(): void {
    this.client.on('message', (msg: Message) => {
      this.message(msg);
    });
    this.client.login(this.token);
  }

  /**
   * Handles an incoming message.
   * Returns when the msg was send by the bot or it doesnt begin with the prefix
   * . Splits the message in command and parameter
   * @param {Message} msg - The incoming message
   */
  protected message(msg: Message) : void {
    if (msg.author.bot) return;

    if (!msg.content.startsWith(this.prefix)) return;

    const split : string[] = msg.content.split(' ');

    const command : string = split[0].substring(1);
    const param : string | null = split.length > 1 ? split[1] : null;

    this.handleCommand(command, param, msg);
  }

  /**
   * Function performs an action depending on the command
   * @param {string} command - The command
   * @param {string | null} param - The parameter passed with the command
   * @param {Message} msg - The discord msg object (The original message)
   */
  protected handleCommand(
      command: string,
      param: string | null,
      msg: Message) : void {
    switch (command) {
      case 'p':
      case 'play':
        console.log('play');
    }
  }
}
