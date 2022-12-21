import botMessages from '../interfaces/bot.message';

const botMessages: botMessages = {
  searchingYoutubeVideo: (query: string) =>
    `:musical_note: Searching :mag_right: \`${query}\``,
  botLeft: ':arrow_right: Bot left',
  songSkipped: ':arrow_right: Skipped',
  loopEnabled: ':arrows_counterclockwise: Loop enabled',
  loopDisabled: ':x: Loop disabled',
  loopQueueEnabled: ':arrows_counterclockwise: Queue-Loop enabled',
  loopQueueDisabled: ':x: Queue-Loop disabled',
  skippedTo: (position: number) => `:white_check_mark: Skipped to position ${position}`,
  fetchingPlaylist: 'Fetching Playlist...',
  sendingQueue: 'Sending Queue...',
};

export default botMessages;
