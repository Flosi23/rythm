interface songsInQueue {
  (songs: number) : string,
}

interface totalLength {
  (length: string) : string,
}

interface botEmbeds {
  artist: string,
  addedToQueue: string,
  nowPlaying: string,
  queue: string,
  upNext: string,
  songsInQueue: songsInQueue,
  loop: string,
  loopQueue: string,
  queueIsEmpty: string,
  page: string,
  previous: string,
  next: string,
  requestedBy: string,
  totalLength: totalLength,
}

export default botEmbeds;
