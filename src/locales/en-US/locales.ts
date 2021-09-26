import locales from '../interfaces/locales';
import userErrors from './user.errors';
import serviceErrors from './service.errors';
import botErrors from './bot.errors';
import botMessages from './bot.messages';
import botEmbeds from './bot.embeds';

const enUS : locales = {
  userErrors: userErrors,
  serviceErrors: serviceErrors,
  botErrors: botErrors,
  botMessages: botMessages,
  botEmbeds: botEmbeds,
};

export default enUS;
