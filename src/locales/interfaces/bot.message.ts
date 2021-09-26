interface searchingYoutubeVideo {
  (query: string) : string
}

interface skippedTo {
  (position: number) : string
}

interface botMessages {
  searchingYoutubeVideo:searchingYoutubeVideo,
  botLeft: string,
  songSkipped: string,
  loopEnabled: string,
  loopQueueEnabled: string,
  loopDisabled: string,
  loopQueueDisabled: string,
  skippedTo: skippedTo,
}

export default botMessages;
