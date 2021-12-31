import botEmbeds from './bot.embeds';
import botErrors from './bot.errors';
import botMessages from './bot.message';
import serviceErrors from './service.errors';
import userErrors from './user.errors';

/**
 * This interface combines all the sub interfaces into
 * one object
 * @interface
 * @category locales
 */
interface locales {
  /**
   * Errors caused by the services
   * @type {serviceErrors}
   */
  serviceErrors: serviceErrors,
  /**
   * Errors caused by the user
   * @type {userErrors}
   */
  userErrors: userErrors,
  /**
   * Errors that were caused by the bot
   * @type {botErrors}
   */
  botErrors: botErrors,
  /**
   * Regular bot messages
   * @type {botMessages}
   */
  botMessages: botMessages,
  /**
   * All Strings that are displayed on embeds
   * @type {botEmbeds}
   */
  botEmbeds: botEmbeds,
}

export default locales;
