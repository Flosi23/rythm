import {ClientOptions} from 'discord.js';
import {checkStringIsNotUndefined} from './convert';

interface botConfig {
  TOKEN: string,
  CLIENT_CONFIG: ClientOptions,
}

const botConfig: botConfig = {
  TOKEN: checkStringIsNotUndefined(process.env.BOT_TOKEN),
  CLIENT_CONFIG: {
    intents: 8,
  },
};

export default botConfig;
