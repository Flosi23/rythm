interface searchingYoutubeVideo {
  (query: string) : string
}

interface botMessages {
  searchingYoutubeVideo:searchingYoutubeVideo,
  botLeft: string,
}

export default botMessages;
