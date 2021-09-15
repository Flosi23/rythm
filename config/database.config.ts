import {checkStringIsNotUndefined} from './convert';

interface databaseConfig{
  DB_CONNECTION_URI: string,
  DB_NAME: string,
  GUILDS_COLLECTION_NAME: string,
}

const databaseConfig: databaseConfig = {
  DB_CONNECTION_URI: checkStringIsNotUndefined(process.env.DB_CONNECTION_URI),
  DB_NAME: checkStringIsNotUndefined(process.env.DB_NAME),
  GUILDS_COLLECTION_NAME:
  checkStringIsNotUndefined(process.env.GUILDS_COLLECTION_NAME),
};

export default databaseConfig;
