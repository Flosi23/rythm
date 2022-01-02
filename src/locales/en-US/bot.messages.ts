import botMessages from '../interfaces/bot.message';

const botMessages: botMessages = {
  searchingYoutubeVideo: (query: string) =>
    `:musical_note: Searching :mag_right: \`${query}\``,
  botLeft: ':arrow_right: Bot left',
  songSkipped: ':arrow_right: Skipped',
  loopEnabled: 'Loop enabled',
  loopDisabled: 'Loop disabled',
  loopQueueEnabled: 'Queue-Loop enabled',
  loopQueueDisabled: 'Queue-Loop disabled',
  skippedTo: (position: number) => `Skipped to position ${position}`,
  fetchingPlaylist: 'Fetching Playlist...',
};

export default botMessages;
