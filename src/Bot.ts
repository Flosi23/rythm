import Discord from 'discord.js';
import {Client, Message} from 'discord.js';

/**
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
   * @constructor
   * @param {string} token - The token of the discord bot
   */
  constructor(token: string) {
    this.client = new Discord.Client();
    this.token = token;
  }

  /**
   * Bot starts up and listeners are assigned
   */
  public listen(): void {
    this.client.on('message', this.message);
    this.client.login(this.token);
  }

  /**
   * Handles an incoming message
   * @param {Message} msg - The incoming message
   */
  private message(msg: Message) : void {
    console.log('msg', msg);
  }
}
