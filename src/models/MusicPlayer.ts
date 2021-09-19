import {AudioPlayer,
  AudioPlayerStatus,
  createAudioPlayer,
  createAudioResource,
  entersState,
  getVoiceConnection,
  joinVoiceChannel,
  StreamType} from '@discordjs/voice';
import {VoiceChannel, Guild, StageChannel} from 'discord.js';
import Queue from './Queue';
import Song from './Song';

/**
 * @class MusicPlayer
 */
export default class MusicPlayer {
  /**
   * The audio player
   * @type {AudioPlayer}
   */
  private readonly player: AudioPlayer = createAudioPlayer();

  /**
   * The voice channel where music is being played
   * @type {VoiceChannel | StageChannel}
   * @private
   */
  private voiceChannel: VoiceChannel | StageChannel;

  /**
   * @type {Guild} guild
   * @private
   */
  private guild: Guild;

  /**
   * The queue containing all songs to be played
   * @type {Queue}
   * @private
   */
  private queue: Queue;

  /**
   * @constructor
   * @param {VoiceChannel} voiceChannel - The voice channel
   * @param {Guild} guild - The guild
   */
  constructor(voiceChannel: VoiceChannel | StageChannel, guild: Guild) {
    this.voiceChannel = voiceChannel;
    this.guild = guild;
    this.queue = new Queue([]);

    this.player.on('error', (error) => {
      console.log('Music Player Error', error);
      // TODO send Error playing audio
    });

    try {
      joinVoiceChannel({
        channelId: this.voiceChannel.id,
        guildId: guild.id,
        adapterCreator: guild.voiceAdapterCreator,
      }).subscribe(this.player);
    } catch (error) {
      console.error(error);
      // TODO send error msg
    }
  }

  /**
   * Plays the next song from the queue
   * If the queue is empty the bot leaves
   */
  private playNextSong() {
    const song: Song | undefined = this.queue.getNextSong();

    if (song === undefined) {
      this.quit();
      return;
    }

    this.playSong(song);
  }

  /**
   * Plays the next song
   * @param {Song} song - The Song to be played;
   */
  public async playSong(song: Song) {
    console.log('song', song);

    const audioResource = createAudioResource(
        await song.getStream(song), {
          inputType: StreamType.Opus,
        },
    );

    this.player.play(audioResource);

    try {
      await entersState(this.player, AudioPlayerStatus.Playing, 5_000);
      console.log('Playing');
      // The player has entered the Playing state within 5 seconds
    } catch (error) {
      // The player has not entered the Playing state and either:
      // 1) The 'error' event has been emitted and should be handled
      // 2) 5 seconds have passed
      console.error(error);
    }
  }

  /**
   * Adds songs to the queue and starts playback if the
   * player statde is idle
   * @param {Song[]} songs - The songs to be added
   */
  public addToQueue(songs: Song[]) {
    this.queue.addToQueue(songs);

    if (this.player.state.status === AudioPlayerStatus.Idle) {
      this.playNextSong();
    }
  }

  /**
   * Quits the connection
   */
  public quit() {
    this.player.stop();

    const connection = getVoiceConnection(this.guild.id);

    if (connection) {
      connection.disconnect();
    }

    return;
  }
}
