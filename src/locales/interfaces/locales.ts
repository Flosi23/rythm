import botErrors from './bot.errors';
import BotMessages from './bot.message';
import serviceErrors from './service.errors';
import userErrors from './user.errors';

interface locales {
  serviceErrors: serviceErrors,
  userErrors: userErrors,
  botErrors: botErrors,
  botMessages: BotMessages,
}

export default locales;
