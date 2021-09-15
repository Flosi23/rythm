// External Dependencies
import * as mongoDB from 'mongodb';
import databaseConfig from '../../../config/database.config';

/**
 * all collections of the database
 * @type {Object}
 * @property {mongoDB.Collection} guilds - All guilds the bot is on
 */
export const collections : {guilds?: mongoDB.Collection} = {};

/**
 * establishes a connection to the database using the the
 * DB_CONNECT_URI and fetches all the collections
 * @async
 */
export async function connectToDatabase() : Promise<void> {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
      databaseConfig.DB_CONNECTION_URI);

  await client.connect();

  const db: mongoDB.Db = client.db(databaseConfig.DB_NAME);

  const guildsCollection: mongoDB.Collection = db.collection(
      databaseConfig.GUILDS_COLLECTION_NAME);

  collections.guilds = guildsCollection;
}
