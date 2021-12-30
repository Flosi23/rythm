import botEmbeds from '../interfaces/bot.embeds';

const botEmbeds: botEmbeds = {
  artist: 'uploaded by',
  addedToQueue: 'added to queue',
  nowPlaying: 'now playing',
  queue: 'queue',
  upNext: 'up next',
  songsInQueue: (songs: number) => `${songs} songs in queue`,
  loop: 'loop',
  loopQueue: 'loop queue',
  queueIsEmpty: 'the queue is empty',
  page: 'page',
  previous: 'prev',
  next: 'next',
  requestedBy: 'requestor',
  totalLength: (length: string) => `${length} total length`,
};

export default botEmbeds;
