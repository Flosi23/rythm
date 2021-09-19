
// // External Dependencies
// import {Guild} from 'discord.js';
// import * as mongoDB from 'mongodb';
// import databaseConfig from '../../config/database.config';
// import DBGuild from '../models/Guild';
// import Queue from '../models/Queue';
// import Song from '../models/Song';
// import {SongInterface} from '../interfaces/Song';

// /**
//  * A client for the database
//  * @class
//  */
// export default class DatabaseClient {
// /**
//  * all collections of the database
//  * @type {Object}
//  * @property {mongoDB.Collection} guilds - All guilds the bot is on
//  */
//   private collections : {guilds?: mongoDB.Collection} = {};

//   /**
//    * calss the connectToDatabase function when initialized
//    * @constructor
//    */
//   constructor() {
//     this.connectToDatabase();
//   }

//   /**
//    * client connects to the database and fetches all
//    * collections when initialized.
//    * @async
//    * @return {Promise<void>}
//    */
//   private async connectToDatabase() : Promise<void> {
//     const client: mongoDB.MongoClient = new mongoDB.MongoClient(
//         databaseConfig.DB_CONNECTION_URI);

//     await client.connect();

//     const db: mongoDB.Db = client.db(databaseConfig.DB_NAME);

//     const guildsCollection: mongoDB.Collection = db.collection(
//         databaseConfig.GUILDS_COLLECTION_NAME);

//     this.collections.guilds = guildsCollection;
//   }

//   /**
//    * Adds a guild to the guilds collection
//    * @param {DBGuild} guild - The guild to be added
//    * @return {DBGuild} - Returns the insert result
//    */
//   public async addGuild(guild: DBGuild) :
//   Promise<DBGuild> {
//     const response = await this.collections.guilds?.insertOne(guild);

//     if (response !== undefined) {
//       return guild;
//     }

//     throw new Error('Response is undefined');
//   };

//   /**
//    * Deletes a guild from the guilds collection
//    * @param {Guild} guild - The id of the guild
//    * @return {DBGuild} - Returns the delete result;
//    */
//   public async deleteGuild(guild: Guild) :
//   Promise<DBGuild> {
//     const dbGuild = await this.findGuild(guild);

//    const response = await this.collections.guilds?.deleteOne({id: guild.id});

//     if (response !== undefined) {
//       return dbGuild;
//     }

//     throw new Error('Response is undefined');
//   }

//   /**
//    * Find a guild by its id
//    * @param {Guild} guild - The id of the guild
//    * @return {DBGuild} - Returns the found guild
//    */
//   public async findGuild(guild: Guild) :
//   Promise<DBGuild> {
//     const response = await this.collections.guilds?.findOne({id: guild.id});

//     if (response != null) {
//       return this.guildObjectToClass(response);
//     }

//     throw new Error('Response is null or undefined');
//   }

//   /**
//    * Takes an object matching the guildInterface and returns a DBGuild class
//    * @param {mongoDB.Document} guild - The object from the database
//    * @return {DBGuild}
//    */
//   private guildObjectToClass(guild: mongoDB.Document) : DBGuild {
//     const songs : Song[] = [];

//     guild.queue.songs.forEach(function(song : SongInterface) {
//       // songs.push(new Song(song.url, getStream));
//     });

//     const queue : Queue = new Queue(songs);

//     const dbGuild : DBGuild = new DBGuild(guild.id, queue);

//     return dbGuild;
//   };
// };


