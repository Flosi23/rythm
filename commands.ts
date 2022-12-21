import * as dotenv from 'dotenv';

dotenv.config();

import {REST, Routes, SlashCommandBuilder} from 'discord.js';
import botConfig from './config/bot.config';

// TODO: LOCALES

const play = new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play a song or playlist')
    .addStringOption((option) =>
      option
          .setName('param')
          .setDescription('The search parameter')
          .setRequired(true),
    );

const forcePlay = new SlashCommandBuilder()
    .setName('forceplay')
    .setDescription('Play a song or playlist after the current song')
    .addStringOption((option) =>
      option
          .setName('param')
          .setDescription('The search parameter')
          .setRequired(true),
    );

const loop = new SlashCommandBuilder()
    .setName('loop')
    .setDescription('Loop current song');

const loopQueue = new SlashCommandBuilder()
    .setName('loopqueue')
    .setDescription('Loop the queue');

const quit = new SlashCommandBuilder()
    .setName('quit')
    .setDescription('Ends playback and quits voice channel');

const skip = new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Skips current song');

const skipto = new SlashCommandBuilder()
    .setName('skipto')
    .setDescription('Skips to the given position')
    .addIntegerOption((option) =>
      option
          .setName('position')
          .setDescription('The position to skip to')
          .setRequired(true),
    );

const queue = new SlashCommandBuilder()
    .setName('queue')
    .setDescription('Sends an embed displaying the queues content');

const commands = [play, forcePlay, loop, loopQueue, quit, skip, skipto, queue];

const commandsJSON = commands.map((command) => command.toJSON());

console.log(commandsJSON);

const rest = new REST({version: '10'}).setToken(botConfig.TOKEN);

(async () => {
  try {
    console.log(
        `Started refreshing ${commands.length} application (/) commands.`);

    // The put method is used to fully refresh all commands in the guild
    await rest.put(
        Routes.applicationCommands(botConfig.CLIENT_ID),
        {body: commandsJSON},
    );

    console.log(
        `Successfully reloaded application (/) commands.`);
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();

