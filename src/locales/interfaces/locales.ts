import botEmbeds from './bot.embeds';
import botErrors from './bot.errors';
import botMessages from './bot.message';
import serviceErrors from './service.errors';
import userErrors from './user.errors';

interface locales {
  serviceErrors: serviceErrors,
  userErrors: userErrors,
  botErrors: botErrors,
  botMessages: botMessages,
  botEmbeds: botEmbeds,
}

export default locales;
