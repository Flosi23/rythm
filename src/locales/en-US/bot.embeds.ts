import botEmbeds from '../interfaces/bot.embeds';

const botEmbeds: botEmbeds = {
  artist: 'Artist',
  addedToQueue: 'Added to queue',
  nowPlaying: 'Now Playing',
  queue: 'Queue',
  upNext: 'Up Next',
  songsInQueue: (songs: number) => `${songs} Songs in queue`,
  loop: 'Loop',
  loopQueue: 'Loop Queue',
  queueIsEmpty: 'The queue is empty',
  page: 'Page',
  previous: 'Prev',
  next: 'Next',
  requestedBy: 'Requested By',
  totalLength: (length: string) => `${length} total length`,
};

export default botEmbeds;
