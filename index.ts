import * as dotenv from 'dotenv';

dotenv.config();

import Bot from './src/Bot';

new Bot().listen();
