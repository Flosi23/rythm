import {AudioPlayer,
  AudioPlayerStatus,
  AudioResource,
  createAudioPlayer,
  entersState,
  getVoiceConnection,
  joinVoiceChannel,
  VoiceConnection,
  VoiceConnectionDisconnectReason,
  VoiceConnectionStatus} from '@discordjs/voice';
import {VoiceChannel, Guild, StageChannel} from 'discord.js';
import {wait} from '../helper/util';
import Queue from './Queue';
import Song from './Song';
import locales from '../locales/locales';
// import locales from '../locales/locales';
import BotGuild from './Guild';

/**
 * @class MusicPlayer
 */
export default class MusicPlayer {
  /**
   * The audio player
   * @type {AudioPlayer}
   * @private
   */
  private readonly player: AudioPlayer = createAudioPlayer();

  /**
   * The voice channel where music is being played
   * @type {VoiceChannel | StageChannel}
   * @private
   */
  private voiceChannel: VoiceChannel | StageChannel;

  /**
   * The voice connection to the voice channel
   * @type {VoiceConnection}
   * @private
   */
  private voiceConnection: VoiceConnection;

  /**
   * The queue containing all songs to be played
   * @type {Queue}
   * @private
   */
  public queue: Queue;

  /**
   * @type {boolean}
   * @private
   */
  private readyLock: boolean;

  /**
   * @type {BotGuild}
   * @private
   */
  private botGuild: BotGuild;

  /**
   * @constructor
   * @param {VoiceChannel} voiceChannel - The voice channel
   * @param {Guild} guild - The guild
   * @param {BotGuild} botGuild - The botGuild
   */
  constructor(
      voiceChannel: VoiceChannel | StageChannel,
      guild: Guild,
      botGuild: BotGuild) {
    this.botGuild = botGuild;
    this.voiceChannel = voiceChannel;
    this.queue = new Queue([]);
    this.readyLock = false;

    this.player.on('error', (error) => {
      console.log('Music Player Error', error);
      // TODO send Error playing audio
    });

    this.player.on(AudioPlayerStatus.Idle, () => {
      this.playNextSong();
    });

    this.voiceConnection = joinVoiceChannel({
      channelId: this.voiceChannel.id,
      guildId: guild.id,
      adapterCreator: guild.voiceAdapterCreator,
    });

    this.voiceConnection.on('stateChange', async (_, newState) => {
      if (newState.status === VoiceConnectionStatus.Disconnected) {
        if (newState.reason ===
          VoiceConnectionDisconnectReason.WebSocketClose &&
          newState.closeCode === 4014) {
          /*
            If the WebSocket closed with a 4014 code, this means
            that we should not manually attempt to reconnect,
            but there is a chance the connection will recover itself
            if the reason of the disconnect was due to
            switching voice channels. This is also the same code for the
            bot being kicked from the voice channel,
            so we allow 5 seconds to figure out which scenario it is.
            If the bot has been kicked, we should destroy
            the voice connection.
            */
          try {
            await entersState(this.voiceConnection,
                VoiceConnectionStatus.Connecting, 5_000);
            // Probably moved voice channel
          } catch {
            this.voiceConnection.destroy();
            // Probably removed from voice channel
          }
        } else if (this.voiceConnection.rejoinAttempts < 5) {
          /*
          The disconnect in this case is recoverable,
          and we also have <5 repeated attempts so we will reconnect.
          */
          await wait((this.voiceConnection.rejoinAttempts + 1) * 5_000);
          this.voiceConnection.rejoin();
        } else {
          /*
            The disconnect in this case may
            be recoverable, but we have no more remaining attempts - destroy.
          */
          this.voiceConnection.destroy();
        }
      } else if (newState.status === VoiceConnectionStatus.Destroyed) {
        /*
        Once destroyed, stop the subscription
        */
        this.quit();
      } else if (
        !this.readyLock &&
        (newState.status === VoiceConnectionStatus.Connecting ||
        newState.status === VoiceConnectionStatus.Signalling)
      ) {
        /*
          In the Signalling or Connecting states,
          we set a 20 second time limit for the connection to become ready
          before destroying the voice connection.
          This stops the voice connection permanently existing in one of these
          states.
        */
        this.readyLock = true;
        try {
          await entersState(this.voiceConnection,
              VoiceConnectionStatus.Ready, 20_000);
        } catch {
          if (this.voiceConnection.state.status !==
            VoiceConnectionStatus.Destroyed) this.voiceConnection.destroy();
        } finally {
          this.readyLock = false;
        }
      }
    });

    this.voiceConnection.subscribe(this.player);
  }

  /**
   * Plays the next song from the queue
   * If the queue is empty the bot leaves
   * @private
   */
  public async playNextSong() {
    const song: Song | undefined = this.queue.getNextSong();

    if (song === undefined) {
      // this.quit();
      return;
    }

    // this.botGuild.sendEmbed(song.getEmbed(locales.botEmbeds.nowPlaying));

    this.playSong(song);
  }

  /**
   * Plays the next song
   * @param {Song} song - The Song to be played;
   * @public
   */
  private async playSong(song: Song) {
    try {
      const audioResource: AudioResource = await song.createAudioResource();

      this.player.play(audioResource);
    } catch (error) {
      console.log('An error occured', error);
      this.playNextSong();
    }
  }

  /**
   * Adds songs to the queue and starts playback if the
   * player statde is idle
   * @param {Song[]} songs - The songs to be added
   * @param {number} index - At which index they should be added
   * @public
   */
  public addToQueue(songs: Song[], index: number = this.queue.songs.length) {
    this.queue.addToQueue(songs, index);

    if (this.player.state.status === AudioPlayerStatus.Idle) {
      this.playNextSong();
    }
  }

  /**
   * Removes all elements from 0 to index from the songs array
   * @param {number} index
   * @return {string} The message that should be sent to the user
   */
  public skipTo(index: number) : string {
    if (index > this.queue.songs.length - 1 || index <= 0) {
      return `:x: ${locales.userErrors.positionNotExistant}`;
    }

    this.queue.skipTo(index - 1);
    this.playNextSong();

    return `:white_check_mark: ${locales.botMessages.skippedTo(index)}`;
  }

  /**
   * Quits the connection and stops the AudioPlayer
   * @public
   */
  public quit() {
    this.player.stop();

    const connection = getVoiceConnection(this.botGuild.guild.id);

    if (connection) {
      connection.disconnect();
    }

    return;
  }
}
