import * as dotenv from 'dotenv';

dotenv.config();

/* import express from 'express';
import server from './config/server.config';

const app = express();

app.use(express.json());
app.listen(server.PORT);
*/

import {Bot} from './src/Bot';
import botConfig from './config/bot.config';

new Bot(botConfig.TOKEN).listen();
