import locales from '../interfaces/locales';
import userErrors from './user.errors';
import serviceErrors from './service.errors';
import botErrors from './bot.errors';
import botMessages from './bot.messages';

const enUS : locales = {
  userErrors: userErrors,
  serviceErrors: serviceErrors,
  botErrors: botErrors,
  botMessages: botMessages,
};

export default enUS;
