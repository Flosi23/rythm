import Discord, {
  Guild,
  Collection,
  Events,
  TextBasedChannel,
} from 'discord.js';
import {GuildId} from '../types';
import {Client} from 'discord.js';
import botConfig from '../config/bot.config';
import BotGuild from './BotGuild';
import locales from './locales/locales';
/**
 * The Bot class handles incoming messages and logging in
 * Bot
 * @class Bot
 */
class Bot {
  /**
   * The bot object of the discord api
   * @type {Client}
   * @private
   */
  private discordClient: Client;


  private guilds : Collection<GuildId, BotGuild>;
  /**
   * @constructor
   * @param {string} token - The token of the discord bot
   */
  constructor() {
    this.guilds = new Collection();
    this.discordClient = new Discord.Client(botConfig.CLIENT_OPTIONS);
  }

  /**
   * Bot starts up and listeners are assigned and slash commands are registered
   * @public
   */
  public async listen(): Promise<void> {
    this.discordClient.on(Events.InteractionCreate, async (interaction) => {
      if (!interaction.isChatInputCommand()) return;

      if (
        interaction.guild === null ||
        interaction.channel === null ||
        !interaction.channel.isTextBased()
      ) {
        interaction.reply(`**${locales.botErrors.errorWhileExecutingCommand}**`);
        return;
      }

      const botGuild = this.getBotGuild(interaction.guild, interaction.channel);

      if (interaction.commandName === 'play') {
        const param = interaction.options.getString('param', true);
        return botGuild.play(param, interaction);
      }

      if (interaction.commandName === 'forceplay') {
        const param = interaction.options.getString('param', true);
        return botGuild.play(param, interaction);
      }

      if (interaction.commandName === 'loop') {
        return botGuild.loop(interaction);
      }

      if (interaction.commandName === 'loopqueue') {
        return botGuild.loopQueue(interaction);
      }

      if (interaction.commandName === 'skip') {
        return botGuild.skip(interaction);
      }

      if (interaction.commandName === 'skipto') {
        const position = interaction.options.getInteger('position', true);
        return botGuild.skipTo(position, interaction);
      }

      if (interaction.commandName === 'queue') {
        return botGuild.queue(interaction);
      }

      if (interaction.commandName === 'quit') {
        return botGuild.quit(interaction);
      }
    });

    this.discordClient.login(botConfig.TOKEN);

    console.log('--- Bot started ---');
  }

  /**
   * Gets the botGuild that belongs to the given discord guild or creates a new guild
   * @private
   * @param {Guild} guild - The Discord Guild the Guild we want to get belongs to
   * @param {TextBasedChannel} textChannel - The textChannel the interaction was sent in
   * @return {BotGuild}
   */
  private getBotGuild(guild: Guild, textChannel: TextBasedChannel) : BotGuild {
    const guildId: GuildId = guild.id;

    if (!this.guilds.has(guildId)) {
      const newBotGuild = new BotGuild(
          guild,
          textChannel,
          () => this.guilds.delete(guildId),
      );
      this.guilds.set(guildId, newBotGuild);
    }

    return this.guilds.get(guildId)!;
  }
}

export default Bot;
