import {ClientOptions, Intents} from 'discord.js';
import {checkStringIsNotUndefined} from './convert';

interface botConfig {
  TOKEN: string,
  CLIENT_OPTIONS: ClientOptions,
}

const botConfig: botConfig = {
  TOKEN: checkStringIsNotUndefined(process.env.BOT_TOKEN),
  CLIENT_OPTIONS: {
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_VOICE_STATES,
    ],
  },
};

export default botConfig;
