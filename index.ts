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
import {connectToDatabase} from './src/Database/services/database.service';

connectToDatabase();
new Bot(botConfig.TOKEN).listen();
