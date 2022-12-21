import {ClientOptions, GatewayIntentBits} from 'discord.js';
import {checkStringIsNotUndefined} from './convert';

interface botConfig {
  TOKEN: string,
  CLIENT_ID: string,
  CLIENT_OPTIONS: ClientOptions,
}

const botConfig: botConfig = {
  TOKEN: checkStringIsNotUndefined(process.env.BOT_TOKEN),
  CLIENT_ID: checkStringIsNotUndefined(process.env.BOT_CLIENT_ID),
  CLIENT_OPTIONS: {
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildVoiceStates,
    ],
  },
};

export default botConfig;
