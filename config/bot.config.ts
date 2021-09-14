import {checkStringIsUndefined} from './convert';

export default {
  TOKEN: checkStringIsUndefined(process.env.BOT_TOKEN),
};
