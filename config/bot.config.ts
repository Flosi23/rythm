import {ClientOptions, GatewayIntentBits} from 'discord.js';
import {checkStringIsNotUndefined} from './convert';

interface botConfig {
  TOKEN: string,
  CLIENT_OPTIONS: ClientOptions,
}

const botConfig: botConfig = {
  TOKEN: checkStringIsNotUndefined(process.env.BOT_TOKEN),
  CLIENT_OPTIONS: {
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildVoiceStates,
    ],
  },
};

export default botConfig;
